import { ImmutableQuery } from '../query/ImmutableQuery';
import { SearchManager } from '../SearchManager';
import { translate, guid } from '../utils';
import { get, compact } from 'lodash';

export class Accessor {
  searchManager: SearchManager;
  uuid: string = guid();
  results: any;
  active: boolean = true;
  translations: any = {};
  refCount: number = 0;

  incrementRef() {
    this.refCount++;
  }

  decrementRef() {
    this.refCount--;
  }

  setActive(active: boolean) {
    this.active = active;
    return this;
  }

  setSearchManager(search: SearchManager){
    this.searchManager = search;
  }

  translate(key: string, interpolations?: any) {
    let translation = (
      (this.searchManager && this.searchManager.translate(key)) ||
       this.translations[key] || key
    );
    return translate(translation, interpolations);
  }

  getResults() {
    return this.results;
  }

  setResults(results: any) {
    this.results = results;
  }

  getAggregations(path: any[], defaultValue: any) {
    const results = this.getResults();
    console.log(results);
    const getPath = compact(['aggregations', ...path]);
    return get(results, getPath, defaultValue);
  }

  beforeBuildQuery(){ }

  buildSharedQuery(query: ImmutableQuery) {
    return query;
  }

  buildOwnQuery(query: ImmutableQuery) {
    return query;
  }
}
