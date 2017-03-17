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
/**
 * Fetch
 */
export declare class Http {
    options: RequestOptions;
    constructor(options?: any);
}
