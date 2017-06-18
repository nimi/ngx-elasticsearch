import { Component, OnInit, Input, ViewChild, Output, TemplateRef, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  PaginationAccessor,
  SearchManager,
  block
} from '@ngx-elasticsearch/core';

import { get } from 'lodash';

import { Paginator } from '../paginator';

const selector = 'pagination-navigation';
export const template = `
  <ng-content
    *ngTemplateOutlet="itemTemplate || defaultItem; context: { $implicit: items }">
  </ng-content>
  <ng-template #defaultItem let-items>
    <div [attr.class]="className">
      <ngx-es-toggle
        (onItemSelect)="handlePageSelect($event)"
        [selectedItems]="selectedItems"
        [items]="items"
        [disabled]="disabled"
      >
      </ngx-es-toggle>
    </div>
  </ng-template>
`;

@Component({
  selector: 'ngx-es-pagination',
  template,
  styles: []
})
export class NgxPaginationComponent extends NgxElasticsearchComponent implements OnInit {
  @ViewChild('defaultItem') defaultItem: TemplateRef<any>;

  @Input() itemTemplate: TemplateRef<any>;

  @Input() pageScope: number = 3;

  @Input() showNumbers: boolean = false;

  @Input() showText: boolean = true;

  @Input() showLast: boolean = false;

  @Output() onPageSelect: EventEmitter<any> = new EventEmitter();

  public items: any[] = [];
  public translate: Function = x => x;
  public className: any = block(selector);
  public selectedItems: any[] = [];
  public disabled: boolean = false;

  protected manager: SearchManager;
  protected accessor: PaginationAccessor;

  private resultsSub: Subscription;

  constructor(private service: NgxSearchManagerService) {
    super(service);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.itemTemplate) {
      this.itemTemplate = this.defaultItem;
    }
    this.resultsSub = this.service.results$
      .subscribe(results => {
        if (results.length) {
          this.items = this.getPages();
          this.selectedItems = [this.getCurrentPage()];
          this.disabled = this.getTotalPages() <= 1; 
        }
      });
  }

  ngOnDestroy() {
    this.resultsSub.unsubscribe();
  }

  defineAccessor() {
    return new PaginationAccessor('p');
  }

  public getCurrentPage():number {
    return Number(this.accessor.state.getValue()) || 1;
  }

  public getTotalPages():number {
    return Math.ceil(
      get(this.getResults(), "hits.total", 1)
      /
      get(this.getQuery(), "query.size", 10)
    );
  }

  public isDisabled(pageNumber: number): boolean {
    return isNaN(pageNumber) || (pageNumber < 1) || (pageNumber > this.getTotalPages());
  }

  public normalizePage(page: (number | string)):number {
    if (page === 'previous') return this.getCurrentPage() - 1;
    else if (page === 'next') return this.getCurrentPage() + 1;
    else return +page
  }

  public setPage(page: (number|string)) {
    const pageNumber:number = this.normalizePage(page)
    if (this.isDisabled(pageNumber)) { return };
    if (pageNumber == this.getCurrentPage()) {
      return; // Same page, no need to rerun query
    }
    this.accessor.state = this.accessor.state.setValue(pageNumber);
    this.service.search();
  }

  public getPages() {
    const { showNumbers, pageScope, showText } = this;
    const currentPage = this.getCurrentPage();
    const totalPages = this.getTotalPages();

    const builder =  Paginator.build({
      showNumbers, showFirst: true,
      showPrevious: showText, showNext: showText, showEllipsis: showText
    });
    return builder(currentPage, totalPages, this.translate, pageScope)
  }

  public handlePageSelect(key) {
    this.setPage(key);
  }

  private getResults() {
    return super.getResults();
  }

  private getQuery() {
    return super.getQuery();
  }

}
