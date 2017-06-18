import { NgxElasticsearchComponent, NgxSearchManagerService } from '@ngx-elasticsearch/core';
export declare class SearchBoxComponent extends NgxElasticsearchComponent {
    /**
     * Updates search results as you type. Will be false by default.
     * use with prefixQueryFields to get a better search as you type behaviour.
     * @type {boolean}
     */
    searchOnChange: boolean;
    /**
     * Default is 200ms. Is used when searchOnChange prop is true.
     * A search to elasticsearch will only be invoked once every searchThrottleTime ms.
     * @type {number}
     */
    searchOnThrottleTime: number;
    /**
     * An array of elasticsearch fields to search within.
     * Can specify boosting on particular fields. Will search _all by default.
     */
    queryFields: string[];
    /**
     * Used to create the query going to elastic. defaults to SimpleQueryString.
     * Supports QueryString or custom Function (query:string, options:Object) => {}
     * @type {number}
     */
    queryBuilder: Function;
    /**
     * An object of options for Query String.
     */
    queryOptions: any;
    /**
     * Placeholder for the input box
     * @type {string}
     */
    placeholder: string;
    /**
     * An array of elasticsearch fields to search within. Can specify boosting on particular fields.
     * Will search _all by default. Will only be used if searchOnChange is true.
     * @type {string[]}
     */
    prefixQueryFields: string[];
    /**
     * An object of options for MultiMatchQuery
     */
    prefixQueryOptions: any;
    /**
     * When searchOnChange={false} Configure behavior of the SearchBox when
     * the user blur's out of the field. Defaults to search
     * @type {string}
     */
    blurAction: 'search' | 'restore';
    /**
     * autofocus to search input
     * @type {boolean}
     */
    autofocus: boolean;
    /**
     * Id for the query accessor
     * @type {string}
     */
    id: string;
    accessor: any;
    service: NgxSearchManagerService;
    constructor(service: NgxSearchManagerService);
    defineAccessor(): any;
    handleChange(value: string): void;
    handleSubmit(value: string): void;
    handleBlur(event: any): void;
    handleFocus(event: any): void;
    getValue(): void;
    searchQuery(query: string): void;
}
