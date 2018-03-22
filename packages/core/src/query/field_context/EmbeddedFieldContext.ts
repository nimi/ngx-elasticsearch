import { FieldContext, FieldOptions } from './FieldContext';

export class EmbeddedFieldContext implements FieldContext {
  constructor(public fieldOptions?: FieldOptions) {}
  getAggregationPath() { return; }
  wrapAggregations(...aggregations: any[]) { return aggregations }
  wrapFilter(filter: any) { return filter; }
}
