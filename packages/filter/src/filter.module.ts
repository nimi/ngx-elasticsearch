import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxElasticsearchModule } from '@ngx-elasticsearch/core';
import { NgxRangeModule } from '@ngx-elasticsearch/range';
import { NgxListModule } from '@ngx-elasticsearch/list';
import { NgxLayoutModule } from '@ngx-elasticsearch/layout';

import { NgxCheckboxFilterComponent } from './checkbox-filter';
import { HierarchicalRefinementFilterComponent } from './hierarchical-refinement-filter';
import { NgxSelectedFiltersComponent } from './selected-filters/selected-filters.component';
import { NgxResetFilterComponent } from './reset-filter/reset-filter.component';
import { NgxNumericRefinementListComponent } from './numeric-refinement-list-filter';
import { DynamicRangeFilterComponent } from './dynamic-range-filter/dynamic-range-filter.component';
import { NgxRangeFilterComponent } from './range-filter/range-filter.component';
import { NgxFacetFilterComponent } from './facet-filter/facet-filter.component';
import { NgxTagFilterComponent } from './tag-filter/tag-filter.component';
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
    DynamicRangeFilterComponent,
    HierarchicalRefinementFilterComponent,
    NgxCheckboxFilterComponent,
    NgxNumericRefinementListComponent,
    NgxSelectedFiltersComponent,
    NgxResetFilterComponent,
    NgxRangeFilterComponent,
    NgxFacetFilterComponent,
    NgxTagFilterComponent,
    NgxHierarchicalMenuFilterComponent
  ],
  exports: [
    DynamicRangeFilterComponent,
    HierarchicalRefinementFilterComponent,
    NgxCheckboxFilterComponent,
    NgxNumericRefinementListComponent,
    NgxSelectedFiltersComponent,
    NgxResetFilterComponent,
    NgxRangeFilterComponent,
    NgxFacetFilterComponent,
    NgxTagFilterComponent,
    NgxHierarchicalMenuFilterComponent
  ]
})
export class NgxFilterModule { }
