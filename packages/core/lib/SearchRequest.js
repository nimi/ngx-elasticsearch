"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name SearchRequest
 * @description
 *
 * State wrapper tree structures, trees are mutated
 * with a set of immutability helpers.
 */
var SearchRequest = (function () {
    function SearchRequest(transport, query, searchManager) {
        this.transport = transport;
        this.query = query;
        this.searchManager = searchManager;
        this.active = true;
    }
    /**
     * @name run
     * @description
     * Run the search request and handle response
     */
    SearchRequest.prototype.run = function () {
        return this.transport.search(this.query)
            .then(this.setResults.bind(this))
            .catch(this.setError.bind(this));
    };
    /**
     * @name deactivate
     * @description
     * deactivate setting results and error in manager state
     */
    SearchRequest.prototype.deactivate = function () {
        this.active = false;
    };
    /**
     * @name setResults
     * @description Set results in search manager
     */
    SearchRequest.prototype.setResults = function (results) {
        console.log('RESULTS', results);
        if (this.active) {
            this.searchManager.setResults(results);
        }
    };
    /**
     * @name setError
     * @description Set error state in manager
     */
    SearchRequest.prototype.setError = function (error) {
        if (this.active) {
            this.searchManager.setError(error);
        }
    };
    return SearchRequest;
}());
exports.SearchRequest = SearchRequest;
//# sourceMappingURL=SearchRequest.js.map