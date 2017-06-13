import { Component, OnInit } from '@angular/core';
import { block } from '@ngx-elasticsearch/core';

const selector = 'layout';

@Component({
  selector: 'ngx-es-layout-results',
  template: `
    <div [attr.class]="className">
        <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class NgxSearchLayoutResultsComponent implements OnInit {
  public className: any = block(selector)('results') + ' ' + block('results-list');

  constructor() { }

  ngOnInit() {
  }

}
