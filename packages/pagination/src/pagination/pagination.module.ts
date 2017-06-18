import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxListModule } from '@ngx-elasticsearch/list';
import { NgxPaginationComponent } from './pagination/pagination.component';
import { PaginationSelectComponent } from './pagination-select/pagination-select.component';


@NgModule({
  imports: [
    CommonModule,
    NgxListModule
  ],
  declarations: [NgxPaginationComponent, PaginationSelectComponent],
  exports: [NgxPaginationComponent]
})
export class NgxPaginationModule { }
