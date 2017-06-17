import { Component, Input } from '@angular/core';
import { block } from '@ngx-elasticsearch/core';

import { NgxItemListComponent, template } from '../item-list';

const selector = 'toggle';

@Component({
  selector: 'ngx-es-toggle',
  template,
})
export class NgxToggleComponent extends NgxItemListComponent {

  @Input() showCount: boolean = false;

  public className: any = block(selector);

  public itemClassName: any = block(`${selector}-option`);

}
