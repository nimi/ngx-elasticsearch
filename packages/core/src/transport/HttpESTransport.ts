import { HttpClient } from '../utils/http';
import { ESTransport } from "./ESTransport"

export interface ESTransportOptions {
  headers?:Object,
  basicAuth?:string,
  withCredentials?:boolean,
  searchUrlPath?:string,
  timeout?: number
}

export class HttpESTransport implements ESTransport {
  static timeout: number = 5000;
  http: any;
  options: ESTransportOptions;

  constructor(public host: string, options: ESTransportOptions = {}){
    this.options = {
      headers: {},
      searchUrlPath: '/_search',
      timeout: HttpESTransport.timeout,
      ...options
    };

    const credentials = HttpESTransport.parseCredentials(this.options);
    const config = {
      baseURL: this.host,
      timeout: this.options.timeout,
      headers: this.options.headers,
      ...credentials
    };
    this.http = new HttpClient();
    this.http.configure((c: any) => {
      c
        .withBaseUrl(config.baseURL)
        .withDefaults({
          credentials: 'omit',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
    })
  }

  search(query: Object): Promise<any> {
    console.log(query, this.http, this.options);
    return this.http
      .post(this.options.searchUrlPath, query, this.options)
      .then(this.getData)
  }

  getData(response: any){
    const json = response.json();
    console.log('asdfsadfasdf', response, json);
    return json.data;
  }

  private static parseCredentials(options: ESTransportOptions): any {
    let credentials = {};
    if (options.basicAuth !== undefined) {
      const parsed = options.basicAuth.split(':');
      const auth = { username: parsed[0], password: parsed[1] };
      credentials['auth'] = auth;
    }
    if (options.withCredentials !== undefined) {
      credentials['withCredentials'] = options.withCredentials;
    }
    return credentials;
  }
}
