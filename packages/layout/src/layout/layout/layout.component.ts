import { Component, OnInit, Input } from '@angular/core';
import { block } from '@ngx-elasticsearch/core';

const selector = 'layout';

export enum LayoutSize {
  Small,
  Medium,
  Large
}

@Component({
  selector: 'ngx-es-layout',
  template: `
    <div [attr.class]="className({mod: containerModifier})">
        <ng-content></ng-content>
    </div>
  `
})
export class NgxSearchLayoutComponent implements OnInit {
  @Input() size: LayoutSize = LayoutSize.Large;

  public containerModifier: string = 'l';
  public className: any = block(selector);

  constructor() {
    console.log(this);
  }

  ngOnInit() {
  }

}
