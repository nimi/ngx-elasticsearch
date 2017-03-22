import { map, head, find, omit } from 'lodash';

import { StatefulAccessor } from './StatefulAccessor'
import { ValueState } from '../state/ValueState';

export class ViewOptionsAccessor extends StatefulAccessor<ValueState> {
  state: ValueState = new ValueState();
  options: Array<any>;

  constructor(key: string, options: Array<any>) {
    super(key);
    this.options = options;
  }

  getSelectedOption(){
    return find(this.options, {key:this.state.getValue()}) ||
           find(this.options, {defaultOption:true}) ||
           head(this.options);
  }

  setView(key: string) {
    let view = find(this.options, { key });
    if(view) {
      if(view.defaultOption){
        this.state = this.state.clear();
      } else {
        this.state = this.state.setValue(view.key);
      }
      this.search();
    }
  }

  search() {
    //this won't fire search as query didn't change, but it will serialize url
    //might need better way
    this.searchManager.performSearch(false, false);
    this.searchManager.emitter.trigger();
  }
}
