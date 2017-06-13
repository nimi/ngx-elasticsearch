import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxElasticsearchModule } from '@ngx-elasticsearch/core';
import { NgxHitsModule, NgxHitsListComponent, NgxHitsListItemComponent } from '@ngx-elasticsearch/hits';
import { NgxSearchBoxModule, NgxSearchBoxComponent } from '@ngx-elasticsearch/search-box';
import { NgxLayoutModule } from '@ngx-elasticsearch/layout';
import { NgxFilterModule } from '@ngx-elasticsearch/filter';
import { ImdbComponent } from './imdb.component';
import { HitsListItemComponent } from './hits-list-item/hits-list-item.component';

const url = "/api/movies";
const options = {
  useHistory: false,
  headers: {
    'Content-Type': 'application/json'
  }
};
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
    NgxFilterModule
  ],
  declarations: [ ImdbComponent, HitsListItemComponent ],
  exports: [ ImdbComponent ]
})
export class ImdbModule { }
