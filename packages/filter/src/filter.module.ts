import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxElasticsearchModule } from '@ngx-elasticsearch/core';
import { NgxRangeModule } from '@ngx-elasticsearch/range';
import { NgxListModule } from '@ngx-elasticsearch/list';
import { NgxLayoutModule } from '@ngx-elasticsearch/layout';

import { CheckboxFilterComponent } from './checkbox-filter';
import { HierarchicalRefinementFilterComponent } from './hierarchical-refinement-filter';
import { NgxSelectedFiltersComponent } from './selected-filters/selected-filters.component';
import { ResetFilterComponent } from './reset-filter/reset-filter.component';
import { NumericMenuFilterComponent } from './numeric-menu-filter/numeric-menu-filter.component';
import { DynamicRangeFilterComponent } from './dynamic-range-filter/dynamic-range-filter.component';
import { NgxRangeFilterComponent } from './range-filter/range-filter.component';
import { NgxFacetFilterComponent } from './facet-filter/facet-filter.component';
import { TagFilterComponent } from './tag-filter/tag-filter.component';
import { NgxHierarchicalMenuFilterComponent } from './hierarchical-menu-filter';

export * from './hierarchical-menu-filter';

@NgModule({
  imports: [
    CommonModule,
    NgxRangeModule,
    NgxListModule,
    NgxLayoutModule
  ],
  declarations: [
    CheckboxFilterComponent,
    HierarchicalRefinementFilterComponent,
    NgxSelectedFiltersComponent,
    ResetFilterComponent,
    NumericMenuFilterComponent,
    DynamicRangeFilterComponent,
    NgxRangeFilterComponent,
    NgxFacetFilterComponent,
    TagFilterComponent,
    NgxHierarchicalMenuFilterComponent
  ],
  exports: [
    CheckboxFilterComponent,
    HierarchicalRefinementFilterComponent,
    ResetFilterComponent,
    NumericMenuFilterComponent,
    DynamicRangeFilterComponent,
    TagFilterComponent,
    NgxFacetFilterComponent,
    NgxRangeFilterComponent,
    NgxSelectedFiltersComponent,
    NgxHierarchicalMenuFilterComponent
  ]
})
export class NgxFilterModule { }
