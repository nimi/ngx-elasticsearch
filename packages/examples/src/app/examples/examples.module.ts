import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxHitsModule, NgxHitsListComponent, NgxHitsListItemComponent } from '@ngx-elasticsearch/hits';
import { NgxSearchBoxModule, NgxSearchBoxComponent } from '@ngx-elasticsearch/search-box';

export const components = [
  NgxSearchBoxComponent,
  NgxHitsListComponent,
];

@NgModule({
  imports: [
    CommonModule,
    NgxSearchBoxModule,
    NgxHitsModule
  ],
  entryComponents: [ ...components ],
  exports: [ ...components ]
})
export class ExamplesModule { }
