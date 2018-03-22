import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSearchLayoutComponent } from './layout/layout.component';
import { NgxSearchTopBarComponent } from './search-top-bar/search-top-bar.component';
import { NgxSearchLayoutBodyComponent } from './search-layout-body/search-layout-body.component';
import { NgxSearchLayoutResultsComponent } from './search-layout-results/search-layout-results.component';
import { NgxSearchActionBarComponent } from './search-action-bar/search-action-bar.component';
import { NgxSearchActionBarRowComponent } from './search-action-bar-row/search-action-bar-row.component';
import { NgxSearchSideBarComponent } from './search-side-bar/search-side-bar.component';
import { NgxSearchBottomBarComponent } from './search-bottom-bar/search-bottom-bar.component';
import { NgxSearchPanelComponent } from './search-panel/search-panel.component';

const components = [
  NgxSearchLayoutComponent,
  NgxSearchTopBarComponent,
  NgxSearchTopBarComponent,
  NgxSearchLayoutBodyComponent,
  NgxSearchLayoutResultsComponent,
  NgxSearchActionBarComponent,
  NgxSearchActionBarRowComponent,
  NgxSearchSideBarComponent,
  NgxSearchBottomBarComponent,
  NgxSearchPanelComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class NgxLayoutModule { }
