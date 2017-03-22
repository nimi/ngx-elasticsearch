import {without, each} from 'lodash';

export class EventEmitter {
  listeners: Function[] = [];

  addListener(fn: Function) {
    this.listeners.push(fn);
    return () => this.listeners = without(this.listeners, fn);
  }

  trigger(...args: any[]) {
    each(this.listeners, (fn: Function) => fn.apply(null, args));
  }
}
