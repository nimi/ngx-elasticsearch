import {
  Component, OnInit, Input, Output,
  TemplateRef, ViewChild, EventEmitter
} from '@angular/core';

import { block } from '@ngx-elasticsearch/core';
import { minBy, maxBy, sortBy, includes } from 'lodash';

const selector = 'tag-cloud';

@Component({
  selector: 'ngx-es-tag-cloud',
  template: `
    <div [attr.class]="className">
      <div 
        *ngFor="let item of items"
      >
        <ng-content *ngTemplateOutlet="defaultItem; context: { $implicit: item }"></ng-content>
      </div>
    </div>
    <ng-template #defaultItem let-item>
      <ngx-es-item
        (click)="handleItemSelect(item.key)"
        [label]="item.label"
        [count]="item.count"
        [rawCount]="item.doc_count"
        [listDocCount]="docCount"
        [showCount]="showCount"
        [showCheckbox]="false"
        [className]="itemClassName"
      ></ngx-es-item>
    </ng-template>
  `,
  styles: []
})
export class NgxTagCloudComponent {

  static computeMinMax(items, field) {
    if (!items || items.length == 0) return { min: 0, max: 0 }
    return {
      min: minBy(items, field)[field],
      max: maxBy(items, field)[field]
    }
  }

  @ViewChild('defaultItem') defaultItem;

  @Input() showCount: boolean = false;

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

  @Input() minFontSize: number = 1;

  @Input() maxFontSize: number = 1.5;

  @Output() onItemSelect: EventEmitter<any> = new EventEmitter();

  public toggleFunc: Function = this.multiSelect ? this.toggleItem : key => this.setItems([key]);

  public className: any = block(selector);

  public itemClassName: string;

  private minCount: number = 0;
  
  private maxCount: number = 0;

  constructor() { }

  ngOnInit() {
    const sortedItems = sortBy(this.items, i => (i.title || i.label || i.key).toLowerCase());
    const { min, max } = NgxTagCloudComponent.computeMinMax(sortedItems, 'doc_count');
    this.minCount = min;
    this.maxCount = max;
    this.items = this.transformItems(sortedItems);
  }

  public isActive(option){
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
  }

  private transformItems(items: any[]) {
    const { minFontSize, maxFontSize, selectedItems, showCount, countFormatter } = this;
    const min = this.minCount;
    const max = this.maxCount;
    return items.map(item => {
      const sizeRatio = (min === max) ? 0.5 : ((item.doc_count - min) / (max - min));
      const fontSize = minFontSize + sizeRatio * (maxFontSize - minFontSize);
      return {
        label: item.title || item.key || item.label,
        key: item.key,
        disabled: item.disabled,
        active: includes(selectedItems, item.key),
        showCount,
        count: countFormatter(item.doc_count),
        doc_count: item.doc_count
      };
    });
  }

}

