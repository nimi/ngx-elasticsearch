import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxElasticsearchModule } from '@ngx-elasticsearch/core';
import { CheckboxFilterComponent } from './checkbox-filter';
import { HierarchicalRefinementFilterComponent } from './hierarchical-refinement-filter';
import { SelectedFiltersComponent } from './selected-filters/selected-filters.component';
import { ResetFilterComponent } from './reset-filter/reset-filter.component';
import { NumericMenuFilterComponent } from './numeric-menu-filter/numeric-menu-filter.component';
import { DynamicRangeFilterComponent } from './dynamic-range-filter/dynamic-range-filter.component';
import { RangeFilterComponent } from './range-filter/range-filter.component';
import { FacetFilterComponent } from './facet-filter/facet-filter.component';
import { TagFilterComponent } from './tag-filter/tag-filter.component';
import { NgxHierarchicalMenuFilterComponent } from './hierarchical-menu-filter';

export * from './hierarchical-menu-filter';

@NgModule({
  declarations: [
    CheckboxFilterComponent,
    HierarchicalRefinementFilterComponent,
    SelectedFiltersComponent,
    ResetFilterComponent,
    NumericMenuFilterComponent,
    DynamicRangeFilterComponent,
    RangeFilterComponent,
    FacetFilterComponent,
    TagFilterComponent,
    NgxHierarchicalMenuFilterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CheckboxFilterComponent,
    HierarchicalRefinementFilterComponent,
    SelectedFiltersComponent,
    ResetFilterComponent,
    NumericMenuFilterComponent,
    DynamicRangeFilterComponent,
    RangeFilterComponent,
    FacetFilterComponent,
    TagFilterComponent,
    NgxHierarchicalMenuFilterComponent
  ]
})
export class NgxFilterModule { }
