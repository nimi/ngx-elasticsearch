import { ImmutableQuery } from './query';
import { Accessor, BaseQueryAccessor, AnonymousAccessor } from './accessors';
import { AccessorManager } from './AccessorManager';
import { createHistoryInstance } from './history';
import { ESTransport, HttpESTransport } from './transport';
import { SearchRequest } from './SearchRequest';
import { EventEmitter } from './utils';

import { defaults, constant, map, isEqual, get, after, identity } from 'lodash';

const qs = require('qs');

export interface SearchManagerOptions {
  useHistory?: boolean;
  searchOnLoad?: boolean;
  httpHeaders?: Object;
  basicAuth?: string;
  transport?: ESTransport;
  searchUrlPath?: string;
  timeout?: number;
}

export class SearchManager {
  private registrationCompleted: Promise<any>;
  host: string;
  completeRegistration: Function;
  state: any;
  translateFunction: Function;
  currentSearchRequest: SearchRequest;
  history: any;
  _unlistenHistory: Function;
  options: SearchManagerOptions;
  transport: ESTransport;
  emitter: EventEmitter;
  resultsEmitter: EventEmitter;
  accessors: AccessorManager;
  queryProcessor: Function;
  query: ImmutableQuery;
  loading: boolean;
  initialLoading: boolean;
  error: any;
  results: any;

  constructor(host: string, options: SearchManagerOptions = {}){
    this.options = defaults(options, {
      useHistory: true,
      httpHeaders: {},
      searchOnLoad: true
    });
    this.host = host;

    this.transport = this.options.transport || new HttpESTransport(host, {
      headers: this.options.httpHeaders,
      basicAuth: this.options.basicAuth,
      searchUrlPath: this.options.searchUrlPath || '_search',
      timeout:  this.options.timeout
    });
    this.accessors = new AccessorManager();
		this.registrationCompleted = new Promise((resolve) => {
			this.completeRegistration = resolve
		});
    this.translateFunction = constant(undefined);
    this.queryProcessor = identity;
    // this.primarySearcher = this.createSearcher()
    this.query = new ImmutableQuery();
    this.emitter = new EventEmitter();
    this.resultsEmitter = new EventEmitter();
  }

  setupListeners() {
    this.initialLoading = true;
    if(this.options.useHistory) {
      // this.unlistenHistory();
      // this.history = createHistoryInstance();
      // this.listenToHistory();
    } else {
      this.runInitialSearch();
    }
  }

  addAccessor(accessor: any) {
    accessor.setSearchManager(this);
    return this.accessors.add(accessor);
  }

  removeAccessor(accessor: any) {
    this.accessors.remove(accessor);
  }

  addDefaultQuery(fn: Function) {
    return this.addAccessor(new AnonymousAccessor(fn));
  }

  setQueryProcessor(fn: Function) {
    this.queryProcessor = fn;
  }

  translate(key: string) {
    return this.translateFunction(key);
  }

  buildQuery() {
    return this.accessors.buildQuery();
  }

  resetState() {
    this.accessors.resetState();
  }

  addResultsListener(fn: Function) {
    return this.resultsEmitter.addListener(fn);
  }

  unlistenHistory() {
    if (this.options.useHistory && this._unlistenHistory) {
      this._unlistenHistory()
    }
  }
  listenToHistory() {
    let callsBeforeListen = (this.options.searchOnLoad) ? 1: 2;

    this._unlistenHistory = this.history.listen(after(callsBeforeListen, (location: any) => {
      //action is POP when the browser modified
      if(location.action === 'POP') {
        this.registrationCompleted
          .then(() => this.searchFromUrlQuery(location.query))
          .catch((e) => console.error(e.stack));
      }
    }))
  }

  runInitialSearch(){
    if(this.options.searchOnLoad) {
      this.registrationCompleted.then(()=> {
        this._search();
      });
    }
  }

  searchFromUrlQuery(query: any){
    this.accessors.setState(query);
    this._search();
  }

  performSearch(replaceState: boolean = false, notifyState: boolean = true){
    if(notifyState && !isEqual(this.accessors.getState(), this.state)){
      this.accessors.notifyStateChange(this.state);
    }
    this._search();
    if(this.options.useHistory){
      const historyMethod = (replaceState) ?
        this.history.replace : this.history.push;
      historyMethod({pathname: window.location.pathname, query: this.state});
    }
  }

  buildSearchUrl(extraParams: any = {}) {
    const params = defaults(extraParams, this.state || this.accessors.getState());
    const queryString = qs.stringify(params, { encode: true });
    return window.location.pathname + '?' + queryString;
  }

  reloadSearch() {
    delete this.query;
    this.performSearch();
  }

  search(replaceState: boolean = false){
    this.performSearch(replaceState);
  }

  _search() {
    this.state = this.accessors.getState();
    let query = this.buildQuery();
    if(this.query && isEqual(query.getJSON(), this.query.getJSON())) {
      return;
    }
    this.query = query;
    this.loading = true;
    this.emitter.trigger();
    let queryObject = this.queryProcessor(this.query.getJSON());
    this.currentSearchRequest && this.currentSearchRequest.deactivate();
    this.currentSearchRequest = new SearchRequest(
      this.transport, queryObject, this);
    this.currentSearchRequest.run();
  }

  setResults(results: any) {
    this.compareResults(this.results, results);
    this.results = results;
    this.error = null;
    this.accessors.setResults(results);
    this.onResponseChange();
    this.resultsEmitter.trigger(this.results);
  }

  compareResults(previousResults: any, results: any) {
    let ids  = map(get(results, ['hits', 'hits'], []), '_id').join(',');
    let previousIds = get(previousResults, ['hits', 'ids'], '');
    if(results.hits){
      results.hits.ids = ids;
      results.hits.hasChanged = !(ids && ids === previousIds);
    }

  }

  getHits(){
    return get(this.results, ['hits', 'hits'], []);
  }

  getHitsCount(){
    return get(this.results, ['hits', 'total'], 0);
  }

  getTime() {
    return get(this.results,'took', 0);
  }

  getSuggestions() {
    return get(this.results,['suggest', 'suggestions'], {});
  }

  getQueryAccessor(): BaseQueryAccessor {
    return this.accessors.queryAccessor;
  }

  getAccessorsByType(type: any) {
    return this.accessors.getAccessorsByType(type);
  }

  getAccessorByType(type: any) {
    return this.accessors.getAccessorByType(type);
  }

  hasHits() {
    return this.getHitsCount() > 0
  }

  hasHitsChanged() {
    return get(this.results, ['hits', 'hasChanged'], true)
  }

  setError(error: any) {
    this.error = error;
    this.results = null;
    this.accessors.setResults(null);
    this.onResponseChange();
  }

  onResponseChange() {
    this.loading = false;
    this.initialLoading = false;
    this.emitter.trigger();
  }

}
