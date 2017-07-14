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

/**
 * @name SearchManager
 * @description
 *
 * The search manager orchestrates query state, agg state, elastic search connections
 * and all other requests to elastic search APIs
 * 
 */
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

  /**
   * @name addAccessor
   * @description Add an accessor to accessor manager state
   * @param accessor 
   */
  addAccessor(accessor: any) {
    accessor.setSearchManager(this);
    return this.accessors.add(accessor);
  }

  /**
   * @name removeAccessor
   * @description Remove an accessor from the accessor manager
   * @param accessor 
   */
  removeAccessor(accessor: any) {
    this.accessors.remove(accessor);
  }

  /**
   * @name addDefaultQuery
   * @description Setup a default query
   * @param fn 
   */
  addDefaultQuery(fn: Function) {
    return this.addAccessor(new AnonymousAccessor(fn));
  }

  /**
   * @name setQueryProcessor
   * @description Set a query processor
   * @param fn
   */
  setQueryProcessor(fn: Function) {
    this.queryProcessor = fn;
  }

  /**
   * @name translate
   * @description Run translate function
   * @param key 
   */
  translate(key: string) {
    return this.translateFunction(key);
  }

  /**
   * @name buildQuery
   * @description Build a query from accessor state
   */
  buildQuery() {
    return this.accessors.buildQuery();
  }

  /**
   * @name resetState
   * @description Reset accessor state
   */
  resetState() {
    this.accessors.resetState();
  }

  /**
   * @name unlistenHistory
   * @description unsubscribe from history listener
   */
  unlistenHistory() {
    if (this.options.useHistory) {
      this._unlistenHistory()
    }
  }

  /**
   * @name listenToHistory
   * @description listener for history events
   */
  listenToHistory() {
    let callsBeforeListen = (this.options.searchOnLoad) ? 1 : 2;

    this._unlistenHistory = this.history.listen(after(callsBeforeListen, (location: any) => {
      //action is POP when the browser modified
      if(location.action === 'POP') {
        this.registrationCompleted
          .then(() => this.searchFromUrlQuery(location.query))
          .catch((e) => console.error(e.stack));
      }
    }));
  }

  /**
   * @name runInitialSearch
   * @description Run a search if search on load is enabled
   */
  runInitialSearch(){
    if(this.options.searchOnLoad) {
      this.registrationCompleted.then(()=> {
        this._search();
      });
    }
  }

  /**
   * @name searchFromUrlQuery
   * @description Run a search from a url query
   * @param query
   */
  searchFromUrlQuery(query: any){
    this.accessors.setState(query);
    this._search();
  }

  /**
   * @name performSearch
   * @description 
   * @param replaceState
   * @param notifyState
   */
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

  /**
   * @name buildSearchUrl
   * @description Build a search URL from the query string state
   * @param extraParams 
   */
  buildSearchUrl(extraParams: any = {}) {
    const params = defaults(extraParams, this.state || this.accessors.getState());
    const queryString = stringifyQueryString(params, { encode: true });
    return window.location.pathname + '?' + queryString;
  }

  /**
   * @name reloadSearch
   * @description reload the initial search
   */
  reloadSearch() {
    delete this.query;
    this.performSearch();
  }

  /**
   * @name search
   * @description Public search method
   * @param replaceState
   */
  search(replaceState: boolean = false) {
    this.performSearch(replaceState);
  }

  /**
   * @name _search
   * @description Internal search method
   * @param
   * @private
   */
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

  /**
   * @name setResults
   * @description Set results into internal state and update response
   * @param results 
   */
  setResults(results: any) {
    this.compareResults(this.results, results);
    this.results = results;
    this.error = null;
    this.accessors.setResults(results);
    this.onResponseChange();
    this.results$$.next(this.getHits());
  }

  /**
   * @name compareResults
   * @description Check if the previous results are different from the current
   * @param previousResults
   * @param results
   */
  compareResults(previousResults: any, results: any) {
    let ids  = map(get(results, ['hits', 'hits'], []), '_id').join(',');
    let previousIds = get(previousResults, ['hits', 'ids'], '');
    if(results.hits){
      results.hits.ids = ids;
      results.hits.hasChanged = !(ids && ids === previousIds);
    }

  }

  /**
   * @name addAccess
   * @description Get hits from results
   */
  getHits(){
    return get(this.results, ['hits', 'hits'], []);
  }

  /**
   * @name getHitsCount
   * @description Read hit count from results
   */
  getHitsCount(){
    return get(this.results, ['hits', 'total'], 0);
  }

  /**
   * @name getTime
   * @description Read time off of results
   */
  getTime() {
    return get(this.results,'took', 0);
  }

  /**
   * @name getSuggestions
   * @description Read suggestions off of results
   */
  getSuggestions() {
    return get(this.results,['suggest', 'suggestions'], {});
  }

  /**
   * @name getQueryAccessor
   * @description Return the query accessor from accessor manager
   */
  getQueryAccessor(): BaseQueryAccessor {
    return this.accessors.queryAccessor;
  }

  /**
   * @name getAccessorsByType
   * @description get all accessors of the same type
   * @param type 
   */
  getAccessorsByType(type: any) {
    return this.accessors.getAccessorsByType(type);
  }

  /**
   * @name getAccessorByType
   * @description Get the accessor from the accessor manager by type
   * @param type 
   */
  getAccessorByType(type: any) {
    return this.accessors.getAccessorByType(type);
  }

  /**
   * @name hasHits
   * @description Check if hits were returned from search
   */
  hasHits() {
    return this.getHitsCount() !== 0;
  }

  /**
   * @name hasHitsChanged
   * @description Read if hits have changed from response
   */
  hasHitsChanged() {
    return get(this.results, ['hits', 'hasChanged'], true)
  }

  /**
   * @name setError
   * @description
   * 
   * Set an error into interal state update response with empty value
   * @param error
   */
  setError(error: any) {
    this.error = error;
    this.results = null;
    this.accessors.setResults(null);
    this.onResponseChange();
  }

  /**
   * @name onResponseChange
   * @description Handler for new search responses
   */
  onResponseChange() {
    this.loading = false;
    this.searching$$.next(this.loading);
    this.initialLoading = false;
  }

}
