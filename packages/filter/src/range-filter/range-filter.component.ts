import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
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
    <div *ngIf="hasResults">
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
export class NgxRangeFilterComponent extends NgxElasticsearchComponent implements OnInit {
  @Input() min: number = 0;

  @Input() max: number = 100;

  @Input() field: string;

  @Input() fieldOptions: any;

  @Input() id: string;

  @Input() title: string;

  @Input() interval: number;

  @Input() showHistogram: boolean = true;

  public hasResults: boolean = true;

  protected manager: SearchManager;
  protected accessor: Accessor;

  private resultsSub: Subscription;

  constructor(private service: NgxSearchManagerService) {
    super(service);
  }

  ngOnInit() {
    super.ngOnInit();
    this.resultsSub = this.service.results$
      .subscribe(results => {
        this.hasResults = Boolean(results && results.length);
      });
  }

  ngOnDestroy() {
    this.resultsSub.unsubscribe();
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
		this.service.search();
  }

  public handleChange({values}) {
    this.update(values);
  }

  public handleSlideEnd({values}) {
    this.updateAndSearch(values);
  }

}
