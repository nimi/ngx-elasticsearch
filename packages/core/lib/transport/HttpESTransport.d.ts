import { ESTransport } from "./ESTransport";
export interface ESTransportOptions {
    headers?: Object;
    basicAuth?: string;
    withCredentials?: boolean;
    searchUrlPath?: string;
    timeout?: number;
}
export declare class HttpESTransport implements ESTransport {
    host: string;
    static timeout: number;
    http: any;
    options: ESTransportOptions;
    constructor(host: string, options?: ESTransportOptions);
    search(query: Object): Promise<any>;
    getData(response: any): any;
    private static parseCredentials(options);
}
