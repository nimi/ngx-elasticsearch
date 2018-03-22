import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routing } from './app.routing';

import { AppComponent } from './app.component';

import { NgxElasticsearchModule } from '@ngx-elasticsearch/core';
import { HockeyEventsModule } from './hockey-events/hockey-events.module';

const url = "http://localhost:9500/";
const options = {
  useHistory: false,
  searchOnLoad: true,
  headers: {
    'Content-Type': 'application/json'
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
    NgxElasticsearchModule.forRoot({ url, options }),
    HockeyEventsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
