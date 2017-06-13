import { Component, OnInit } from '@angular/core';
import { block } from '@ngx-elasticsearch/core';

const selector = 'layout';

@Component({
  selector: 'ngx-es-top-bar',
  template: `
      <div [attr.class]="outerClassName">
          <div [attr.class]="innerClassName">
            <ng-content></ng-content>
          </div>
      </div>
  `,
  styles: []
})
export class NgxSearchTopBarComponent implements OnInit {
  public outerClassName: any = block(selector)('top-bar');
  public innerClassName: any = block('top-bar')('content');

  constructor() { }

  ngOnInit() {
  }

}
