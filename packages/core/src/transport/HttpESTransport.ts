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
  public static timeout: number = 5000;

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

  public http: any = new HttpClient();
  public options: ESTransportOptions;

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
    this.http.configure((conf: any) => {
      conf
        .withBaseUrl(config.baseURL)
        .withDefaults({
          credentials: 'omit',
          mode: 'cors',
          headers: {
          }
        })
    });
  }

  search(query: Object): Promise<any> {
    return this.http
      .post(this.options.searchUrlPath, query, this.options)
      .then(this.getData);
  }

  getData(response: any){
    const json = response.json();
    return json;
  }
}
