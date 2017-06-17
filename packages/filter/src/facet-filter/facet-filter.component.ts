import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  FacetAccessor,
  SearchManager,
  Accessor,
  block
} from '@ngx-elasticsearch/core';

const selector = 'refinement-list';

@Component({
  selector: 'ngx-es-facet-filter',
  template: `
    <ngx-es-checkbox-item-list
      (onItemSelect)="handleFacetSelect($event)"
      [items]="items"
      [showCount]="ture"
    >
    </ngx-es-checkbox-item-list>
  `,
  styles: []
})
export class NgxFacetFilterComponent extends NgxElasticsearchComponent implements OnInit {
  @Input() field: string;
  
  @Input() id: string;
  
  @Input() operator: 'and' | 'or';
  
  @Input() title: string;
  
  @Input() include: any;
  
  @Input() exclude: any;
  
  @Input() size: number = 50;
  
  @Input() translations: any;
  
  @Input() orderKey: string;
  
  @Input() orderDirection: 'asc' | 'desc';
  
  @Input() fieldOptions: any;

  @Input() bucketsTransform: Function = x => x;

  @Input() showCount: boolean = true;

  @Input() showMore: boolean = true;

  @Input() collapsable: boolean = false;

  @Output() onFacetSelect: EventEmitter<any> = new EventEmitter();

  public className: any = block(selector);
  public optionClassName: any = block(`${selector}-option`)
  public items: any[] = [];
  public multiSelect: boolean = true;

  protected manager: SearchManager;
  protected accessor: Accessor;

  private resultsSub: Subscription;

  constructor(private service: NgxSearchManagerService) {
    super(service);
  }

  ngOnInit() {
    super.ngOnInit();
    this.resultsSub = this.service.results$
      .take(1)
      .subscribe(result => {
        this.items = this.getItems();
      });
  }

  ngOnDestroy() {
    this.resultsSub.unsubscribe();
  }

  getAccessorOptions(){
    const {
      field, id, operator, title, include, exclude,
      size, translations, orderKey, orderDirection, fieldOptions
    } = this;
    return {
      id, operator, title, size, include, exclude, field,
      translations, orderKey, orderDirection, fieldOptions
    }
  }

  defineAccessor() {
    return new FacetAccessor(
      this.field, this.getAccessorOptions()
    );
  }

  ngOnChanges(changes) {
    const prevOp = changes.operator && changes.operator.previousValue;
    const currOp = changes.operator && changes.operator.currentValue;
    if (prevOp && prevOp.toUpperCase() !== currOp.toUpperCase()) {
      this.accessor.options.operator = this.operator.toUpperCase();
      this.service.search();
    }
  }

  toggleFilter(key) {
    this.accessor.state = this.accessor.state.toggle(key);
    this.service.search();
  }

  setFilters(keys) {
    this.accessor.state = this.accessor.state.setValue(keys)
    this.service.search();
  }

  toggleViewMoreOption(option: any) {
    this.accessor.setViewMoreOption(option);
    this.service.search();
  }

  hasOptions(): boolean {
    return this.accessor.getBuckets().length != 0;
  }

  getSelectedItems(){
    return this.accessor.state.getValue();
  }

  getItems(){
    return this.bucketsTransform(this.accessor.getBuckets());
  }

  public handleFacetSelect(key: string) {
    this.multiSelect ? this.toggleFilter(key) : this.setFilters([key]);
  }

}
