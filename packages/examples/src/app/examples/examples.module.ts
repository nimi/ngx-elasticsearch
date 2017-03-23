import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxElasticsearchModule } from '@ngx-elasticsearch/core';
import { NgxSearchBoxModule, NgxSearchBoxComponent } from '@ngx-elasticsearch/search-box';

const url = "http://localhost:9200/";
const options = { useHistory: false };

export let esModule = NgxElasticsearchModule.forRoot({ url, options });
export const components = [
  NgxSearchBoxComponent
];

@NgModule({
  imports: [
    CommonModule,
    NgxSearchBoxModule,
    esModule
  ],
  entryComponents: [ ...components ],
  exports: [ ...components ]
})
export class ExamplesModule { }
