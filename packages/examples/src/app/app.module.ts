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
import { ComponentRegistryService, provideExamples } from './shared/services/component-registry.service';
import { ComponentService, provideResolvedExampleModule } from './shared/services/component.service';

import { getModuleForExamples } from './utils/module';

const exampleModule = () => getModuleForExamples(ExamplesModule, examples);
const resolvedExampleModule = () => provideResolvedExampleModule(exampleModule());
const componentExamples = () => provideExamples(examples);


import { NgxElasticsearchModule } from '@ngx-elasticsearch/core';
import { ImdbModule } from './imdb/imdb.module';

const url = "http://localhost:9200/";
const options = {
  useHistory: false,
  headers: {
    'Content-Type': 'application/json'
  }
};

export let esModule = NgxElasticsearchModule.forRoot({ url, options });

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
    Routing,

    esModule,
    ImdbModule
  ],
  providers: [
    ComponentRegistryService,
    ComponentService,
    resolvedExampleModule(),
    componentExamples()
  ],
  entryComponents: [ ...exampleComponents ],
  bootstrap: [AppComponent]
})
export class AppModule { }
