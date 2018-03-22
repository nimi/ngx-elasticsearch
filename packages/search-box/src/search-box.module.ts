import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxElasticsearchModule } from '@ngx-elasticsearch/core';

import { NgxSearchBoxComponent } from './search-box/search-box.component';

export * from './search-box/search-box.component';

@NgModule({
  declarations: [
    NgxSearchBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NgxSearchBoxComponent
  ]
})
export class NgxSearchBoxModule { }
