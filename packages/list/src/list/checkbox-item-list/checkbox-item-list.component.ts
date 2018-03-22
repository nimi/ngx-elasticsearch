import { Component, Input } from '@angular/core';
import { NgxItemListComponent, template } from '../item-list';

@Component({
  selector: 'ngx-es-checkbox-item-list',
  template,
})
export class NgxCheckboxItemListComponent extends NgxItemListComponent {

  @Input() showCount: boolean = true;

  public showCheckbox: boolean = true;

}
