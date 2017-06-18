import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxListModule } from '@ngx-elasticsearch/list';

import { NgxPageSizeSelectorComponent } from './page-size-selector.component';

@NgModule({
  imports: [
    CommonModule,
    NgxListModule
  ],
  declarations: [ NgxPageSizeSelectorComponent ],
  exports: [ NgxPageSizeSelectorComponent ]
})
export class NgxPageSizeSelectorModule { }
