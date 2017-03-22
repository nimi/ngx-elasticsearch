import { FieldContext } from './FieldContext';
import { ChildrenBucket, HasChildQuery } from '../query_dsl';
import { get } from 'lodash';

export class ChildrenFieldContext extends FieldContext {

  constructor(fieldOptions: any) {
    super(fieldOptions);
    if(!get(this.fieldOptions, 'options.childType')){
      throw new Error('fieldOptions type:children requires options.childType');
    }
  }


  getAggregationPath() {
    return 'inner';
  }

  wrapAggregations(...aggregations: any[]) {
    return [ChildrenBucket(
      'inner',
      this.fieldOptions.options.childType,
      ...aggregations
    )];
  }
  wrapFilter(filter: any) {
    return HasChildQuery(
      this.fieldOptions.options.childType,
      filter,
      this.fieldOptions.options
    );
  }
}
