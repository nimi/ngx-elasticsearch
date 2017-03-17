import 'isomorphic-fetch';

export interface RequestOptions {
  mode: string;
  cache: string;
  credentials: string;
  method: string;
  headers: any;
  prefix: string;
  body?: any;
  query?: any;
  beforeRequest?: Function;
  afterResponse?: Function;
}

class Request {
  options: RequestOptions;
  url: string;

  private _body: any;

  constructor(method: string, url: string, opts: any = {}) {
    method = method.toUpperCase();

    this.options = {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {},
      query: {},
      prefix: '',
      method,
      ...opts
    };

    this.url = this.options.prefix + url;

    // fetch will normalize the headers
    const headers = this.options.headers;

    Object.keys(headers).forEach((h) => {
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
  config(key: any | string, value: any) {
    const { options } = this;

    if (typeof key === 'object') {
      Object.keys(key).forEach((k) => options[k] = key[k]);
    } else {
      options[key] = value;
    }

    return this;
  }

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
  set(key: any | string, value: string) {
    const { headers } = this.options;

    if (typeof key === 'object') {
      Object.keys(key).forEach((k) => headers[k] = key[k]);
    } else {
      headers[key.toLowerCase()] = value
    }

    return this
  }

  /**
   * Set Content-Type
   *
   * @param {String} type
   */
  type(type: string) {
    switch (type) {
      case 'json':
        type = 'application/json';
        break
      case 'form':
      case 'urlencoded':
        type = 'application/x-www-form-urlencoded';
        break
    }

    this.options.headers['content-type'] = type;

    return this;
  }

  /**
   * Add query string
   *
   * @param {Object} object
   * @return {Request}
   */
  query(object: any) {
    const query = this.options.query;

    for (let i in object) {
      query[i] = object[i];
    }

    return this;
  }

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
  send(data: string | any) {
    let type = this.options.headers['content-type'];

    if (isObject(data) && isObject(this._body)) {
      // merge body
      for (let key in data) {
        this._body[key] = data[key];
      }
    } else if (typeof data === 'string') {
      if (!type) {
        this.options.headers['content-type'] = type = 'application/x-www-form-urlencoded';
      }

      if (type.indexOf('x-www-form-urlencoded') !== -1) {
        this._body = this._body ? this._body + '&' + data : data;
      } else {
        this._body = (this._body || '') + data;
      }
    } else {
      this._body = data;
    }

    // default to json
    if (!type) {
      this.options.headers['content-type'] = 'application/json';
    }

    return this;
  }

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
  append(key: string, value: string) {
    if (!(this._body instanceof FormData)) {
      this._body = new FormData();
    }

    this._body.append(key, value);

    return this;
  }

  promise(): Promise<any> {
    const { options } = this;
    let { url } = this;

    const {
      beforeRequest,
      afterResponse,
    } = options;

    try {
      if (['GET', 'HEAD', 'OPTIONS'].indexOf(options.method.toUpperCase()) === -1) {
        if (this._body instanceof FormData) {
          options.body = this._body;
        } else if (isObject(this._body) && isJsonType(options.headers['content-type'])) {
          options.body = JSON.stringify(this._body);
        } else if (isObject(this._body)) {
          options.body = stringify(this._body);
        } else {
          options.body = this._body;
        }
      }

      if (isObject(options.query)) {
        if (url.indexOf('?') >= 0) {
          url += '&' + stringify(options.query);
        } else {
          url += '?' + stringify(options.query);
        }
      }

      if (beforeRequest) {
        const canceled = beforeRequest(url, options.body);
        if (canceled === false) {
          return Promise.reject(new Error('request canceled by beforeRequest'));
        }
      }
    } catch (e) {
      return Promise.reject(e);
    }

    if (afterResponse) {
      return fetch(url, options)
        .then(res => {
          afterResponse(res);
          return res;
        })
    }

    return fetch(url, options)
  }

  json(strict: boolean = true) {
    return this.promise()
      .then(res => res.json())
      .then(json => {
        if (strict && !isObject(json)) {
          throw new TypeError('response is not strict json');
        }

        return json;
      })
  }

  text(): Promise<Body> {
    return this.promise().then(res => res.text());
  }
}

/**
 * Private utils
 */

function isObject(obj: any) {
  return obj && typeof obj === 'object';
}

function isJsonType(contentType: string = '') {
  return contentType && contentType.indexOf('application/json') === 0;
}

function stringify(obj: any = {}) {
  return Object.keys(obj).map(key => {
    return key + '=' + obj[key]
  }).join('&');
}

/**
 * Fetch
 */

export class Http {
  options: RequestOptions;

  constructor(options: any = {}) {
    this.options = options;
  }
}

const methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

methods.forEach((method: string) => {
  method = method.toLowerCase();
  Http.prototype[method] = function(url: string) {
    const opts = Object.assign({}, this.options);
    return new Request(method, url, opts);
  }
});