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

  private static parseCredentials({ basicAuth, withCredentials }: ESTransportOptions): any {
    let credentials: any = {};
    if (basicAuth !== undefined) {
      const parsed = basicAuth.split(':');
      const auth = { username: parsed[0], password: parsed[1] };
      Object.assign(credentials, { auth });
    }
    if (withCredentials !== undefined) {
      Object.assign(credentials, { withCredentials })
    }
    return credentials;
  }

  public http: HttpClient = new HttpClient();

  constructor(public host: string, public options: ESTransportOptions = {}){
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
    this.http.configure((conf: any) =>
      conf
        .withBaseUrl(config.baseURL)
        .withDefaults({
          credentials: 'omit',
          mode: 'cors',
          headers: {
          }
        }));
  }

  search(query: Object): Promise<any> {
    return this.http
      .post(this.options.searchUrlPath, query, this.options)
      .then(this.getData);
  }

  getData(response: any){
    return response.json();
  }
}
