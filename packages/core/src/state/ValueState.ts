import { State } from './State';

export class ValueState extends State<string|number> {

  toggle(value: any) {
    if (this.is(value)) {
      return this.clear();
    } else {
      return this.setValue(value);
    }
  }

  is (value: any): boolean {
    return this.value === value;
  }
}
