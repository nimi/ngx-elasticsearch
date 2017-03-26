import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RootContainerComponent } from './root-container.component';
import { PreviewContainerComponent } from './preview-container/preview-container.component';

import { Routing } from './root-components.routing';
import { StageComponent } from './stage/stage.component';
import { RendererComponent } from './renderer/renderer.component';
import { ControlsContainerComponent } from './controls-container/controls-container.component';

@NgModule({
  imports: [
    SharedModule,
    Routing
  ],
  declarations: [RootContainerComponent, PreviewContainerComponent, StageComponent, RendererComponent, ControlsContainerComponent],
  exports: [RootContainerComponent, PreviewContainerComponent]
})
export class RootComponentsModule { }
