import { Component, OnInit, Input } from '@angular/core';

import { block } from '@ngx-elasticsearch/core';

const selector = 'filter-group-items';

@Component({
  selector: 'ngx-es-filter-group-item',
  template: `
    <div [attr.class]="className">
      {{ value }}
    </div>
  `,
  styles: []
})
export class NgxFilterGroupItemComponent implements OnInit {
  @Input() value: any;

  public className: any = block(selector).mix('value');

  constructor() { }

  ngOnInit() {
  }

}
