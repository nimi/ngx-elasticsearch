import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { block } from '@ngx-elasticsearch/core';

const selector = 'select';

@Component({
  selector: 'ngx-es-select',
  template: `
    <div [attr.class]="className">
      <select (change)="onChange($event)">
        <option
          *ngFor="let o of options"
          [disabled]="o.disabled"
          [attr.value]="o.value"
        >
          {{ o.label }}
        </option>
      </select>

    </div>
  `,
  styles: []
})
export class NgxSelectComponent implements OnInit {

  @Input() showCount: boolean = false;

  @Input() setItems: Function = x => x;

  @Input() selectedItems: any[] = [];
  
  @Input() items: any[] = [];

  @Input() countFormatter: Function = x => x;

  @Input() disabled: boolean = true;

  @Output() onItemSelect: EventEmitter<any> = new EventEmitter();

  public className: any = block(selector);

  public options: any[] = [];

  constructor() { }

  ngOnInit() {
    this.options = this.setOptions(this.items);
  }

  public onChange(e){
    const { setItems } = this;
    const key = e.target.value
    setItems([key])
  }

  public getSelectedValue(){
    const { selectedItems = [] } = this;
    if (selectedItems.length == 0) return null
    return selectedItems[0]
  }

  private setOptions(items: any[]) {
    return items.map(i => {
      const label = i.title || i.key || i.key;
      return {
        label: this.showCount && i.doc_count
          ? `${label} ${this.countFormatter(i.doc_count)}`
          : label,
        value: i.key,
        disabled: i.disabled
      }
    });
  }

}
