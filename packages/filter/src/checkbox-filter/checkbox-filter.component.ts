import { Component, OnInit } from '@angular/core';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  NesteFacetAccessor,
  block
} from '@ngx-elasticsearch/core';

@Component({
  selector: 'ngx-checkbox-filter',
  template: `
    <p>
      checkbox-filter Works!
    </p>
  `,
  styles: []
})
export class CheckboxFilterComponent extends NgxElasticsearchComponent implements OnInit {

  ngOnInit() {
  }

}
