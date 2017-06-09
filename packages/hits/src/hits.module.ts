import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxElasticsearchModule } from '@ngx-elasticsearch/core';

import { NgxSearchBoxComponent } from './components/search-box/search-box.component';

export * from './components/search-box/search-box.component';

@NgModule({
  declarations: [
    NgxSearchBoxComponent
  ],
  imports: [
    FormsModule
  ],
  exports: [
    NgxSearchBoxComponent
  ]
})
export class NgxSearchBoxModule { }
