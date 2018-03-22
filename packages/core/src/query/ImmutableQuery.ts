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

  /**
   * @name buildQuery
   * @description Create a query from the index state
   */
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

  /**
   * @name hasFilters
   * @description Check if index has any filters
   */
  hasFilters() {
    return this.index.filters.length > 0;
  }

  /**
   * @name buildFiltersOrQuery
   * @description Check if index has filters or queries
   */
  hasFiltersOrQuery() {
    return (this.index.queries.length +
      this.index.filters.length) > 0 || !!this.index.sort;
  }

  /**
   * @name addQuery
   * @description Add a new query to the index
   * @param query 
   */
  addQuery(query: any) {
    if (!query) {
      return this;
    }
    return this.update({
      queries:{ $push: [query] }
    });
  }

  /**
   * @name setQueryString
   * @description Set the query string on the index
   * @param queryString 
   */
  setQueryString(queryString: string | any | undefined) {
    return this.update({ $merge: { queryString } });
  }

  /**
   * @name getQueryString
   * @description Get query string from the index state
   */
  getQueryString() {
    return this.index.queryString;
  }

  /**
   * @name addSelectedFilter
   * @description Add a single filter to index filters
   * @param selectedFilter
   */
  addSelectedFilter(selectedFilter: SelectedFilter){
    return this.addSelectedFilters([ selectedFilter ]);
  }

  /**
   * @name addSelectedFilters
   * @description Add a set of filters to index selected filters
   * @param selectedFilters 
   */
  addSelectedFilters(selectedFilters: Array<SelectedFilter>) {
    return this.update({
      selectedFilters: { $push: selectedFilters }
    });
  }

  /**
   * @name setSelectedFilters
   * @description Get the current set of selected filters
   */
  getSelectedFilters() {
    return this.index.selectedFilters;
  }

  /**
   * @name addAnonymousFilter
   * @description Add an unnamed filter
   * @param filter 
   */
  addAnonymousFilter(filter: any) {
    return this.addFilter(guid(), filter);
  }

  /**
   * @name addFilter
   * @description Add filters to index filter set
   * @param key 
   * @param filter 
   */
  addFilter(key: string, filter: any) {
    return this.update({
      filters: { $push: [filter] },
      filtersMap:{ $merge:{ [key]: filter } }
    });
  }

  /**
   * @name setAggs
   * @description Set the aggs on the index
   * @param aggs 
   */
  setAggs(aggs: any) {
    return this.deepUpdate('aggs', aggs);
  }

  /**
   * @name getFilters
   * @description Get a list of filters 
   * @param keys 
   */
  getFilters(keys: any[] = []) {
    return this.getFiltersWithoutKeys(keys);
  }

  /**
   * @name _getFilters
   * @description Internal method for getting filters
   * @param keys 
   * @param method 
   */
  private _getFilters(keys: any, method: Function) {
    keys = [].concat(keys);
    const filters = values(method(this.index.filtersMap || {}, keys));
    return BoolMust(filters);
  }

  /**
   * @name getFiltersWithKeys
   * @description Get filters with a certain set of keys
   * @param keys 
   */
  getFiltersWithKeys(keys: any[]) {
    return this._getFilters(keys, pick);
  }

  /**
   * @name getFiltersWithoutKeys
   * @description Get filters without a specified set included
   * @param keys 
   */
  getFiltersWithoutKeys(keys: any) {
    return this._getFilters(keys, omit);
  }

  /**
   * @name setSize
   * @description Set the index size
   * @param size 
   */
  setSize(size: number) {
    return this.update({ $merge: { size } });
  }

  /**
   * @name setSort
   * @description Set the index state for sort order
   * @param sort 
   */
  setSort(sort: any) {
    return this.update({ $merge: {sort:sort}});
  }

  /**
   * @name setSource
   * @description Set source property for the index
   * @param _source 
   */
  setSource(_source: SourceFilterType) {
    return this.update({ $merge: { _source } });
  }

  /**
   * @name setQueryString
   * @description Set the highlight prop on the index
   * @param highlight 
   */
  setHighlight(highlight: any) {
    return this.deepUpdate('highlight', highlight);
  }

  /**
   * @name getSize
   * @description Get the query size
   */
  getSize() {
    return this.query.size;
  }

  /**
   * @name setFrom
   * @description Set the from prop on the index
   * @param from 
   */
  setFrom(from: number) {
    return this.update({ $merge: { from } });
  }

  /**
   * @name getFrom
   * @description Get the from prop of the query
   */
  getFrom() {
    return this.query.from;
  }

  /**
   * @name getPage
   * @description Get the page based on size and from state
   */
  getPage() {
    return 1 + Math.floor((this.getFrom() || 0) / (this.getSize() || 10));
  }

  /**
   * @name deepUpdate
   * @description Update index state prop deeply
   * @param key
   * @param ob 
   */
  deepUpdate(key: string, ob: any){
    return this.update({
      $merge: {
        [key]: merge({}, this.index[key] || {}, ob)
      }
    });
  }

  /**
   * @name setSuggestions
   * @description Set the suggestions state on the index
   * @param suggestions 
   */
  setSuggestions(suggestions: any) {
    return this.update({
      $merge: {suggest: suggestions }
    });
  }

  /**
   * @name update
   * @description Apply a new query to the index state
   * @param updateDef immutable operation to be applied
   */
  private update(updateDef: any) {
    return new ImmutableQuery(
      update(this.index, updateDef)
    );
  }

  /**
   * @name getJSON
   * @description Get the JSON query
   */
  getJSON() {
    return this.query;
  }

  /**
   * @name printJSON
   * @description Print the JSON query
   */
  printJSON(){
    console.log(JSON.stringify(this.getJSON(), null, 2));
  }
}
