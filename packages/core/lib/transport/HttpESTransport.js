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
        this.options = options;
        this.http = new http_1.HttpClient();
        this.options = __assign({ headers: {}, searchUrlPath: '/_search', timeout: HttpESTransport.timeout }, options);
        var credentials = HttpESTransport.parseCredentials(this.options);
        var config = __assign({ baseURL: this.host, timeout: this.options.timeout, headers: this.options.headers }, credentials);
        this.http.configure(function (conf) {
            return conf
                .withBaseUrl(config.baseURL)
                .withDefaults({
                credentials: 'omit',
                mode: 'cors',
                headers: {}
            });
        });
    }
    HttpESTransport.parseCredentials = function (_a) {
        var basicAuth = _a.basicAuth, withCredentials = _a.withCredentials;
        var credentials = {};
        if (basicAuth !== undefined) {
            var parsed = basicAuth.split(':');
            var auth = { username: parsed[0], password: parsed[1] };
            Object.assign(credentials, { auth: auth });
        }
        if (withCredentials !== undefined) {
            Object.assign(credentials, { withCredentials: withCredentials });
        }
        return credentials;
    };
    HttpESTransport.prototype.search = function (query) {
        return this.http
            .post(this.options.searchUrlPath, query, this.options)
            .then(this.getData);
    };
    HttpESTransport.prototype.getData = function (response) {
        return response.json();
    };
    return HttpESTransport;
}());
HttpESTransport.timeout = 5000;
exports.HttpESTransport = HttpESTransport;
//# sourceMappingURL=HttpESTransport.js.map