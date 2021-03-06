import {
  Component, OnInit, Input, Output,
  TemplateRef, ViewChild, EventEmitter
} from '@angular/core';

import { block } from '@ngx-elasticsearch/core';
import { includes } from 'lodash';

const selector = 'item-list';

export const template = `
  <div [attr.class]="className">
    <span 
      *ngFor="let item of items"
      [attr.class]="itemClassName"
    >
      <ng-content *ngTemplateOutlet="defaultItem; context: { $implicit: item }"></ng-content>
    </span>
  </div>
  <ng-template #defaultItem let-item>
    <ngx-es-item
      (click)="handleItemSelect(item.key)"
      [label]="item.label || item.key"
      [count]="countFormatter(item.doc_count)"
      [rawCount]="item.doc_count"
      [listDocCount]="docCount"
      [disabled]="item.disabled"
      [active]="isActive(item)"
      [showCount]="showCount"
      [showCheckbox]="showCheckbox"
    ></ngx-es-item>
  </ng-template>
`;

@Component({
  selector: 'ngx-es-item-list',
  template,
  styles: []
})
export class NgxItemListComponent {
  @ViewChild('defaultItem') defaultItem;

  @Input() showCount: boolean = true;

  @Input() showCheckbox: boolean = false;

  @Input() multiSelect: boolean = true;

  @Input() setItems: Function = x => x;

  @Input() selectedItems: any[] = [];
  
  @Input() items: any[] = [];

  @Input() docCount: number;

  @Input() toggleItem: Function = x => x;

  @Input() countFormatter: Function = x => x;

  @Input() disabled: boolean = true;

  @Input() itemTemplate: TemplateRef<any> = this.defaultItem;

  @Output() onItemSelect: EventEmitter<any> = new EventEmitter();

  public toggleFunc: Function = this.multiSelect ? this.toggleItem : key => this.setItems([key]);

  public className: any = block(selector);

  public itemClassName: string;

  public selectedKey: string;

  constructor() { }

  isActive(option){
    const { selectedItems, multiSelect } = this;
    if (multiSelect){
      return includes(selectedItems, option.key)
    } else {
      if (selectedItems.length == 0) return null
      return selectedItems[0] == option.key
    }
  }

  public handleItemSelect(key: string) {
    this.onItemSelect.emit(key);
    this.selectedKey = key;
  }

}
