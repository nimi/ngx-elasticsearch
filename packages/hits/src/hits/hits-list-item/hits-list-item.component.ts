import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-es-hits-list-item',
  template: `
    <pre>{{ item | json }}</pre>
  `,
})
export class NgxHitsListItemComponent {
  @Input() item: any = {};
}
