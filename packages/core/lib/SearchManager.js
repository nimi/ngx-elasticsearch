"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var query_1 = require("./query");
var accessors_1 = require("./accessors");
var AccessorManager_1 = require("./AccessorManager");
var transport_1 = require("./transport");
var SearchRequest_1 = require("./SearchRequest");
var lodash_1 = require("lodash");
var qs = require('qs');
var SearchManager = (function () {
    function SearchManager(host, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.completeRegistration = function () { return void 0; };
        this.searching$$ = new Subject_1.Subject();
        this.results$$ = new Subject_1.Subject();
        this.options = lodash_1.defaults(options, {
            useHistory: true,
            httpHeaders: {},
            searchOnLoad: true,
        });
        this.host = host;
        this.transport = this.options.transport || new transport_1.HttpESTransport(host, {
            headers: this.options.httpHeaders,
            basicAuth: this.options.basicAuth,
            searchUrlPath: this.options.searchUrlPath || '_search',
            timeout: this.options.timeout
        });
        this.accessors = new AccessorManager_1.AccessorManager();
        this.registrationCompleted = new Promise(function (resolve) {
            _this.completeRegistration = resolve;
        });
        this.translateFunction = lodash_1.constant(undefined);
        this.queryProcessor = lodash_1.identity;
        this.query = new query_1.ImmutableQuery();
    }
    SearchManager.prototype.setupListeners = function () {
        this.initialLoading = true;
        if (this.options.useHistory) {
            // this.unlistenHistory();
            // this.history = createHistoryInstance();
            // this.listenToHistory();
        }
        else {
            this.runInitialSearch();
        }
    };
    SearchManager.prototype.addAccessor = function (accessor) {
        accessor.setSearchManager(this);
        return this.accessors.add(accessor);
    };
    SearchManager.prototype.removeAccessor = function (accessor) {
        this.accessors.remove(accessor);
    };
    SearchManager.prototype.addDefaultQuery = function (fn) {
        return this.addAccessor(new accessors_1.AnonymousAccessor(fn));
    };
    SearchManager.prototype.setQueryProcessor = function (fn) {
        this.queryProcessor = fn;
    };
    SearchManager.prototype.translate = function (key) {
        return this.translateFunction(key);
    };
    SearchManager.prototype.buildQuery = function () {
        return this.accessors.buildQuery();
    };
    SearchManager.prototype.resetState = function () {
        this.accessors.resetState();
    };
    SearchManager.prototype.unlistenHistory = function () {
        if (this.options.useHistory && this._unlistenHistory) {
            this._unlistenHistory();
        }
    };
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
    SearchManager.prototype.runInitialSearch = function () {
        var _this = this;
        if (this.options.searchOnLoad) {
            this.registrationCompleted.then(function () {
                _this._search();
                console.log('registration completed, searching', _this);
            });
        }
    };
    SearchManager.prototype.searchFromUrlQuery = function (query) {
        this.accessors.setState(query);
        this._search();
    };
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
    SearchManager.prototype.buildSearchUrl = function (extraParams) {
        if (extraParams === void 0) { extraParams = {}; }
        var params = lodash_1.defaults(extraParams, this.state || this.accessors.getState());
        var queryString = qs.stringify(params, { encode: true });
        return window.location.pathname + '?' + queryString;
    };
    SearchManager.prototype.reloadSearch = function () {
        delete this.query;
        this.performSearch();
    };
    SearchManager.prototype.search = function (replaceState) {
        if (replaceState === void 0) { replaceState = false; }
        this.performSearch(replaceState);
    };
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
    SearchManager.prototype.setResults = function (results) {
        this.compareResults(this.results, results);
        this.results = results;
        this.error = null;
        this.accessors.setResults(results);
        this.onResponseChange();
        this.results$$.next(this.getHits());
    };
    SearchManager.prototype.compareResults = function (previousResults, results) {
        var ids = lodash_1.map(lodash_1.get(results, ['hits', 'hits'], []), '_id').join(',');
        var previousIds = lodash_1.get(previousResults, ['hits', 'ids'], '');
        if (results.hits) {
            results.hits.ids = ids;
            results.hits.hasChanged = !(ids && ids === previousIds);
        }
    };
    SearchManager.prototype.getHits = function () {
        return lodash_1.get(this.results, ['hits', 'hits'], []);
    };
    SearchManager.prototype.getHitsCount = function () {
        return lodash_1.get(this.results, ['hits', 'total'], 0);
    };
    SearchManager.prototype.getTime = function () {
        return lodash_1.get(this.results, 'took', 0);
    };
    SearchManager.prototype.getSuggestions = function () {
        return lodash_1.get(this.results, ['suggest', 'suggestions'], {});
    };
    SearchManager.prototype.getQueryAccessor = function () {
        return this.accessors.queryAccessor;
    };
    SearchManager.prototype.getAccessorsByType = function (type) {
        return this.accessors.getAccessorsByType(type);
    };
    SearchManager.prototype.getAccessorByType = function (type) {
        return this.accessors.getAccessorByType(type);
    };
    SearchManager.prototype.hasHits = function () {
        return this.getHitsCount() > 0;
    };
    SearchManager.prototype.hasHitsChanged = function () {
        return lodash_1.get(this.results, ['hits', 'hasChanged'], true);
    };
    SearchManager.prototype.setError = function (error) {
        this.error = error;
        this.results = null;
        this.accessors.setResults(null);
        this.onResponseChange();
    };
    SearchManager.prototype.onResponseChange = function () {
        this.loading = false;
        this.searching$$.next(this.loading);
        this.initialLoading = false;
    };
    return SearchManager;
}());
exports.SearchManager = SearchManager;
//# sourceMappingURL=SearchManager.js.map