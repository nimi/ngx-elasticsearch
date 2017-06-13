import { Component, OnInit } from '@angular/core';
import { block } from '@ngx-elasticsearch/core';

const selector = 'layout';

@Component({
  selector: 'ngx-es-side-bar',
  template: `
      <div [attr.class]="className">
          <ng-content></ng-content>
      </div>
  `,
  styles: []
})
export class NgxSearchSideBarComponent implements OnInit {
  public className: any = block(selector)('filters');

  constructor() { }

  ngOnInit() {
  }

}
