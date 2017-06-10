import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxElasticsearchModule } from '@ngx-elasticsearch/core';
import { NgxHitsModule, NgxHitsListComponent, NgxHitsListItemComponent } from '@ngx-elasticsearch/hits';
import { NgxSearchBoxModule, NgxSearchBoxComponent } from '@ngx-elasticsearch/search-box';
import { NgxLayoutModule } from '@ngx-elasticsearch/layout';
import { ImdbComponent } from './imdb.component';

const url = "http://localhost:9200/";
const options = {
  useHistory: false,
  headers: {
    'Content-Type': 'application/json'
  }
};

export let esModule = NgxElasticsearchModule.forRoot({ url, options });
export const components = [
  NgxSearchBoxComponent,
  NgxHitsListComponent,
];

@NgModule({
  imports: [
    CommonModule,
    NgxSearchBoxModule,
    NgxHitsModule,
    NgxLayoutModule,
    esModule
  ],
  declarations: [ ImdbComponent ],
  exports: [ ImdbComponent ]
})
export class ImdbModule { }
