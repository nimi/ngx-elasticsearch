export class State<T> {
  value: T;

  constructor(value: any = null) {
    this.value = value;
  }

  create(value: T | null) {
    const item = new (<any>this.constructor)(value);
    item.value = value;
    return item;
  }

  setValue(value: T) {
    return this.create(value);
  }

  clear(){
    return this.create(null);
  }

  getValue() {
    return this.value;
  }

  hasValue() {
    return !!(this.value);
  }

}
