import { Component, OnInit, Output, Input } from '@angular/core';

import { block } from '@ngx-elasticsearch/core';

const selector = 'item-list-option';

@Component({
  selector: 'ngx-es-item',
  template: `
    <div
      [ngClass]="{'is-active': active}"
      class="{{ className + ' ' +  listItemClassName }}"
    >
      <input
        *ngIf="showCheckbox"
        type="checkbox"
        [attr.class]="className('checkbox')"
        [checked]="active"
      />
      <div
        [attr.class]="className('text')"
      >
        {{ label }}
      </div>
      <div *ngIf="showCount" [attr.class]="className('count')">{{ count }}</div>
    </div>
  `,
  styles: []
})
export class NgxItemComponent {
  @Input() active: boolean = false;

  @Input() label: string;

  @Input() disabled: boolean = true;

  @Input() listDocCount: any;

  @Input() rawCount: number;

  @Input() count: any;

  @Input() hasCount: boolean = false;

  @Input() showCheckbox: boolean = false;

  @Input() showCount: boolean = false;

  public className: any = block(selector);

  public listItemClassName: any = block('item-list')('item');

}
