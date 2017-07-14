import { FieldContext, FieldOptions } from './FieldContext';
import { ChildrenBucket, HasChildQuery } from '../query_dsl';
import { get } from 'lodash';

export class ChildrenFieldContext implements FieldContext {
  constructor(public fieldOptions: FieldOptions) {
    if(!get(this.fieldOptions, 'options.childType')){
      throw new Error('fieldOptions of type "children" requires options.childType');
    }
  }

  getAggregationPath() {
    return 'inner';
  }

  wrapAggregations(...aggregations: any[]) {
    return [ ChildrenBucket(
      'inner',
      this.fieldOptions.options.childType,
      ...aggregations
    ) ];
  }

  wrapFilter(filter: any) {
    return HasChildQuery(
      this.fieldOptions.options.childType,
      filter,
      this.fieldOptions.options
    );
  }
}
