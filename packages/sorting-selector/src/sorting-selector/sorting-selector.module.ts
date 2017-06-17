import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxListModule } from '@ngx-elasticsearch/list';
import { NgxSortingSelectorComponent } from './sorting-selector.component';

@NgModule({
  imports: [
    CommonModule,
    NgxListModule
  ],
  declarations: [NgxSortingSelectorComponent],
  exports: [NgxSortingSelectorComponent]
})
export class NgxSortingSelectorModule { }
