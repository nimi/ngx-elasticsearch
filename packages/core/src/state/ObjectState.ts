import { State } from './State';
import { isEmpty } from 'lodash';

/**
 * @name ObjectState
 * @description
 * 
 * State wrapper for simple object type values
 */
export class ObjectState extends State<Object> {

  /**
   * Get the state vale or return an empty object
   */
  getValue() {
    return this.value || {};
  }

  /**
   * Checks for an empty value state
   */
  hasValue() {
    return !isEmpty(this.value);
  }

}
