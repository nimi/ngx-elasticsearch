import { Component, OnInit, Input } from '@angular/core';
import { block } from '@ngx-elasticsearch/core';

const selector = 'filter-group';

@Component({
  selector: 'ngx-es-filter-group',
  template: `
    <p [attr.class]="className">
      <div [attr.class]="itemsClassName">
        <div [attr.class]="itemsClassName.mix('title')"></div>
        <div 
          *ngFor="let filter of filters"
          [attr.class]="itemsClassName.mix('list')"
        >
          <ngx-es-filter-group-item
            [value]="filter.value"
          ></ngx-es-filter-group-item>
        </div>
      </div>
      <div [attr.class]="className('remove-action')">
    </p>
  `,
  styles: []
})
export class NgxFilterGroupComponent implements OnInit {
  @Input() title: string;

  @Input() filters: any[];
  
  @Input() removeFilter: Function = () => void 0;

  @Input() removeFilters: Function = () => void 0;

  public className: any = block(selector);
  public itemsClassName: any = block(`${selector}-items`);

  constructor() { }

  ngOnInit() {
  }

}
