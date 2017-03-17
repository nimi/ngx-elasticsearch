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
var Request = (function () {
    function Request(method, url, opts) {
        if (opts === void 0) { opts = {}; }
        method = method.toUpperCase();
        this.options = __assign({ mode: 'cors', cache: 'no-cache', credentials: 'include', headers: {}, query: {}, prefix: '', method: method }, opts);
        this.url = this.options.prefix + url;
        // fetch will normalize the headers
        var headers = this.options.headers;
        Object.keys(headers).forEach(function (h) {
            if (h !== h.toLowerCase()) {
                headers[h.toLowerCase()] = headers[h];
                delete headers[h];
            }
        });
    }
    /**
     * Set Options
     *
     * Examples:
     *
     *   .config('credentials', 'omit')
     *   .config({ credentials: 'omit' })
     *
     * @param {String|Object} key
     * @param {Any} value
     * @return {Request}
     */
    Request.prototype.config = function (key, value) {
        var options = this.options;
        if (typeof key === 'object') {
            Object.keys(key).forEach(function (k) { return options[k] = key[k]; });
        }
        else {
            options[key] = value;
        }
        return this;
    };
    /**
     * Set header
     *
     * Examples:
     *
     *   .set('Accept', 'application/json')
     *   .set({ Accept: 'application/json' })
     *
     * @param {String|Object} key
     * @param {String} value
     * @return {Request}
     */
    Request.prototype.set = function (key, value) {
        var headers = this.options.headers;
        if (typeof key === 'object') {
            Object.keys(key).forEach(function (k) { return headers[k] = key[k]; });
        }
        else {
            headers[key.toLowerCase()] = value;
        }
        return this;
    };
    /**
     * Set Content-Type
     *
     * @param {String} type
     */
    Request.prototype.type = function (type) {
        switch (type) {
            case 'json':
                type = 'application/json';
                break;
            case 'form':
            case 'urlencoded':
                type = 'application/x-www-form-urlencoded';
                break;
        }
        this.options.headers['content-type'] = type;
        return this;
    };
    /**
     * Add query string
     *
     * @param {Object} object
     * @return {Request}
     */
    Request.prototype.query = function (object) {
        var query = this.options.query;
        for (var i in object) {
            query[i] = object[i];
        }
        return this;
    };
    /**
     * Send data
     *
     * Examples:
     *
     *   .send('name=hello')
     *   .send({ name: 'hello' })
     *
     * @param {String|Object} data
     * @return {Request}
     */
    Request.prototype.send = function (data) {
        var type = this.options.headers['content-type'];
        if (isObject(data) && isObject(this._body)) {
            // merge body
            for (var key in data) {
                this._body[key] = data[key];
            }
        }
        else if (typeof data === 'string') {
            if (!type) {
                this.options.headers['content-type'] = type = 'application/x-www-form-urlencoded';
            }
            if (type.indexOf('x-www-form-urlencoded') !== -1) {
                this._body = this._body ? this._body + '&' + data : data;
            }
            else {
                this._body = (this._body || '') + data;
            }
        }
        else {
            this._body = data;
        }
        // default to json
        if (!type) {
            this.options.headers['content-type'] = 'application/json';
        }
        return this;
    };
    /**
     * Append formData
     *
     * Examples:
     *
     *   .append(name, 'hello')
     *
     * @param {String} key
     * @param {String} value
     * @return {Request}
     */
    Request.prototype.append = function (key, value) {
        if (!(this._body instanceof FormData)) {
            this._body = new FormData();
        }
        this._body.append(key, value);
        return this;
    };
    Request.prototype.promise = function () {
        var options = this.options;
        var url = this.url;
        var beforeRequest = options.beforeRequest, afterResponse = options.afterResponse;
        try {
            if (['GET', 'HEAD', 'OPTIONS'].indexOf(options.method.toUpperCase()) === -1) {
                if (this._body instanceof FormData) {
                    options.body = this._body;
                }
                else if (isObject(this._body) && isJsonType(options.headers['content-type'])) {
                    options.body = JSON.stringify(this._body);
                }
                else if (isObject(this._body)) {
                    options.body = stringify(this._body);
                }
                else {
                    options.body = this._body;
                }
            }
            if (isObject(options.query)) {
                if (url.indexOf('?') >= 0) {
                    url += '&' + stringify(options.query);
                }
                else {
                    url += '?' + stringify(options.query);
                }
            }
            if (beforeRequest) {
                var canceled = beforeRequest(url, options.body);
                if (canceled === false) {
                    return Promise.reject(new Error('request canceled by beforeRequest'));
                }
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
        if (afterResponse) {
            return fetch(url, options)
                .then(function (res) {
                afterResponse(res);
                return res;
            });
        }
        return fetch(url, options);
    };
    Request.prototype.json = function (strict) {
        if (strict === void 0) { strict = true; }
        return this.promise()
            .then(function (res) { return res.json(); })
            .then(function (json) {
            if (strict && !isObject(json)) {
                throw new TypeError('response is not strict json');
            }
            return json;
        });
    };
    Request.prototype.text = function () {
        return this.promise().then(function (res) { return res.text(); });
    };
    return Request;
}());
/**
 * Private utils
 */
function isObject(obj) {
    return obj && typeof obj === 'object';
}
function isJsonType(contentType) {
    if (contentType === void 0) { contentType = ''; }
    return contentType && contentType.indexOf('application/json') === 0;
}
function stringify(obj) {
    if (obj === void 0) { obj = {}; }
    return Object.keys(obj).map(function (key) {
        return key + '=' + obj[key];
    }).join('&');
}
/**
 * Fetch
 */
var Http = (function () {
    function Http(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
    }
    return Http;
}());
exports.Http = Http;
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
methods.forEach(function (method) {
    method = method.toLowerCase();
    Http.prototype[method] = function (url) {
        var opts = Object.assign({}, this.options);
        return new Request(method, url, opts);
    };
});
//# sourceMappingURL=http.js.map