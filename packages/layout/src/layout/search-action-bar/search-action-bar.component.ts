import { Component, OnInit } from '@angular/core';
import { block } from '@ngx-elasticsearch/core';

const selector = 'results-list';

@Component({
  selector: 'ngx-es-action-bar',
  template: `
      <div [attr.class]="className">
          <ng-content></ng-content>
      </div>
  `,
  styles: []
})
export class NgxSearchActionBarComponent implements OnInit {
  public className: any = block(selector)('action-bar') + ' ' + block('action-bar');

  constructor() { }

  ngOnInit() {
  }

}
