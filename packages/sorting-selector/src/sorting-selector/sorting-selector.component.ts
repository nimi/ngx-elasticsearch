import { Component, OnInit, Input, ViewChild, Output, TemplateRef } from '@angular/core';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  SortingAccessor,
  SearchManager,
} from '@ngx-elasticsearch/core';

@Component({
  selector: 'ngx-es-sorting-selector',
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
export class NgxSortingSelectorComponent extends NgxElasticsearchComponent implements OnInit {
  @ViewChild('defaultItem') defaultItem: TemplateRef<any>;

  @Input() itemTemplate: TemplateRef<any>;

  @Input() options: any[] = [];

  protected manager: SearchManager;
  protected accessor: SortingAccessor;

  constructor(private service: NgxSearchManagerService) {
    super(service);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  defineAccessor() {
    return new SortingAccessor('sort', { options: this.options });
  }

  public toggleItem(key) {
    this.accessor.state = this.accessor.state.setValue(key);
    this.service.search();
  }

	public setItems(keys){
		this.toggleItem(keys[0]);
	}

  public handleSelect(key) {
    this.toggleItem(key);
  }

}
