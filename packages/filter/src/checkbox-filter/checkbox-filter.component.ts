import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  CheckboxFilterAccessor,
  SearchManager,
  Accessor,
  block
} from '@ngx-elasticsearch/core';

const selector = 'refinement-list';

@Component({
  selector: 'ngx-es-checkbox-filter',
  template: `
    <ngx-es-panel
      [title]="title"
    >
      <ngx-es-checkbox-item-list
        (onItemSelect)="handleSelect($event)"
        [selectedItems]="selectedItems"
        [items]="items"
        [showCount]="showCount"
      >
      </ngx-es-checkbox-item-list>
    </ngx-es-panel>
  `,
  styles: []
})
export class NgxCheckboxFilterComponent extends NgxElasticsearchComponent implements OnInit {
  
  @Input() id: string;
    
  @Input() title: string;
    
  @Input() filter: any;

  @Input() label: string;
  
  @Input() orderKey: string;

  @Input() showCount: boolean = true;

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  public className: any = block(selector);
  public optionClassName: any = block(`${selector}-option`)
  public items: any[] = [];
  public multiSelect: boolean = true;
  public selectedItems: string[] = [];

  protected manager: SearchManager;
  protected accessor: Accessor;

  private resultsSub: Subscription;

  constructor(private service: NgxSearchManagerService) {
    super(service);
  }

  ngOnInit() {
    super.ngOnInit();
    this.resultsSub = this.service.results$
      .subscribe(result => {
        this.items = this.getItems();
      });
  }

  ngOnDestroy() {
    this.resultsSub.unsubscribe();
  }

  defineAccessor() {
    const { id, title, label, filter } = this;
    return new CheckboxFilterAccessor(id, {
      id, title, label, translations: {}, filter
    });
  }

  toggleFilter(key) {
    this.accessor.state = this.accessor.state.create(!this.accessor.state.getValue());
    this.service.search();
  }

  setFilters(keys) {
    this.accessor.state = this.accessor.state.setValue(keys.length > 0);
    this.service.search();
  }

  getSelectedItems(){
    return this.accessor.state.getValue()
      ? [this.label]
      : [];
  }

  private getItems() {
    return [{ key: this.label, doc_count: this.accessor.getDocCount() }];
  }

  public handleSelect(key: string) {
    if (this.multiSelect) {
      this.toggleFilter(key);
    } else {
      this.setFilters([key]);
    }
    this.selectedItems = this.getSelectedItems();
    this.onSelect.emit(key);
  }

}
