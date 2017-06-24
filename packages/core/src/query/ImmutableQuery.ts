import { BoolMust } from './query_dsl';
import { guid } from '../utils';
import { SelectedFilter } from './SelectedFilter';
import { omitBy, omit, values, pick, merge, isUndefined } from 'lodash';

import { update } from '../utils/immutability-helper';

export type SourceFilterType = string | Array<string> | boolean;

/**
 * @name ImmutableQuery
 * @description
 *
 * This class is responsible for building, storing and accessing
 * query objects. It manages the query object as the class name implies
 * by making updates via immutable transactions
 * 
 */
export class ImmutableQuery {

  /**
   * Default state of the index of none is provided
   */
  static defaultIndex: any = {
    queryString: '',
    filtersMap: {},
    selectedFilters: [],
    queries: [],
    filters: [],
    _source: null,
    size: 10
  };
  
  /**
   * @name query
   * @description Publicly accessible query object
   */
  public query: any;

  /**
   * @name index
   * @description Internal state of the index 
   */
  private index: any;

  constructor(index: any = ImmutableQuery.defaultIndex) {
    this.index = index;
    this.buildQuery();
  }

  buildQuery() {
    const q: any = {};
    if(this.index.queries.length > 0) {
      q.query = BoolMust(this.index.queries)
    }
    if (this.index.filters.length > 0) {
      q.post_filter = BoolMust(this.index.filters);
    }
    q.aggs = this.index.aggs;
    q.size = this.index.size;
    q.from = this.index.from;
    q.sort = this.index.sort;
    q.highlight = this.index.highlight;
    q.suggest = this.index.suggest;
    if (this.index._source) {
      q._source = this.index._source;
    }
    this.query = omitBy(q, isUndefined);
  }

  hasFilters() {
    return this.index.filters.length > 0;
  }

  hasFiltersOrQuery() {
    return (this.index.queries.length +
      this.index.filters.length) > 0 || !!this.index.sort;
  }

  addQuery(query: any) {
    if (!query) {
      return this;
    }
    return this.update({
      queries:{ $push: [query] }
    });
  }

  setQueryString(queryString: string | any | undefined) {
    return this.update({ $merge: { queryString } });
  }

  getQueryString() {
    return this.index.queryString;
  }

  addSelectedFilter(selectedFilter: SelectedFilter | any){
    return this.addSelectedFilters([ selectedFilter ]);
  }

  addSelectedFilters(selectedFilters: Array<SelectedFilter>) {
    return this.update({
      selectedFilters:{ $push: selectedFilters }
    });
  }

  getSelectedFilters() {
    return this.index.selectedFilters;
  }

  addAnonymousFilter(bool: any) {
    return this.addFilter(guid(), bool);
  }

  addFilter(key: string, filter: any) {
    return this.update({
      filters: { $push: [filter] },
      filtersMap:{ $merge:{ [key]:filter } }
    });
  }

  setAggs(aggs: any) {
    return this.deepUpdate('aggs', aggs);
  }

  getFilters(keys: any[] = []) {
    return this.getFiltersWithoutKeys(keys);
  }

  _getFilters(keys: any, method: Function) {
    keys = [].concat(keys);
    const filters = values(method(this.index.filtersMap || {}, keys));
    return BoolMust(filters);
  }
  getFiltersWithKeys(keys: any[]) {
    return this._getFilters(keys, pick);
  }

  getFiltersWithoutKeys(keys: any) {
    return this._getFilters(keys, omit);
  }

  setSize(size: number) {
    return this.update({ $merge: { size } });
  }

  setSort(sort: any) {
    return this.update({ $merge: {sort:sort}});
  }

  setSource(_source: SourceFilterType) {
    return this.update({ $merge: { _source } });
  }

  setHighlight(highlight: any) {
    return this.deepUpdate('highlight', highlight);
  }

  getSize() {
    return this.query.size;
  }

  setFrom(from: number) {
    return this.update({ $merge: { from } });
  }

  getFrom() {
    return this.query.from;
  }

  getPage() {
    return 1 + Math.floor((this.getFrom()||0) / (this.getSize()||10));
  }

  deepUpdate(key: string, ob: any){
    return this.update({
      $merge: {
        [key]:merge({}, this.index[key] || {}, ob)
      }
    });
  }

  setSuggestions(suggestions: any) {
    return this.update({
      $merge: {suggest: suggestions }
    });
  }

  update(updateDef: any) {
    return new ImmutableQuery(
      update(this.index, updateDef)
    );
  }

  getJSON() {
    return this.query;
  }

  printJSON(){
    console.log(JSON.stringify(this.getJSON(), null, 2));
  }
}
