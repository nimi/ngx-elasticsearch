import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routing } from './app.routing';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RootComponentsModule } from './root-components/root-components.module';
import { ExamplesModule, components as exampleComponents } from './examples/examples.module';
import { examples } from './examples';
import { ComponentRegistryService, provideExperiments } from './shared/services/component-registry.service';
import { ComponentService, provideResolvedExampleModule } from './shared/services/component.service';

import { getModuleForExamples } from './utils/module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    ExamplesModule,
    RootComponentsModule,
    Routing
  ],
  providers: [
    ComponentRegistryService,
    ComponentService,
    provideResolvedExampleModule(getModuleForExamples(ExamplesModule, examples)),
    provideExperiments(examples)
  ],
  entryComponents: [ ...exampleComponents ],
  bootstrap: [AppComponent]
})
export class AppModule { }
