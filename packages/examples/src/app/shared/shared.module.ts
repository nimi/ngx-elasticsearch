import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { NavComponent } from './nav/nav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const components = [
  LayoutComponent,
  NavComponent,
  ToolbarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [ ...components ],
  exports: [ ...components, CommonModule ]
})
export class SharedModule { }
