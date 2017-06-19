import { Component, OnInit, Input } from '@angular/core';
import { block } from '@ngx-elasticsearch/core';

const selector = 'panel';

@Component({
  selector: 'ngx-es-panel',
  template: `
      <div [attr.class]="className">
        <div
          (click)="toggleCollaped()"
          [ngClass]="{
            'is-collapsable': collapsable,
            'is-collapsed': collapsed
          }"
          class="{{ className('header') }}">
          {{ title }}
        </div>
        <div
          [ngClass]="{
            'is-collapsed': collapsed
          }"
          class="{{ className('content') }}"
        >
          <ng-content></ng-content>
      </div>
  `,
  styles: []
})
export class NgxSearchPanelComponent implements OnInit {

  @Input() title: string;

  @Input() collapsable: boolean = false;

  @Input() collapsed: boolean = false;

  public className: any = block(selector);

  constructor() { }

  ngOnInit() {
  }

  public toggleCollapsed() {
    if (this.collapsable) {
      this.collapsed = !this.toggleCollapsed;
    }
  }

}
