import { ValueState } from '../state';
import { StatefulAccessor } from './StatefulAccessor';
import { computeOptionKeys } from '../utils';
import { find, head, map, compact } from 'lodash';

export interface SortingField {
  field: string;
  options: Object;
}

export interface SortingOption {
  label: string,
  field?: string,
  order?: string,
  defaultOption?: boolean,
  key?: string,
  fields?: Array<SortingField>
}

export interface SortingOptions {
  options: Array<SortingOption>
}

export class SortingAccessor extends StatefulAccessor<ValueState> {
  state = new ValueState();
  options: SortingOptions;

  constructor(key: string, options: SortingOptions) {
    super(key);
    this.options = options;
    this.options.options = computeOptionKeys(
      this.options.options, ['field', 'order'], 'none'
    );
  }

  getSelectedOption() {
    let options = this.options.options;
    return  find(options, {key: `${this.state.getValue()}` }) ||
            find(options, {defaultOption:true}) ||
            head(options);
  }

  getSortQuery(sortOption: any) {
    if (sortOption.fields) {
      return map(sortOption.fields, (field: SortingField) => {
        return { [field.field]: field.options || {} }
      });
    } else if(sortOption.field && sortOption.order) {
      return [{[sortOption.field]: sortOption.order}];
    } else if (sortOption.field) {
      return [sortOption.field];
    }
    return null;
  }

  buildOwnQuery(query: any) {
    let selectedSortOption = this.getSelectedOption();
    if (selectedSortOption) {
      let sortQuery = this.getSortQuery(selectedSortOption);
      if(sortQuery){
        query = query.setSort(sortQuery);
      }
    }
    return query;
  }
}
