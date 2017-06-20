/**
 * @name State
 * @description
 * 
 * Wrapper for managing stateful values
 */
export class State<T> {
  value: T;

  constructor(value: any = null) {
    this.value = value;
  }

  /**
   * Creates a new stateful wrapper around the value
   * @param value 
   */
  create(value: T | null): any {
    return new (<any>this.constructor)(value);
  }

  /**
   * Updates the state value
   * @param value 
   */
  setValue(value: T): any {
    return this.create(value);
  }

  /**
   * Clear the current state
   */
  clear(): any {
    return this.create(null);
  }

  /**
   * Get the internal state value
   */
  getValue(): T {
    return this.value;
  }

  /**
   * Has a value in state wrapper
   */
  hasValue(): boolean {
    return Boolean(this.value);
  }

}
