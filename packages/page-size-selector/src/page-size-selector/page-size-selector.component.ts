import { Component, OnInit, Input, ViewChild, Output, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  PageSizeAccessor,
  SearchManager,
} from '@ngx-elasticsearch/core';

@Component({
  selector: 'ngx-es-page-size-selector',
  template: `
    <ng-content
      *ngTemplateOutlet="itemTemplate || defaultItem; context: { $implicit: options }">
    </ng-content>
    <ng-template #defaultItem let-options>
      <ngx-es-select
        (onItemSelect)="handleSelect($event)"
        [items]="options"
      >
      </ngx-es-select>
    </ng-template>
  `,
  styles: []
})
export class NgxPageSizeSelectorComponent extends NgxElasticsearchComponent implements OnInit {
  @ViewChild('defaultItem') defaultItem: TemplateRef<any>;

  @Input() itemTemplate: TemplateRef<any>;

  @Input() options: any[] = [];

  protected manager: SearchManager;
  protected accessor: PageSizeAccessor;

  private resultsSub: Subscription;

  constructor(private service: NgxSearchManagerService) {
    super(service);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.itemTemplate) {
      this.itemTemplate = this.defaultItem;
    }
    this.options = this.options.map(o => ({ key: o, label: o }));
    this.resultsSub = this.service.results$
      .subscribe(results => {
        const accessor = this.getPageSizeAccessor();
        if (accessor) {
          const size = accessor.getSize();
        }
      });
  }

  ngOnDestroy() {
    this.resultsSub.unsubscribe();
  }

  public handleSelect(key: string) {
    this.setSize(key)
  }

  private getPageSizeAccessor() {
    return this.service.manager.accessors.getAccessorByType(PageSizeAccessor);
  }

  private setSize(size: string) {
    let pageSizeAccessor = this.getPageSizeAccessor();

    if (size) {
      pageSizeAccessor.setSize(Number(size));
      this.service.search();
    }
  }

  private setItems(sizes: string[]) {
    this.setSize(sizes[0]);
  }

}
