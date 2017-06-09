import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxElasticsearchModule } from '@ngx-elasticsearch/core';

import { NgxHitsListComponent } from './components/hits-list/hits-list.component';
import { NgxHitsListItemComponent } from './components/hits-list-item/hits-list-item.component';

export * from './components/hits-list/hits-list.component';
export * from './components/hits-list-item/hits-list-item.component';

@NgModule({
  declarations: [
    NgxHitsListComponent,
    NgxHitsListItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxHitsListComponent,
    NgxHitsListItemComponent
  ]
})
export class NgxHitsModule { }
