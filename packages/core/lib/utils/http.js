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
require("isomorphic-fetch");
/**
 * Create a Blob containing JSON-serialized data.
 * Useful for easily creating JSON fetch request bodies.
 *
 * @param body The object to be serialized to JSON.
 * @returns A Blob containing the JSON serialized body.
 */
function json(body) {
    return new Blob([JSON.stringify((body !== undefined ? body : {}))], { type: 'application/json' });
}
exports.json = json;
/**
 * A class for configuring HttpClients.
 */
var HttpClientConfiguration = (function () {
    function HttpClientConfiguration() {
        /**
         * The base URL to be prepended to each Request's url before sending.
         */
        this.baseUrl = '';
        /**
         * Default values to apply to init objects when creating Requests. Note that
         * defaults cannot be applied when Request objects are manually created because
         * Request provides its own defaults and discards the original init object.
         * See also https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
         */
        this.defaults = {};
        /**
         * Interceptors to be added to the HttpClient.
         */
        this.interceptors = [];
    }
    /**
     * Sets the baseUrl.
     *
     * @param baseUrl The base URL.
     * @returns The chainable instance of this configuration object.
     * @chainable
     */
    HttpClientConfiguration.prototype.withBaseUrl = function (baseUrl) {
        this.baseUrl = baseUrl;
        return this;
    };
    /**
     * Sets the defaults.
     *
     * @param defaults The defaults.
     * @returns The chainable instance of this configuration object.
     * @chainable
     */
    HttpClientConfiguration.prototype.withDefaults = function (defaults) {
        this.defaults = defaults;
        return this;
    };
    /**
     * Adds an interceptor to be run on all requests or responses.
     *
     * @param interceptor An object with request, requestError,
     * response, or responseError methods. request and requestError act as
     * resolve and reject handlers for the Request before it is sent.
     * response and responseError act as resolve and reject handlers for
     * the Response after it has been received.
     * @returns The chainable instance of this configuration object.
     * @chainable
     */
    HttpClientConfiguration.prototype.withInterceptor = function (interceptor) {
        this.interceptors.push(interceptor);
        return this;
    };
    /**
     * Applies a configuration that addresses common application needs, including
     * configuring same-origin credentials, and using rejectErrorResponses.
     * @returns The chainable instance of this configuration object.
     * @chainable
     */
    HttpClientConfiguration.prototype.useStandardConfiguration = function () {
        var standardConfig = { credentials: 'same-origin' };
        Object.assign(this.defaults, standardConfig, this.defaults);
        return this.rejectErrorResponses();
    };
    /**
     * Causes Responses whose status codes fall outside the range 200-299 to reject.
     * The fetch API only rejects on network errors or other conditions that prevent
     * the request from completing, meaning consumers must inspect Response.ok in the
     * Promise continuation to determine if the server responded with a success code.
     * This method adds a response interceptor that causes Responses with error codes
     * to be rejected, which is common behavior in HTTP client libraries.
     * @returns The chainable instance of this configuration object.
     * @chainable
     */
    HttpClientConfiguration.prototype.rejectErrorResponses = function () {
        return this.withInterceptor({ response: rejectOnError });
    };
    return HttpClientConfiguration;
}());
exports.HttpClientConfiguration = HttpClientConfiguration;
function rejectOnError(response) {
    if (!response.ok) {
        throw response;
    }
    return response;
}
/**
 * An HTTP client based on the Fetch API.
 */
