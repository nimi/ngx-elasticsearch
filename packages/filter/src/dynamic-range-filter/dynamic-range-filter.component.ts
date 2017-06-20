import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  DynamicRangeAccessor,
  SearchManager,
  Accessor,
  block
} from '@ngx-elasticsearch/core';

@Component({
  selector: 'ngx-es-dynamic-range-filter',
  template: `
    <div *ngIf="hasResults && hasMinMax">
      <ngx-es-panel
        [title]="title"
      >
        <ngx-es-range
          (onChange)="handleChange($event)"
          (onSlideEnd)="handleSlideEnd($event)"
          [range]="true"
          [min]="min" 
          [max]="max">
        </ngx-es-range>
      </ngx-es-panel>
    </div>
  `,
  styles: []
})
export class NgxDynamicRangeFilterComponent extends NgxElasticsearchComponent implements OnInit {

  @Input() field: string;

  @Input() fieldOptions: any;

  @Input() id: string;

  @Input() title: string;

  @Input() interval: number;

  @Input() showHistogram: boolean = true;

  public hasResults: boolean = true;

  public min: number;

  public max: number;

  public hasMinMax: boolean = false;

  protected manager: SearchManager;
  protected accessor: DynamicRangeAccessor;

  private resultsSub: Subscription;

  constructor(private service: NgxSearchManagerService) {
    super(service);
  }

  ngOnInit() {
    super.ngOnInit();
    const { min, max } = this.getMinMax();
    this.min = min;
    this.max = max;
    this.hasMinMax = typeof this.min === 'number' && typeof this.max === 'number';
    this.resultsSub = this.service.results$
      .subscribe(results => {
        const { min, max } = this.getMinMax();
        this.min = min;
        this.max = max;
        this.hasResults = Boolean(results && results.length);
      });
  }

  ngOnDestroy() {
    this.resultsSub.unsubscribe();
  }

  defineAccessor() {
    const {id, title, field, fieldOptions, interval, showHistogram} = this;
    return new DynamicRangeAccessor(id, {
      id, title, field, fieldOptions, interval, loadHistogram: showHistogram
    });
  }

  private update([min, max]) {
    if ((min == this.min) && (max == this.max)){
  		this.accessor.state = this.accessor.state.clear()
  	} else {
    	this.accessor.state = this.accessor.state.setValue({min, max})
  	}
  }

  private updateAndSearch(newValues) {
    this.update(newValues);
		this.service.search();
  }

  public handleChange({values}) {
    this.update(values);
  }

  public handleSlideEnd({values}) {
    this.updateAndSearch(values);
  }

  private getMinMax() {
    return {
      min: this.accessor.getStat('min') || 0,
      max: this.accessor.getStat('max') || 100
    };
  }

}
