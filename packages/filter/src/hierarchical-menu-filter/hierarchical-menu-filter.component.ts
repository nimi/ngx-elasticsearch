import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
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
    <div 
      *ngIf="options && options.length"
      [attr.class]="className">
      <div [attr.class]="className('header')">{{ title }}</div>
      <div [attr.class]="className('root')">
        <div [attr.class]="className('hierarchical-options')">
          <div *ngFor="let option of options">
            <div
              (click)="addFilter($event, option)" 
              [attr.class]="option.className"
            >
              <div [attr.class]="option.className('text')">{{ option.key }}</div>
              <div [attr.class]="option.className('count')">{{ option.count }}</div>
            </div>
            <div *ngIf="option.selected">
              <div *ngFor="let c of option.children" >
                <div
                  (click)="addFilter($event, c, 1)" 
                  [attr.class]="c.className"
                >
                  <div [attr.class]="option.className('text')" [style.marginLeft.px]="10">{{ c.key }}</div>
                  <div [attr.class]="option.className('count')">{{ c.count }}</div>
                </div>
              </div>
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
  public secondaryOptions: any[] = [];

  protected manager: SearchManager;
  protected accessor: Accessor;

  private resultsSub: Subscription;

  ngOnInit() {
    super.ngOnInit();
    this.resultsSub = this.service.results$
      .subscribe(results => {
        this.options = this.getOptions();
      });
  }

  ngOnDestroy() {
    this.resultsSub.unsubscribe();
  }

  defineAccessor() {
    const {id, title, fields, size, orderKey, orderDirection} = this;
    return new HierarchicalFacetAccessor(id, {
      id, title, fields, size, orderKey, orderDirection
    });
  }

  addFilter(event: any, option: any, level: any = 0) {
    event.stopPropagation();
    this.accessor.state =
      this.accessor.state.toggleLevel(level, option.key);
    this.service.search();
  }

  getOptions(level: number = 0) {
    const options = [ ...(this.accessor.getBuckets(level) || []) ];
    return options.map(o => {
      const selected = this.accessor.resultsState.contains(level, o.key);

      return {
        key: o.key,
        count: o.doc_count,
        className: selected ? this.optionClassName.mix('is-selected') : this.optionClassName,
        selected,
        children: selected
          ? this.getOptions(level + 1)
          : []
      }
    });
  }

}
