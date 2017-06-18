import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  RangeAccessor,
  SearchManager,
  Accessor,
  block
} from '@ngx-elasticsearch/core';

import { size } from 'lodash';

const selector = `selected-filters`;

@Component({
  selector: 'ngx-es-selected-filters',
  template: `
    <div [attr.class]="'ngx-es-selected-filters'">
      <div 
        *ngFor="let item of filterItems"
        [attr.class]="'ngx-es-selected-filters-option ngx-es-selected-filters__item'"
      >
        <ng-content *ngTemplateOutlet="itemTemplate || defaultItem; context: { $implicit: item }"></ng-content>
      </div>
    </div>
    <ng-template #defaultItem let-item>
      <div [attr.class]="'ngx-es-selected-filters-option__name'">
        <strong>{{ item.name }}</strong>: <span>{{ item.value }}</span>
      </div>
      <div
        (click)="removeFilter(item)"
        [attr.class]="'ngx-es-selected-filters-option__remove-action'"
      >x</div>
    </ng-template>
  `,
  styles: []
})
export class NgxSelectedFiltersComponent extends NgxElasticsearchComponent implements OnInit {
  @ViewChild('defaultItem') defaultItem: TemplateRef<any>;

  @Input() itemTemplate: TemplateRef<any>;

  @Output() onFilterChange: EventEmitter<any[]> = new EventEmitter();

  public filterItems: any[];

  private resultsSub: Subscription;

  constructor(private service: NgxSearchManagerService) {
    super(service);
  }

  ngOnInit() {
    super.ngOnInit();
    this.resultsSub = this.service.results$
      .subscribe(result => {
        const prevFilterItems = [ ...(this.filterItems || []) ];
        this.filterItems = this.getFilters() || [];
        this.emitFilterChanges(prevFilterItems, this.filterItems);
      });
  }

  ngOnDestroy() {
    this.resultsSub.unsubscribe();
  }

  getFilters():Array<any> {
		return this.getQuery().getSelectedFilters()
	}

	hasFilters():boolean {
		return size(this.getFilters()) > 0;
	}

  getQuery() {
    return super.getQuery();
  }

  removeFilter(filter) {
    filter.remove();
    this.service.search();
  }

  private emitFilterChanges(prevFilters, currFilters) {
    if (prevFilters.length !== currFilters.length) {
      this.onFilterChange.emit(currFilters);
      return;
    }

    const currFilterValues = currFilters.map(({value}) => value);
    prevFilters.forEach((pf, i) => {
      if (currFilterValues.indexOf(pf.value) === -1) {
        this.onFilterChange.emit(currFilters);
        return;
      }
    });
  }

}
