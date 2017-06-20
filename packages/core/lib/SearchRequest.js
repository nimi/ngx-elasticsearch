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
        return this.transport.search(this.query)
            .then(this.setResults.bind(this))
            .catch(this.setError.bind(this));
    };
    SearchRequest.prototype.deactivate = function () {
        this.active = false;
    };
    SearchRequest.prototype.setResults = function (results) {
        console.log('RESULTS', results);
        if (this.active) {
            this.searchManager.setResults(results);
        }
    };
    SearchRequest.prototype.setError = function (error) {
        if (this.active) {
            this.searchManager.setError(error);
        }
    };
    return SearchRequest;
}());
exports.SearchRequest = SearchRequest;
//# sourceMappingURL=SearchRequest.js.map