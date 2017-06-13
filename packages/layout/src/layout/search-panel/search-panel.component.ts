import { Component, OnInit } from '@angular/core';
import { block } from '@ngx-elasticsearch/core';

const selector = 'layout';

@Component({
  selector: 'ngx-es-panel',
  template: `
      <div [attr.class]="className">
          <ng-content></ng-content>
      </div>
  `,
  styles: []
})
export class NgxSearchPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
