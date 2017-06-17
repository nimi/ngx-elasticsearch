import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxItemListComponent } from './item-list/item-list.component';
import { TagCloudComponent } from './tag-cloud/tag-cloud.component';
import { SelectComponent } from './select/select.component';
import { NgxItemComponent } from './item/item.component';
import { ItemHistogramComponent } from './item-histogram/item-histogram.component';
import { NgxCheckboxItemListComponent } from './checkbox-item-list/checkbox-item-list.component';
import { ToggleComponent } from './toggle/toggle.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxItemListComponent, NgxItemComponent, NgxCheckboxItemListComponent,
    TagCloudComponent, SelectComponent, ItemHistogramComponent,
    ToggleComponent, TabsComponent
  ],
  exports: [NgxItemListComponent, NgxItemComponent, NgxCheckboxItemListComponent]
})
export class NgxListModule { }
