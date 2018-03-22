import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxRangeComponent } from './range';
import { RangeHistogramComponent } from './range-histogram/range-histogram.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxRangeComponent,
    RangeHistogramComponent
  ],
  exports: [
    NgxRangeComponent
  ]
})
export class NgxRangeModule { }

export { NgxRangeComponent };