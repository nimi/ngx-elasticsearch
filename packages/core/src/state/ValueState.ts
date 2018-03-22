import { State } from './State';

/**
 * @name ValueState
 * @description
 * 
 * Wrapper for primitive number or string values
 */
export class ValueState extends State<string|number> {

  /**
   * Toggle internal value state, if match is provided,
   * clear the value, otherwise set a new value
   * @param value 
   */
  public toggle(value: string | number): ValueState {
    if (this.is(value)) {
      return this.clear();
    } else {
      return this.setValue(value);
    }
  }

  /**
   * Check if the arg value matches the internal state
   * @param value
   */
  public is (value: string | number): boolean {
    return this.value === value;
  }
}
