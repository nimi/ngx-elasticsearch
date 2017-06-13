import { Component, OnInit, Input } from '@angular/core';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  HierarchicalFacetAccessor,
  SearchManager,
  Accessor,
  block
} from '@ngx-elasticsearch/core';

const selector = 'hierarchical-menu-list';

@Component({
  selector: 'ngx-es-hierarchical-menu-filter',
  template: `
    <div [attr.class]="className">
      <div [attr.class]="className('header')">{{ title }}</div>
      <div [attr.class]="className('root')">
        <div [attr.class]="className('hierarchical-options')">
          <div *ngFor="let option of options">
            <div
              (click)="addFilter(option)" 
              [attr.class]="option.className"
            >
              <div [attr.class]="option.className('text')">{{ option.key }}</div>
              <div [attr.class]="option.className('count')">{{ option.count }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class NgxHierarchicalMenuFilterComponent extends NgxElasticsearchComponent implements OnInit {
  @Input() id: string;

  @Input() fields: string[];

  @Input() title: string;

  @Input() orderKey: string;

  @Input() orderDirection: 'asc' | 'desc' = 'desc';

  @Input() countFormatter: Function = x => x;

  @Input() size: number = 20;

  public className: any = block(selector);
  public optionClassName: any = block('hierarchical-menu-option')
  public options: any[] = [];

  protected manager: SearchManager;
  protected accessor: Accessor;

  constructor(private service: NgxSearchManagerService) {
    super(service);
  }

  ngOnInit() {
    super.ngOnInit();
    this.service.results$
      .subscribe(result => {
        this.options = this.getOptions();
        console.log(this.getSecondaryOptions());
      });
  }

  defineAccessor() {
    const {id, title, fields, size, orderKey, orderDirection} = this;
    return new HierarchicalFacetAccessor(id, {
      id, title, fields, size, orderKey, orderDirection
    });
  }

  addFilter(option: any, level: any = 0) {
    const st = { ...this.accessor.state };
    // this.accessor.state =
      // this.accessor.state.toggleLevel(level, option.key);
    console.log('adding filter', option, level, option.key, st, this.accessor.state);
    this.service.manager.performSearch();
  }

  getOptions(level: number = 0) {
    const options = this.accessor.getBuckets(level);
    return options.map(o => {
      return {
        key: o.key,
        count: o.doc_count,
        className: this.optionClassName,
      }
    });
  }

  getSecondaryOptions() {
    console.log(this.accessor.resultsState);
    if (this.accessor.resultsState.contains(0, 'team')) {
      console.log(this.accessor.resultsState);
    }
    return;
  }

}
