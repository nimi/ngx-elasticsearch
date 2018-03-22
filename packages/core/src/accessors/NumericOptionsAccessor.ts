import {find, compact, map, filter, omitBy, isUndefined, includes} from 'lodash';

import { ArrayState } from '../state';
import { FilterBasedAccessor } from './FilterBasedAccessor';
import { computeOptionKeys } from '../utils';
import {
  FieldContextFactory, FieldOptions, FieldContext,
  SelectedFilter, FilterBucket, RangeBucket,
  RangeQuery, BoolShould, ImmutableQuery
} from '../query';

export interface RangeOption {
  title: string,
  from?: number,
  to?: number,
  key?: string
}

export interface NumericOptions {
  field: string
  title: string
  options: Array<RangeOption>
  multiselect?: boolean
  id: string
  fieldOptions?: FieldOptions
}

export class NumericOptionsAccessor extends FilterBasedAccessor<ArrayState> {

  state: ArrayState = new ArrayState();
  options: NumericOptions;
  fieldContext: FieldContext;

  constructor(key: any, options: NumericOptions) {
    super(key);
    this.options = options;
    this.options.options = computeOptionKeys(
      options.options, ['from', 'to'], 'all'
    );
    this.options.fieldOptions = this.options.fieldOptions || {type:'embedded'};
    this.options.fieldOptions.field = this.options.field;
    this.fieldContext = FieldContextFactory(this.options.fieldOptions);
  }

  getDefaultOption() {
    return find(this.options.options, it => isUndefined(it.from) && isUndefined(it.to));
  }

  getSelectedOptions() {
    let keys = this.state.getValue();
    return filter(
      this.options.options,
      (opt: any) => includes(keys, opt.key)
    );
  }



  getSelectedOrDefaultOptions() {
    const selectedOptions = this.getSelectedOptions();
    if (selectedOptions && selectedOptions.length > 0) return selectedOptions;
    const defaultOption = this.getDefaultOption();
    if (defaultOption) return [defaultOption];
    return [];
  }


  setOptions(titles: any[]) {
    if(titles.length === 1){
      this.state = this.state.clear();
      this.toggleOption(titles[0]);
    } else {

      let keys: any = map(
        filter(this.options.options, opt=> includes(titles, opt.title)),
        'key'
      );

      this.state = this.state.setValue(keys);
      this.searchManager.performSearch();
    }
  }

  toggleOption(key: any) {
    let option: any = find(this.options.options, { title: key }) || {};
    if (option) {
      if (option === this.getDefaultOption()) {
        this.state = this.state.clear();
      } else if (this.options.multiselect) {
        this.state = this.state.toggle(option.key);
      } else {
        this.state = this.state.setValue([option.key]);
      }
      this.searchManager.performSearch();
    }
  }

  getBuckets() {
    return filter(this.getAggregations([
      this.uuid,
      this.fieldContext.getAggregationPath(),
      this.key,'buckets'], []
    ), this.emptyOptionsFilter);
  }

  getDocCount() {
    return this.getAggregations([
      this.uuid,
      this.fieldContext.getAggregationPath(),
      'doc_count'], 0);
  }

  emptyOptionsFilter(option: any) {
    return option.doc_count > 0;
  }

  buildSharedQuery(query: ImmutableQuery) {
    var filters = this.getSelectedOptions();
    var filterRanges = map(filters, filter => {
      return this.fieldContext.wrapFilter(RangeQuery(this.options.field, {
        gte: filter.from, lt: filter.to
      }));
    });
    var selectedFilters: Array<SelectedFilter> = map(filters, (filter) => {
      return {
        name: this.translate(this.options.title),
        value: this.translate(filter.title),
        id: this.options.id,
        remove: () => this.state = this.state.remove(filter.key)
      }
    });

    if (filterRanges.length > 0) {
      query = query.addFilter(this.uuid, BoolShould(filterRanges))
        .addSelectedFilters(selectedFilters);
    }

    return query;
  }

  getRanges() {
    return compact(map(this.options.options, (range: RangeOption) => {
      return omitBy({
        key:range.title,
        from:range.from,
        to:range.to
      }, isUndefined);
    }));
  }

  buildOwnQuery(query: ImmutableQuery) {
    return query.setAggs(FilterBucket(
      this.uuid,
      query.getFiltersWithoutKeys(this.uuid),
      ...this.fieldContext.wrapAggregations(
        RangeBucket(
          this.key,
          this.options.field,
          this.getRanges()
        )
      )
    ));
  }

}
