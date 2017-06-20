import { Subject } from 'rxjs/Subject';
import { ImmutableQuery } from './query';
import { BaseQueryAccessor, AnonymousAccessor } from './accessors';
import { AccessorManager } from './AccessorManager';
import { ESTransport, HttpESTransport } from './transport';
import { SearchRequest } from './SearchRequest';

import { defaults, constant, map, isEqual, get, after } from 'lodash';

import { stringify as stringifyQueryString } from 'qs';

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
  
  // Elasticsearch host url
  public host: string;

  // Function assigned to resolve function of completed registration promise
  public completeRegistration: Function = () => void 0;

  // Accessor state
  public state: any;

  // Function to use for translation strings
  public translateFunction: Function = constant(undefined);

  // Search Request instance
  public currentSearchRequest: SearchRequest;

  // Optional history instance
  public history: any;

  // Configuration for the search manager
  public options: SearchManagerOptions;

  // Communication module for a ES Communication (i.e HTTP)
  public transport: ESTransport;

  // Accessors are used to manage state and produce a fragment of an ElasticSearch query
  public accessors: AccessorManager = new AccessorManager();

  // Stateful processor for searches, defaults to identity
  public queryProcessor: Function = x => x;

  // Immutable query object
  public query: ImmutableQuery = new ImmutableQuery();

  // Query loading state 
  public loading: boolean;

  // Initial loading state
  public initialLoading: boolean;

  // Error state
  public error: any;

  // Results state
  public results: any;

  // Subjects for handling/emitting searching and results state
  public searching$$: Subject<any> = new Subject<any>();
  public results$$: Subject<any> = new Subject<any>();

  // Private
  private _unlistenHistory: Function = x => x;
  private registrationCompleted: Promise<any> = new Promise((resolve) => {
    this.completeRegistration = resolve;
  });

  constructor(host: string, options: SearchManagerOptions = {}){
    this.host = host;
    this.options = defaults(options, {
      useHistory: true,
      httpHeaders: {},
      searchOnLoad: true,
    });
    this.transport = this.options.transport || new HttpESTransport(host, {
      headers: this.options.httpHeaders,
      basicAuth: this.options.basicAuth,
      searchUrlPath: this.options.searchUrlPath || '_search',
      timeout:  this.options.timeout
    });
  }

  setupListeners() {
    this.initialLoading = true;
    if(this.options.useHistory) {
      // TODO: Add history logic
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

  unlistenHistory() {
    if (this.options.useHistory) {
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
    }));
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
    const queryString = stringifyQueryString(params, { encode: true });
    return window.location.pathname + '?' + queryString;
  }

  reloadSearch() {
    delete this.query;
    this.performSearch();
  }

  search(replaceState: boolean = false) {
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
    this.searching$$.next(this.loading);
    let queryObject = this.queryProcessor(this.query.getJSON());
    this.currentSearchRequest && this.currentSearchRequest.deactivate();
    this.currentSearchRequest = new SearchRequest(this.transport, queryObject, this);
    this.currentSearchRequest.run();
  }

  setResults(results: any) {
    this.compareResults(this.results, results);
    this.results = results;
    this.error = null;
    this.accessors.setResults(results);
    this.onResponseChange();
    this.results$$.next(this.getHits());
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
    this.searching$$.next(this.loading);
    this.initialLoading = false;
  }

}
