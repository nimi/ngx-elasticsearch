import { Component, OnInit, Input } from '@angular/core';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  RangeAccessor,
  SearchManager,
  Accessor,
  block
} from '@ngx-elasticsearch/core';

@Component({
  selector: 'ngx-es-range-filter',
  template: `
    <p>
      range-filter Works!
      <ngx-es-range
        (onChange)="handleChange($event)"
        (onSlideEnd)="handleSlideEnd($event)"
        [range]="true"
        [min]="0" 
        [max]="100">
      </ngx-es-range>
    </p>
  `,
  styles: []
})
export class NgxRangeFilterComponent extends NgxElasticsearchComponent implements OnInit {
  @Input() min: number = 0;

  @Input() max: number = 100;

  @Input() field: string;

  @Input() fieldOptions: any;

  @Input() id: string;

  @Input() title: string;

  @Input() interval: number;

  @Input() showHistogram: boolean = true;

  protected manager: SearchManager;
  protected accessor: Accessor;

  ngOnInit() {
    super.ngOnInit();
  }

  defineAccessor() {
    const {id, title, field, fieldOptions, interval, showHistogram} = this;
    return new RangeAccessor(id, {
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
		this.manager.performSearch();
  }

  public handleChange({values}) {
    this.update(values);
  }

  public handleSlideEnd({values}) {
    this.updateAndSearch(values);
  }

}
