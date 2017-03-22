import { Component, OnInit, Input, Output } from '@angular/core';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  QueryAccessor
} from '../../../../core/lib';

@Component({
  selector: 'ngx-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent extends NgxElasticsearchComponent {
  @Input() searchOnChange: boolean = true;
  @Input() searchOnThrottleTime: number = 200;
  @Input() queryFields: string[];
  @Input() queryBuilder: Function;
  @Input() queryOptions: any;
  @Input() autofocus: boolean;
  @Input() id: string = 'q';
  @Input() mod: string;
  @Input() placeholder: string = 'Search';
  @Input() prefixQueryFields: string[] = ['playername'];
  @Input() prefixQueryOptions: any;
  @Input() blurAction: 'search' | 'restore' = 'search';

  constructor(esx: NgxSearchManagerService) {
    super(esx);
    console.log(esx);
  }

  // ngOnInit() {
  //   super.ngOnInit();
  //   console.log(this);
  //   // acc.setQueryString('granlund');
  //   //
  //   // this.esx.searchManager.addAccessor(acc);
  //   // this.esx.searchManager.performSearch(true);
  //
  // }

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
        // if (!this.unmounted && this.state.input){
        //   this.setState({input: undefined})
        // }
      }
    })
  }

  handleChange(event: any) {}

  handleSubmit(event: any) {}

  handleBlur(event: any) {}

  handleFocus(event: any) {}

}
