import { Component, OnInit } from '@angular/core';
import { block } from '@ngx-elasticsearch/core';

const selector = 'action-bar-row';

@Component({
  selector: 'ngx-es-action-bar-row',
  template: `
    <div [attr.class]="className">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class NgxSearchActionBarRowComponent implements OnInit {
  public className: any = block(selector);

  constructor() { }

  ngOnInit() {
  }

}
