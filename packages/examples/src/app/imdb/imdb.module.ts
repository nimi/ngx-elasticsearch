import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxHitsModule, NgxHitsListComponent, NgxHitsListItemComponent } from '@ngx-elasticsearch/hits';
import { NgxSearchBoxModule, NgxSearchBoxComponent } from '@ngx-elasticsearch/search-box';
import { NgxLayoutModule } from '@ngx-elasticsearch/layout';
import { NgxFilterModule } from '@ngx-elasticsearch/filter';
import { NgxSortingSelectorModule } from '@ngx-elasticsearch/sorting-selector';
import { NgxPaginationModule } from '@ngx-elasticsearch/pagination';
import { ImdbComponent } from './imdb.component';
import { HitsListItemComponent } from './hits-list-item/hits-list-item.component';


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
    NgxFilterModule,
    NgxSortingSelectorModule,
    NgxPaginationModule
  ],
  declarations: [ ImdbComponent, HitsListItemComponent ],
  exports: [ ImdbComponent ]
})
export class ImdbModule { }
