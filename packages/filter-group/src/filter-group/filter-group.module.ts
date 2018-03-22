import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFilterGroupComponent } from './filter-group';
import { NgxFilterGroupItemComponent } from './filter-group-item';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxFilterGroupComponent, NgxFilterGroupItemComponent],
  exports: [NgxFilterGroupComponent, NgxFilterGroupItemComponent]
})
export class FilterGroupModule { }
export { NgxFilterGroupComponent, NgxFilterGroupItemComponent };
