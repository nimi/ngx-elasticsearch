import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-hits-list-item',
  template: `
    <pre>{{ item | json }}</pre>
  `,
})
export class NgxHitsListItemComponent {
  @Input() item: any = {};
}
