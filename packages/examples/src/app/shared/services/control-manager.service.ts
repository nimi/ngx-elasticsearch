import { Injectable } from '@angular/core';
import { ControlStoreService } from './control-store.service';

// This is used by _mayCallChannel to determine how long to wait to before triggering a panel update
const PANEL_UPDATE_INTERVAL = 400;

@Injectable()
export class ControlManagerService {
  channel: any;
  calling: boolean;
  controlStore: ControlStoreService;
  controlStoreMap: { [id: string]: ControlStoreService } = {};

  control(name, options) {
    if (!this.controlStore) { return; }

    this._mayCallChannel();

    const controlStore = this.controlStore;
    const existingControl = controlStore.get(name);
    // We need to return the value set by the control editor via this.
    // But, if the user changes the code for the defaultValue we should set
    // that value instead.
    // if (existingControl && deepEqual(options.value, existingControl.defaultValue)) {
    //   return existingControl.value;
    // }

    const defaultValue = options.value;
    const controlInfo = {
      ...options,
      name,
      defaultValue,
    };

    controlStore.set(name, controlInfo);

    console.log('set control', this, controlStore.get(name));

    return controlStore.get(name).value;
  }

  resetStore() {
    this.controlStoreMap = {}
    this.controlStore.reset();
  }

  wrapSuite(channel, exampleFn, context) {
    this.channel = channel;
    const key = `${context.kind}:::${context.example}`;
    let controlStore = this.controlStoreMap[key];

    if (!controlStore) {
      controlStore = this.controlStoreMap[key] = new ControlStoreService();
    }

    this.controlStore = controlStore;
    controlStore.markAllUnused();
    const initialContent = exampleFn(context);
    const props = { context, exampleFn, channel, controlStore, initialContent };
    // return (<WrapStory {...props} />);
    return props;
  }

  _mayCallChannel() {
    // Re rendering of the example may cause changes to the controlStore. Some new controls maybe added and
    // Some controls may go unused. So we need to update the panel accordingly. For example remove the
    // unused controls from the panel. This function sends the `setControls` message to the channel
    // triggering a panel re-render.

    console.log('calling');
    if (this.calling) {
      // If a call to channel has already registered ignore this call.
      // Once the previous call is completed all the changes to controlStore including the one that
      // triggered this, will be added to the panel.
      // This avoids emitting to the channel within very short periods of time.
      return;
    }
    this.calling = true;

    setTimeout(() => {
      this.calling = false;
      // emit to the channel and trigger a panel re-render
      this.channel.emit('addon:controls:setControls', this.controlStore.getAll());
    }, PANEL_UPDATE_INTERVAL);
  }
}
