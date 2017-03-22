import { FieldContext } from './FieldContext';

export class EmbeddedFieldContext extends FieldContext {
  getAggregationPath() { return; }
  wrapAggregations(...aggregations: any[]) { return aggregations }
  wrapFilter(filter: any) { return filter; }
}
