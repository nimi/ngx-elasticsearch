import { FieldOptions } from './FieldOptions';

export abstract class FieldContext {
  constructor(public fieldOptions: FieldOptions){ }

  abstract getAggregationPath(): any
  abstract wrapAggregations(...aggs: any[]): Array<any>
  abstract wrapFilter(filter: any): any
}
