import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  ResetSearchAccessor,
  SearchManager,
  block
} from '@ngx-elasticsearch/core';

const selector = 'reset-filters';

@Component({
  selector: 'ngx-es-reset-filter',
  template: `
    <div>
      <div
        (click)="handleReset()"
        *ngIf="hasFilters"
        class="{{ className }}"
      >
        <div class="{{ className('reset') }}">{{ clearAllLabel }}</div>
      </div>
    </div>
  `,
  styles: []
})
export class NgxResetFilterComponent extends NgxElasticsearchComponent implements OnInit {
  
  @Input() translations: any = {
    clearAllLabel: () => `Clear all filters`
  };

  @Input() query: boolean = false;

  @Input() filter: boolean = true;

  @Input() pagination: boolean = false;

  public hasResults: boolean = true;

  public className: any = block(selector);

  public hasFilters: boolean = false;

  public clearAllLabel: string;

  protected manager: SearchManager;
  protected accessor: ResetSearchAccessor;

  private resultsSub: Subscription;

  constructor(private service: NgxSearchManagerService) {
    super(service);
  }

  ngOnInit() {
    super.ngOnInit();
    this.clearAllLabel = this.translations.clearAllLabel();
    this.resultsSub = this.service.results$
      .subscribe(results => {
        this.hasFilters = this.canReset();
      });
  }

  ngOnDestroy() {
    this.resultsSub.unsubscribe();
  }

  defineAccessor() {
    const { query, filter, pagination } = this;
    return new ResetSearchAccessor({ query, filter, pagination });
  }

  public handleReset() {
    this.resetFilters();
  }

  private canReset() {
    return this.accessor.canReset();
  }

  private resetFilters() {
    this.accessor.performReset();
    this.service.search();
  }

}
