import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxItemListComponent } from './item-list/item-list.component';
import { NgxTagCloudComponent } from './tag-cloud/tag-cloud.component';
import { NgxSelectComponent } from './select/select.component';
import { NgxItemComponent } from './item/item.component';
import { NgxItemHistogramComponent } from './item-histogram/item-histogram.component';
import { NgxCheckboxItemListComponent } from './checkbox-item-list/checkbox-item-list.component';
import { NgxToggleComponent } from './toggle/toggle.component';
import { NgxTabsComponent } from './tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxItemListComponent, NgxItemComponent, NgxCheckboxItemListComponent,
    NgxTagCloudComponent, NgxSelectComponent, NgxItemHistogramComponent,
    NgxToggleComponent, NgxTabsComponent
  ],
  exports: [
    NgxItemListComponent, NgxItemComponent, NgxCheckboxItemListComponent,
    NgxTagCloudComponent, NgxSelectComponent, NgxItemHistogramComponent,
    NgxToggleComponent, NgxTabsComponent
  ]
})
export class NgxListModule { }
