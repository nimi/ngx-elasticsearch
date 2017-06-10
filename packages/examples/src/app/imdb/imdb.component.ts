import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'example-imdb',
  template: `
    <ngx-es-layout></ngx-es-layout>
    <ngx-search-box [queryFields]="['desc^5']"></ngx-search-box>
    <ngx-hits-list></ngx-hits-list>
  `
})
export class ImdbComponent implements OnDestroy {

  ngOnDestroy() {}

}