var HttpClient = (function () {
    /**
     * Creates an instance of HttpClient.
     */
    function HttpClient() {
        /**
         * The current number of active requests.
         * Requests being processed by interceptors are considered active.
         */
        this.activeRequestCount = 0;
        /**
         * Indicates whether or not the client is currently making one or more requests.
         */
        this.isRequesting = false;
        /**
         * Indicates whether or not the client has been configured.
         */
        this.isConfigured = false;
        /**
         * The base URL set by the config.
         */
        this.baseUrl = '';
        /**
         * The default request init to merge with values specified at request time.
         */
        this.defaults = null;
        /**
         * The interceptors to be run during requests.
         */
        this.interceptors = [];
        if (typeof fetch === 'undefined') {
            throw new Error('HttpClient requires a Fetch API implementation, but the current environment doesn\'t support it. You may need to load a polyfill such as https://github.com/github/fetch.');
        }
    }
    /**
     * Configure this client with default settings to be used by all requests.
     *
     * @param config A configuration object, or a function that takes a config
     * object and configures it.
     * @returns The chainable instance of this HttpClient.
     * @chainable
     */
    HttpClient.prototype.configure = function (config) {
        var normalizedConfig;
        if (typeof config === 'object') {
            normalizedConfig = { defaults: config };
        }
        else if (typeof config === 'function') {
            normalizedConfig = new HttpClientConfiguration();
            normalizedConfig.baseUrl = this.baseUrl;
            normalizedConfig.defaults = Object.assign({}, this.defaults);
            normalizedConfig.interceptors = this.interceptors;
            var c = config(normalizedConfig);
            if (HttpClientConfiguration.prototype.isPrototypeOf(c)) {
                normalizedConfig = c;
            }
        }
        else {
            throw new Error('invalid config');
        }
        var defaults = normalizedConfig.defaults;
        if (defaults && Headers.prototype.isPrototypeOf(defaults.headers)) {
            // Headers instances are not iterable in all browsers. Require a plain
            // object here to allow default headers to be merged into request headers.
            throw new Error('Default headers must be a plain object.');
        }
        this.baseUrl = normalizedConfig.baseUrl;
        this.defaults = defaults;
        this.interceptors = normalizedConfig.interceptors || [];
        this.isConfigured = true;
        return this;
    };
    /**
     * Starts the process of fetching a resource. Default configuration parameters
     * will be applied to the Request. The constructed Request will be passed to
     * registered request interceptors before being sent. The Response will be passed
     * to registered Response interceptors before it is returned.
     *
     * See also https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
     *
     * @param input The resource that you wish to fetch. Either a
     * Request object, or a string containing the URL of the resource.
     * @param init An options object containing settings to be applied to
     * the Request.
     * @returns A Promise for the Response from the fetch request.
     */
    HttpClient.prototype.fetch = function (input, init) {
        var _this = this;
        trackRequestStart.call(this);
        var request = Promise.resolve().then(function () { return buildRequest.call(_this, input, init, _this.defaults); });
        var promise = processRequest(request, this.interceptors)
            .then(function (result) {
            var response = null;
            if (Response.prototype.isPrototypeOf(result)) {
                response = result;
            }
            else if (Request.prototype.isPrototypeOf(result)) {
                request = Promise.resolve(result);
                response = fetch(result);
            }
            else {
                throw new Error("An invalid result was returned by the interceptor chain. Expected a Request or Response instance, but got [" + result + "]");
            }
            return request.then(function (_result) { return processResponse(response, _this.interceptors, _result); });
        });
        return trackRequestEndWith.call(this, promise);
    };
    HttpClient.prototype.get = function (url, options) {
        return this.fetch(url, __assign({}, options, { method: 'get' }));
    };
    HttpClient.prototype.post = function (url, body, options) {
        return this.fetch(url, __assign({}, options, { body: body, method: 'post' }));
    };
    HttpClient.prototype.put = function (url, body, options) {
        return this.fetch(url, __assign({}, options, { body: body, method: 'put' }));
    };
    HttpClient.prototype.delete = function (url, options) {
        return this.fetch(url, __assign({}, options, { method: 'delete' }));
    };
    HttpClient.prototype.options = function (url, options) {
        return this.fetch(url, __assign({}, options, { method: 'options' }));
    };
    HttpClient.prototype.head = function (url, options) {
        return this.fetch(url, __assign({}, options, { method: 'head' }));
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
var absoluteUrlRegexp = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
function trackRequestStart() {
    this.isRequesting = !!(++this.activeRequestCount);
}
function trackRequestEnd() {
    this.isRequesting = !!(--this.activeRequestCount);
}
function trackRequestEndWith(promise) {
    var handle = trackRequestEnd.bind(this);
    promise.then(handle, handle);
    return promise;
}
function parseHeaderValues(headers) {
    var parsedHeaders = {};
    for (var name_1 in headers || {}) {
        if (headers.hasOwnProperty(name_1)) {
            parsedHeaders[name_1] = (typeof headers[name_1] === 'function') ? headers[name_1]() : headers[name_1];
        }
    }
    return parsedHeaders;
}
function buildRequest(input, init) {
    var defaults = this.defaults || {};
    var request;
    var body;
    var requestContentType;
    var parsedDefaultHeaders = parseHeaderValues(defaults.headers);
    if (Request.prototype.isPrototypeOf(input)) {
        request = input;
        requestContentType = new Headers(request.headers).get('Content-Type');
    }
    else {
        init || (init = {});
        body = init.body;
        var bodyObj = body ? { body: body } : null;
        var requestInit = Object.assign({}, defaults, { headers: {} }, init, bodyObj);
        requestContentType = new Headers(requestInit.headers).get('Content-Type');
        request = new Request(getRequestUrl(this.baseUrl, input), requestInit);
    }
    if (!requestContentType && new Headers(parsedDefaultHeaders).has('content-type')) {
        request.headers.set('Content-Type', new Headers(parsedDefaultHeaders).get('content-type'));
    }
    setDefaultHeaders(request.headers, parsedDefaultHeaders);
    if (body && Blob.prototype.isPrototypeOf(body) && body.type) {
        // work around bug in IE & Edge where the Blob type is ignored in the request
        // https://connect.microsoft.com/IE/feedback/details/2136163
        request.headers.set('Content-Type', body.type);
    }
    return request;
}
function getRequestUrl(baseUrl, url) {
    if (absoluteUrlRegexp.test(url)) {
        return url;
    }
    return (baseUrl || '') + url;
}
function setDefaultHeaders(headers, defaultHeaders) {
    for (var name_2 in defaultHeaders || {}) {
        if (defaultHeaders.hasOwnProperty(name_2) && !headers.has(name_2)) {
            headers.set(name_2, defaultHeaders[name_2]);
        }
    }
}
function processRequest(request, interceptors) {
    return applyInterceptors(request, interceptors, 'request', 'requestError');
}
function processResponse(response, interceptors, request) {
    return applyInterceptors(response, interceptors, 'response', 'responseError', request);
}
function applyInterceptors(input, interceptors, successName, errorName) {
    var interceptorArgs = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        interceptorArgs[_i - 4] = arguments[_i];
    }
    return (interceptors || [])
        .reduce(function (chain, interceptor) {
        var successHandler = interceptor[successName];
        var errorHandler = interceptor[errorName];
        return chain.then(successHandler && (function (value) { return successHandler.call.apply(successHandler, [interceptor, value].concat(interceptorArgs)); }) || identity, errorHandler && (function (reason) { return errorHandler.call.apply(errorHandler, [interceptor, reason].concat(interceptorArgs)); }) || thrower);
    }, Promise.resolve(input));
}
function identity(x) {
    return x;
}
function thrower(x) {
    throw x;
}
//# sourceMappingURL=http.js.map