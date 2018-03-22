import {State} from './State';
import {indexOf, without} from 'lodash';

/**
 * @name ArrayState
 * @description
 * 
 * State wrapper around arrays of primitive values
 */
export class ArrayState extends State<Array<string|number>> {
  
  /**
   * @name getValue
   * @description Gets the state value or an empty array
   */
  getValue() {
    return this.value || [];
  }

  /**
   * @name toggle
   * @description Toggles the value provided in the state
   * @param val 
   */
  toggle(val: string | number) {
    if (this.contains(val)) {
      return this.remove(val);
    } else {
      return this.add(val);
    }
  }

  /**
   * @name clear
   * @description Resets the state to an empty array
   */
  clear(){
    return this.create([]);
  }

  /**
   * @name remove
   * @description Removes a value from the internal array
   * @param val 
   */
  remove(val: string | number) {
    return this.create(without(this.getValue(), val));
  }

  /**
   * @name add
   * @description Adds a value to the array state
   * @param val
   */
  add(val: string | number) {
    return this.create(this.getValue().concat(val));
  }

  /**
   * @name contains
   * @description Checks for an existing value in the array
   * @param val 
   */
  contains(val: string | number) {
    return indexOf(this.value, val) !== -1;
  }
}
