import {State} from './State';
import {indexOf, without} from 'lodash';

export class ArrayState extends State<Array<string|number>> {
  
  getValue() {
    return this.value || [];
  }

  toggle(val: any[]) {
    if (this.contains(val)) {
      return this.remove(val);
    } else {
      return this.add(val);
    }
  }

  clear(){
    return this.create([]);
  }

  remove(val: any) {
    return this.create(without(this.getValue(), val));
  }

  add(val: any) {
    return this.create(this.getValue().concat(val));
  }

  contains(val: any) {
    return indexOf(this.value, val) !== -1;
  }
}
