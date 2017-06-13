import { Component, OnInit } from '@angular/core';
import { block } from '@ngx-elasticsearch/core';

const selector = 'layout';

@Component({
  selector: 'ngx-es-layout-body',
  template: `
    <div [attr.class]="className">
        <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class NgxSearchLayoutBodyComponent implements OnInit {
  public className: any = block(selector)('body');

  constructor() { }

  ngOnInit() {
  }

}
