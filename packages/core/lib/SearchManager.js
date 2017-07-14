"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var query_1 = require("./query");
var accessors_1 = require("./accessors");
var AccessorManager_1 = require("./AccessorManager");
var transport_1 = require("./transport");
var SearchRequest_1 = require("./SearchRequest");
var lodash_1 = require("lodash");
var qs_1 = require("qs");
/**
 * @name SearchManager
 * @description
 *
 * The search manager orchestrates query state, agg state, elastic search connections
 * and all other requests to elastic search APIs
 *
 */
var SearchManager = (function () {
    function SearchManager(host, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        // Function assigned to resolve function of completed registration promise
        this.completeRegistration = function () { return void 0; };
        // Function to use for translation strings
        this.translateFunction = lodash_1.constant(undefined);
        // Accessors are used to manage state and produce a fragment of an ElasticSearch query
        this.accessors = new AccessorManager_1.AccessorManager();
        // Stateful processor for searches, defaults to identity
        this.queryProcessor = function (x) { return x; };
        // Immutable query object
        this.query = new query_1.ImmutableQuery();
        // Subjects for handling/emitting searching and results state
        this.searching$$ = new Subject_1.Subject();
        this.results$$ = new Subject_1.Subject();
        // Private
        this._unlistenHistory = function (x) { return x; };
        this.registrationCompleted = new Promise(function (resolve) {
            _this.completeRegistration = resolve;
        });
        this.host = host;
        this.options = lodash_1.defaults(options, {
            useHistory: true,
            httpHeaders: {},
            searchOnLoad: true,
        });
        this.transport = this.options.transport || new transport_1.HttpESTransport(host, {
            headers: this.options.httpHeaders,
            basicAuth: this.options.basicAuth,
            searchUrlPath: this.options.searchUrlPath || '_search',
            timeout: this.options.timeout
        });
    }
    SearchManager.prototype.setupListeners = function () {
        this.initialLoading = true;
        if (this.options.useHistory) {
            // TODO: Add history logic
            // this.unlistenHistory();
            // this.history = createHistoryInstance();
            // this.listenToHistory();
        }
        else {
            this.runInitialSearch();
        }
    };
    /**
     * @name addAccessor
     * @description Add an accessor to accessor manager state
     * @param accessor
     */
    SearchManager.prototype.addAccessor = function (accessor) {
        accessor.setSearchManager(this);
        return this.accessors.add(accessor);
    };
    /**
     * @name removeAccessor
     * @description Remove an accessor from the accessor manager
     * @param accessor
     */
    SearchManager.prototype.removeAccessor = function (accessor) {
        this.accessors.remove(accessor);
    };
    /**
     * @name addDefaultQuery
     * @description Setup a default query
     * @param fn
     */
    SearchManager.prototype.addDefaultQuery = function (fn) {
        return this.addAccessor(new accessors_1.AnonymousAccessor(fn));
    };
    /**
     * @name setQueryProcessor
     * @description Set a query processor
     * @param fn
     */
    SearchManager.prototype.setQueryProcessor = function (fn) {
        this.queryProcessor = fn;
    };
    /**
     * @name translate
     * @description Run translate function
     * @param key
     */
    SearchManager.prototype.translate = function (key) {
        return this.translateFunction(key);
    };
    /**
     * @name buildQuery
     * @description Build a query from accessor state
     */
    SearchManager.prototype.buildQuery = function () {
        return this.accessors.buildQuery();
    };
    /**
     * @name resetState
     * @description Reset accessor state
     */
    SearchManager.prototype.resetState = function () {
        this.accessors.resetState();
    };
    /**
     * @name unlistenHistory
     * @description unsubscribe from history listener
     */
    SearchManager.prototype.unlistenHistory = function () {
        if (this.options.useHistory) {
            this._unlistenHistory();
        }
    };
    /**
     * @name listenToHistory
     * @description listener for history events
     */
    SearchManager.prototype.listenToHistory = function () {
        var _this = this;
        var callsBeforeListen = (this.options.searchOnLoad) ? 1 : 2;
        this._unlistenHistory = this.history.listen(lodash_1.after(callsBeforeListen, function (location) {
            //action is POP when the browser modified
            if (location.action === 'POP') {
                _this.registrationCompleted
                    .then(function () { return _this.searchFromUrlQuery(location.query); })
                    .catch(function (e) { return console.error(e.stack); });
            }
        }));
    };
    /**
     * @name runInitialSearch
     * @description Run a search if search on load is enabled
     */
    SearchManager.prototype.runInitialSearch = function () {
        var _this = this;
        if (this.options.searchOnLoad) {
            this.registrationCompleted.then(function () {
                _this._search();
            });
        }
    };
    /**
     * @name searchFromUrlQuery
     * @description Run a search from a url query
     * @param query
     */
    SearchManager.prototype.searchFromUrlQuery = function (query) {
        this.accessors.setState(query);
        this._search();
    };
    /**
     * @name performSearch
     * @description
     * @param replaceState
     * @param notifyState
     */
    SearchManager.prototype.performSearch = function (replaceState, notifyState) {
        if (replaceState === void 0) { replaceState = false; }
        if (notifyState === void 0) { notifyState = true; }
        if (notifyState && !lodash_1.isEqual(this.accessors.getState(), this.state)) {
            this.accessors.notifyStateChange(this.state);
        }
        this._search();
        if (this.options.useHistory) {
            var historyMethod = (replaceState) ?
                this.history.replace : this.history.push;
            historyMethod({ pathname: window.location.pathname, query: this.state });
        }
    };
    /**
     * @name buildSearchUrl
     * @description Build a search URL from the query string state
     * @param extraParams
     */
    SearchManager.prototype.buildSearchUrl = function (extraParams) {
        if (extraParams === void 0) { extraParams = {}; }
        var params = lodash_1.defaults(extraParams, this.state || this.accessors.getState());
        var queryString = qs_1.stringify(params, { encode: true });
        return window.location.pathname + '?' + queryString;
    };
    /**
     * @name reloadSearch
     * @description reload the initial search
     */
    SearchManager.prototype.reloadSearch = function () {
        delete this.query;
        this.performSearch();
    };
    /**
     * @name search
     * @description Public search method
     * @param replaceState
     */
    SearchManager.prototype.search = function (replaceState) {
        if (replaceState === void 0) { replaceState = false; }
        this.performSearch(replaceState);
    };
    /**
     * @name _search
     * @description Internal search method
     * @param
     * @private
     */
    SearchManager.prototype._search = function () {
        this.state = this.accessors.getState();
        var query = this.buildQuery();
        if (this.query && lodash_1.isEqual(query.getJSON(), this.query.getJSON())) {
            return;
        }
        this.query = query;
        this.loading = true;
        this.searching$$.next(this.loading);
        var queryObject = this.queryProcessor(this.query.getJSON());
        this.currentSearchRequest && this.currentSearchRequest.deactivate();
        this.currentSearchRequest = new SearchRequest_1.SearchRequest(this.transport, queryObject, this);
        this.currentSearchRequest.run();
    };
    /**
     * @name setResults
     * @description Set results into internal state and update response
     * @param results
     */
    SearchManager.prototype.setResults = function (results) {
        this.compareResults(this.results, results);
        this.results = results;
        this.error = null;
        this.accessors.setResults(results);
        this.onResponseChange();
        this.results$$.next(this.getHits());
    };
    /**
     * @name compareResults
     * @description Check if the previous results are different from the current
     * @param previousResults
     * @param results
     */
    SearchManager.prototype.compareResults = function (previousResults, results) {
        var ids = lodash_1.map(lodash_1.get(results, ['hits', 'hits'], []), '_id').join(',');
        var previousIds = lodash_1.get(previousResults, ['hits', 'ids'], '');
        if (results.hits) {
            results.hits.ids = ids;
            results.hits.hasChanged = !(ids && ids === previousIds);
        }
    };
    /**
     * @name addAccess
     * @description Get hits from results
     */
    SearchManager.prototype.getHits = function () {
        return lodash_1.get(this.results, ['hits', 'hits'], []);
    };
    /**
     * @name getHitsCount
     * @description Read hit count from results
     */
    SearchManager.prototype.getHitsCount = function () {
        return lodash_1.get(this.results, ['hits', 'total'], 0);
    };
    /**
     * @name getTime
     * @description Read time off of results
     */
    SearchManager.prototype.getTime = function () {
        return lodash_1.get(this.results, 'took', 0);
    };
    /**
     * @name getSuggestions
     * @description Read suggestions off of results
     */
    SearchManager.prototype.getSuggestions = function () {
        return lodash_1.get(this.results, ['suggest', 'suggestions'], {});
    };
    /**
     * @name getQueryAccessor
     * @description Return the query accessor from accessor manager
     */
    SearchManager.prototype.getQueryAccessor = function () {
        return this.accessors.queryAccessor;
    };
    /**
     * @name getAccessorsByType
     * @description get all accessors of the same type
     * @param type
     */
    SearchManager.prototype.getAccessorsByType = function (type) {
        return this.accessors.getAccessorsByType(type);
    };
    /**
     * @name getAccessorByType
     * @description Get the accessor from the accessor manager by type
     * @param type
     */
    SearchManager.prototype.getAccessorByType = function (type) {
        return this.accessors.getAccessorByType(type);
    };
    /**
     * @name hasHits
     * @description Check if hits were returned from search
     */
    SearchManager.prototype.hasHits = function () {
        return this.getHitsCount() !== 0;
    };
    /**
     * @name hasHitsChanged
     * @description Read if hits have changed from response
     */
    SearchManager.prototype.hasHitsChanged = function () {
        return lodash_1.get(this.results, ['hits', 'hasChanged'], true);
    };
    /**
     * @name setError
     * @description
     *
     * Set an error into interal state update response with empty value
     * @param error
     */
    SearchManager.prototype.setError = function (error) {
        this.error = error;
        this.results = null;
        this.accessors.setResults(null);
        this.onResponseChange();
    };
    /**
     * @name onResponseChange
     * @description Handler for new search responses
     */
    SearchManager.prototype.onResponseChange = function () {
        this.loading = false;
        this.searching$$.next(this.loading);
        this.initialLoading = false;
    };
    return SearchManager;
}());
exports.SearchManager = SearchManager;
//# sourceMappingURL=SearchManager.js.map