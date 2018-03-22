import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  NumericOptionsAccessor,
  SearchManager,
  block
} from '@ngx-elasticsearch/core';

const selector = 'refinement-list';

@Component({
  selector: 'ngx-es-numeric-refinement-list-filter',
  template: `
    <ngx-es-panel
      [title]="title"
    >
      <ngx-es-checkbox-item-list
        (onItemSelect)="handleItemSelect($event)"
        [selectedItems]="selectedItems"
        [items]="items"
        [showCount]="showCount"
        [countFormatter]="countFormatter"
      >
      </ngx-es-checkbox-item-list>
    </ngx-es-panel>
  `,
  styles: []
})
export class NgxNumericRefinementListComponent extends NgxElasticsearchComponent implements OnInit {
  @Input() field: string;
  
  @Input() id: string;
    
  @Input() title: string;
          
  @Input() fieldOptions: any;

  @Input() options: any[] = [];

  @Input() bucketsTransform: Function = x => x;

  @Input() showCount: boolean = true;

  @Input() countFormatter: Function = x => x;

  @Output() onFacetSelect: EventEmitter<any> = new EventEmitter();

  public className: any = block(selector);
  public optionClassName: any = block(`${selector}-option`)
  public items: any[] = [];
  public multiSelect: boolean = true;
  public selectedItems: string[] = [];
  public docCount: any;

  protected manager: SearchManager;
  protected accessor: NumericOptionsAccessor;

  private resultsSub: Subscription;

  constructor(private service: NgxSearchManagerService) {
    super(service);
  }

  ngOnInit() {
    super.ngOnInit();
    this.resultsSub = this.service.results$
      .subscribe(result => {
        this.items = this.getItems();
        this.selectedItems = this.getSelectedItems();
        this.docCount = this.getDocCount();
      });
  }

  ngOnDestroy() {
    this.resultsSub.unsubscribe();
  }

  defineAccessor() {
    const {id, field, options, title, multiSelect, fieldOptions} = this;
    return new NumericOptionsAccessor(id, {
      id, field, options, title, multiselect: multiSelect, fieldOptions
    });
  }

  toggleItem(option: any) {
    this.accessor.toggleOption(option);
  }

  setItems(keys) {
    this.accessor.setOptions(keys);
  }

  getSelectedItems() {
    const opts = this.accessor.getSelectedOrDefaultOptions() || [];
    return opts.map(({title}) => title);
  }

  hasOptions(): boolean {
    return this.accessor.getBuckets().length != 0;
  }

  getItems() {
    return this.accessor.getBuckets();
  }

  getDocCount() {
    return this.accessor.getDocCount();
  }

  public handleItemSelect(item) {
    this.toggleItem(item);
  } 

}
