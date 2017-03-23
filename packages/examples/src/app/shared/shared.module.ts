import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RootContainerComponent } from './containers/root-container/root-container.component';
import { PreviewContainerComponent } from './containers/preview-container/preview-container.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';
import { RendererComponent } from './components/renderer/renderer.component';
import { StageComponent } from './components/stage/stage.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const components = [
  RootContainerComponent,
  PreviewContainerComponent,
  LayoutComponent,
  NavComponent,
  RendererComponent,
  StageComponent,
  ToolbarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ ...components ],
  exports: [ ...components ]
})
export class SharedModule { }
