import { Component, OnInit } from '@angular/core';
import { block } from '@ngx-elasticsearch/core';

const selector = 'layout';

@Component({
  selector: 'ngx-es-bottom-bar',
  template: `
      <div [attr.class]="className">
          <ng-content></ng-content>
      </div>
  `,
  styles: []
})
export class NgxSearchBottomBarComponent implements OnInit {
  public className: any = block(selector)('bottom-bar');

  constructor() { }

  ngOnInit() {
  }

}
