import { Component, Input } from '@angular/core';
import { block } from '@ngx-elasticsearch/core';

import { NgxItemListComponent, template } from '../item-list';

const selector = 'tabs';

@Component({
  selector: 'ngx-es-tabs',
  template,
})
export class NgxTabsComponent extends NgxItemListComponent {

  @Input() showCount: boolean = false;

  public showCheckbox: boolean = false;

  public multiSelect: boolean = false;

  public className: any = block(selector);
  public itemClassName: any = block(`${selector}-option`);

}
