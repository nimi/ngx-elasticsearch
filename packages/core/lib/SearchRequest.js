"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchRequest = (function () {
    function SearchRequest(transport, query, searchManager) {
        this.transport = transport;
        this.query = query;
        this.searchManager = searchManager;
        this.active = true;
    }
    SearchRequest.prototype.run = function () {
        console.log('runnnnn');
        return this.transport.search(this.query)
            .then(function (q) { console.log('SEARCH RESULTS', q); return q; })
            .then(this.setResults.bind(this))
            .catch(this.setError.bind(this));
    };
    SearchRequest.prototype.deactivate = function () {
        this.active = false;
    };
    SearchRequest.prototype.setResults = function (results) {
        console.log('RESULTOS', results);
        if (this.active) {
            this.searchManager.setResults(results);
        }
    };
    SearchRequest.prototype.setError = function (error) {
        console.log('ERRRRROOOOOORRRRR', error);
        if (this.active) {
            this.searchManager.setError(error);
        }
    };
    return SearchRequest;
}());
exports.SearchRequest = SearchRequest;
//# sourceMappingURL=SearchRequest.js.map