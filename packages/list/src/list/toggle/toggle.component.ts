import { Component, Input, Output, EventEmitter } from '@angular/core';
import { block } from '@ngx-elasticsearch/core';

import { NgxItemListComponent, template } from '../item-list';

const selector = 'toggle';

@Component({
  selector: 'ngx-es-toggle',
  template,
})
export class NgxToggleComponent extends NgxItemListComponent {

  @Input() showCount: boolean = false;

  @Output() onItemSelect: EventEmitter<any> = new EventEmitter();

  public itemClassName: any;

  ngOnInit() {
    this.className = block(selector);
    this.itemClassName = block(`${selector}-option`);
  }

}
