import { Component, OnInit, Input, Output } from '@angular/core';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  QueryAccessor
} from '@ngx-elasticsearch/core';

@Component({
  selector: 'ngx-search-box',
  template: `
    <div class="esx-searchbox">
      <form (submit)="handleSubmit(search.value)">
        <label [for]="'searchbox'">Search</label>
        <input
          #search
          (focus)="handleFocus($event)"
          (blur)="handleBlur($event)"
          (input)="handleChange(search.value)"
          [attr.id]="'searchbox'"
          [attr.type]="'text'"
          [placeholder]="placeholder"
        />
        <button type="submit">Search Now!</button>
      </form>
    </div>
  `,
})
export class NgxSearchBoxComponent extends NgxElasticsearchComponent {
  /**
   * Updates search results as you type. Will be false by default.
   * use with prefixQueryFields to get a better search as you type behaviour.
   * @type {boolean}
   */
  @Input() searchOnChange: boolean = true;
  /**
   * Default is 200ms. Is used when searchOnChange prop is true.
   * A search to elasticsearch will only be invoked once every searchThrottleTime ms.
   * @type {number}
   */
  @Input() searchOnThrottleTime: number = 200;
  /**
   * An array of elasticsearch fields to search within.
   * Can specify boosting on particular fields. Will search _all by default.
   */
  @Input() queryFields: string[];
  /**
   * Used to create the query going to elastic. defaults to SimpleQueryString.
   * Supports QueryString or custom Function (query:string, options:Object) => {}
   * @type {number}
   */
  @Input() queryBuilder: Function;
  /**
   * An object of options for Query String.
   */
  @Input() queryOptions: any;
  /**
   * Placeholder for the input box
   * @type {string}
   */
  @Input() placeholder: string = '';
  /**
   * An array of elasticsearch fields to search within. Can specify boosting on particular fields.
   * Will search _all by default. Will only be used if searchOnChange is true.
   * @type {string[]}
   */
  @Input() prefixQueryFields: string[] = ['_all'];
  /**
   * An object of options for MultiMatchQuery
   */
  @Input() prefixQueryOptions: any;
  /**
   * When searchOnChange={false} Configure behavior of the SearchBox when
   * the user blur's out of the field. Defaults to search
   * @type {string}
   */
  @Input() blurAction: 'search' | 'restore' = 'search';
  /**
   * autofocus to search input
   * @type {boolean}
   */
  @Input() autofocus: boolean = false;
  /**
   * Id for the query accessor
   * @type {string}
   */
  @Input() id: string = 'q';

  accessor: any;
  service: NgxSearchManagerService;


  constructor(service: NgxSearchManagerService) {
    super(service);
    this.service = service;
  }

  defineAccessor() {
    const {
      id, prefixQueryFields, queryFields, queryBuilder,
      queryOptions, prefixQueryOptions
    } = this;
    return new QueryAccessor(id, {
      prefixQueryFields,
      prefixQueryOptions: Object.assign({}, prefixQueryOptions),
      queryFields:queryFields || ['_all'],
      queryOptions: Object.assign({}, queryOptions),
      queryBuilder,
      onQueryStateChange: () => {
        console.log('query state change');
        // if (!this.unmounted && this.state.input){
        //   this.setState({input: undefined})
        // }
      }
    })
  }

  handleChange(value: string) {
    if (this.searchOnChange && value.length > 3) {
      this.searchQuery(value);
    }
  }

  handleSubmit(value: string) {
    event.preventDefault();
    this.searchQuery(value);
  }

  handleBlur(event: any) {}

  handleFocus(event: any) {}

  getValue() {
  }

  searchQuery(query: string) {
    let shouldResetOtherState = false;
    this.accessor.setQueryString(query);
    this.service.searchManager.performSearch(true);
  }

}
