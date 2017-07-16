import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  QueryAccessor,
  block
} from '@ngx-elasticsearch/core';

const selector = 'search-box';

@Component({
  selector: 'ngx-es-search-box',
  template: `
    <div [attr.class]="className">
      <form (submit)="handleSubmit(search.value)">
        <div [attr.class]="className('icon')"></div>
        <label [attr.for]="'searchbox'"></label>
        <input
          #search
          [attr.class]="className('text')"
          (focus)="handleFocus($event)"
          (blur)="handleBlur($event)"
          (input)="handleChange(search.value)"
          [attr.id]="'searchbox'"
          [attr.type]="'text'"
          [attr.placeholder]="placeholder"
        />
        <input
          [attr.class]="className('action')"
          type="submit"
        />
        <div 
          class="{{ className('loader') + ' ' + spinnerClassName }}"
          [ngClass]="{ 'is-hidden': true }"
        ></div>
      </form>
    </div>
  `,
})
export class NgxSearchBoxComponent extends NgxElasticsearchComponent {
  @ViewChild('search') searchInput: ElementRef;
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
  @Input() queryFields: string[] = ['_all'];
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
  @Input() placeholder: string = 'Search';
  /**
   * An array of elasticsearch fields to search within. Can specify boosting on particular fields.
   * Will search _all by default. Will only be used if searchOnChange is true.
   * @type {string[]}
   */
  @Input() prefixQueryFields: string[];
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
  /**
   * Minimum character length for search action
   * @type {number}
   */
  @Input() minLength: number = 0;

  /**
   * Default search string on empty input
   * @type {number}
   */
  @Input() defaultOnEmpty: string;

  /**
   * Output for searching state
   */
  @Output() onSearching: EventEmitter<boolean> = new EventEmitter<boolean>();

  public className: any = block(selector);
  public spinnerClassName: any = block('spinning-loader');

  public accessor: any;

  private service: NgxSearchManagerService;
  private onSearchingSub: Subscription;

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    const inputEl = this.searchInput.nativeElement;
    this.onSearchingSub =  this.service.searching$
      .subscribe((isSearching) => {
        this.onSearching.emit(isSearching);
        if (isSearching) {
          this.setInputValue();
        }
      });
  }

  ngOnDestroy() {
    this.onSearchingSub.unsubscribe();
  }

  defineAccessor() {
    const {
      id, prefixQueryFields, queryFields, queryBuilder,
      queryOptions, prefixQueryOptions
    } = this;
    return new QueryAccessor(id, {
      prefixQueryFields,
      prefixQueryOptions: Object.assign({}, prefixQueryOptions),
      queryFields: queryFields,
      queryOptions: Object.assign({}, queryOptions),
      queryBuilder
    })
  }

  handleChange(value: string) {
    if (this.searchOnChange) {
      if (value.length > this.minLength) {
        this.searchQuery(value);
      }
      else if (this.defaultOnEmpty) {
        this.searchQuery(this.defaultOnEmpty);
      }
      else {
        this.searchQuery(null);
      }
    }
  }

  handleSubmit(value: string) {
    event.preventDefault();
    this.searchQuery(value);
  }

  handleBlur(event: any) {}

  handleFocus(event: any) {}

  /**
   * @desc This method sets input element value to
   * this current state of the query accessor. This occurs in cases when
   * the query is being reset outside of the component
   */
  private setInputValue() {
    const inputEl = this.searchInput.nativeElement;
    const inputValue = inputEl.value;
    const queryStringState = this.getQueryStringState();
    if (inputValue && inputValue !== queryStringState) {
      inputEl.value = queryStringState;
    }
  }

  private getQueryStringState() {
    return this.getAccessorValue();
  }

  private getAccessorValue(){
    return this.accessor.state.getValue();
  }

  private searchQuery(query: string) {
    this.accessor.setQueryString(query);
    this.service.search(true);
  }

}
