import { State } from './State';
export declare class ValueState extends State<string | number> {
    toggle(value: string | number): any;
    is(value: string | number): boolean;
}
