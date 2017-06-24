import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  QueryAccessor,
  block
} from '@ngx-elasticsearch/core';

const selector = 'input-filter';

@Component({
  selector: 'ngx-es-input-filter',
  template: `
    <ngx-es-panel
      [title]="title"
      [disabled]="disabled"
    >
      <div [attr.class]="className">
        <form (submit)="handleSubmit(search.value)">
          <div [attr.class]="className('icon')"></div>
          <label [attr.for]="'searchbox'"></label>
          <input
            #search
            [attr.class]="className('text')"
            (focus)="handleFocus(search)"
            (blur)="handleBlur(search)"
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
            class="{{ className('remove') }}"
            [ngClass]="{ 'is-hidden': search.value === '' }"
          ></div>
        </form>
      </div>
    </ngx-es-panel>
  `,
})
export class NgxInputFilterComponent extends NgxElasticsearchComponent {

  @ViewChild('search') searchInput: ElementRef;

  /**
   * Title of the menu
   * @type {string}
   */
  @Input() title: string;

  /**
   * Component id
   * @type {string}
   */
  @Input() id: string;

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

  public autofocus: boolean = false;
  public disabled: boolean = false;
  public focused: boolean = false;

  public className: any = block(selector);

  public accessor: any;

  private service: NgxSearchManagerService;
  private onSearchingSub: Subscription;

  constructor(service: NgxSearchManagerService) {
    super(service);
    this.service = service;
  }

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
          this.disabled = this.accessor.getHitsCount === 0 && !!this.getAccessorValue()
        }
      });
  }

  ngOnDestroy() {
    this.onSearchingSub.unsubscribe();
  }

  defineAccessor() {
    const {
      id, prefixQueryFields, queryFields, queryBuilder,
      title, queryOptions, prefixQueryOptions
    } = this;
    return new QueryAccessor(id, {
      title,
      addToFilters: true,
      prefixQueryFields,
      prefixQueryOptions: { ...prefixQueryOptions },
      queryFields: queryFields,
      queryOptions: { ...queryOptions },
      queryBuilder
    })
  }

  handleChange(value: string) {
    console.log('handle change', value, this.searchOnChange);
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
    else {
      // handle search on restore
    }
  }

  handleSubmit(value: string) {
    event.preventDefault();
    this.searchQuery(value || this.getAccessorValue());
  }

  handleBlur(searchRef: HTMLInputElement) {
    const accVal = this.getAccessorValue();
    const { value } = searchRef;
    if (this.blurAction === 'search' && value != null && value !== accVal) {
      this.searchQuery(value);
    }
    this.focused = false;
    searchRef.value = '';
  }

  handleFocus(searchRef: HTMLInputElement) {
    this.focused = true;
  }

  /**
   * @name setInputValue
   * @description 
   * This method sets input element value to
   * this current state of the query accessor. This occurs in cases when
   * the query is being reset outside of the component
   * @private
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
    this.accessor.setQueryString(query, false); // should not reset state
    this.service.search(true);
  }

}
