import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxElasticsearchModule } from '@ngx-elasticsearch/core';

import { NgxHitsListComponent, NgxHitsListItemComponent, NgxNoHitsComponent } from './hits';

export * from './hits';

@NgModule({
  declarations: [
    NgxHitsListComponent,
    NgxHitsListItemComponent,
    NgxNoHitsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxHitsListComponent,
    NgxHitsListItemComponent,
    NgxNoHitsComponent
  ]
})
export class NgxHitsModule { }
