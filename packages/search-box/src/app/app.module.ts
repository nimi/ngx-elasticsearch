import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxElasticsearchModule } from '../../../core/lib';

import { AppComponent } from './app.component';
import { SearchBoxComponent } from './search-box/search-box.component';

const url = "http://localhost:9200/";
const options = { useHistory: false };

export let esModule = NgxElasticsearchModule.forRoot({ url, options });

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    esModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
