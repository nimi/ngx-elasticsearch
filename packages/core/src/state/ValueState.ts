import { State } from './State';

export class ValueState extends State<string|number> {

  toggle(value: string | number) {
    if (this.is(value)) {
      return this.clear();
    } else {
      return this.setValue(value);
    }
  }

  is (value: string | number): boolean {
    return this.value === value;
  }
}
