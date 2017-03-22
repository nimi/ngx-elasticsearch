"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../utils/http");
var HttpESTransport = (function () {
    function HttpESTransport(host, options) {
        if (options === void 0) { options = {}; }
        this.host = host;
        this.options = __assign({ headers: {}, searchUrlPath: '/_search', timeout: HttpESTransport.timeout }, options);
        var credentials = HttpESTransport.parseCredentials(this.options);
        var config = __assign({ baseURL: this.host, timeout: this.options.timeout, headers: this.options.headers }, credentials);
        this.http = new http_1.HttpClient();
        this.http.configure(function (c) {
            c
                .withBaseUrl(config.baseURL)
                .withDefaults({
                credentials: 'omit',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'Fetch'
                }
            });
        });
    }
    HttpESTransport.prototype.search = function (query) {
        console.log(query, this.http, this.options);
        return this.http
            .post(this.options.searchUrlPath, query, this.options)
            .then(this.getData);
    };
    HttpESTransport.prototype.getData = function (response) {
        var json = response.json();
        console.log('asdfsadfasdf', response, json);
        return json.data;
    };
    HttpESTransport.parseCredentials = function (options) {
        var credentials = {};
        if (options.basicAuth !== undefined) {
            var parsed = options.basicAuth.split(':');
            var auth = { username: parsed[0], password: parsed[1] };
            credentials['auth'] = auth;
        }
        if (options.withCredentials !== undefined) {
            credentials['withCredentials'] = options.withCredentials;
        }
        return credentials;
    };
    return HttpESTransport;
}());
HttpESTransport.timeout = 5000;
exports.HttpESTransport = HttpESTransport;
//# sourceMappingURL=HttpESTransport.js.map