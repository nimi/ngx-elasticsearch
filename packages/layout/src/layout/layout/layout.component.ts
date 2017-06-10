import { Component, OnInit, Input } from '@angular/core';

export enum LayoutSize {
  Small,
  Medium,
  Large
}

@Component({
  selector: 'ngx-es-layout',
  template: `
    <div [attr.class]="'ngx-es-layout__'{{ sizeModifier }}">
        layout works!
    </div>
  `,
})
export class NgxSearchLayoutComponent implements OnInit {
  @Input() size: LayoutSize = LayoutSize.Large;

  public sizeModifier: string = 'l'

  constructor() { }

  ngOnInit() {
  }

}
