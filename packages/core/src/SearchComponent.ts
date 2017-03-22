import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSearchManagerService } from './SearchManagerService';
import { Accessor } from './';
import { ImmutableQuery } from './query/ImmutableQuery';

@Component({
  selector: 'ngx-search-component',
  template: 'test'
})
export class NgxElasticsearchComponent implements OnDestroy {
  private accessor: Accessor;
  unmounted: boolean = false;

  constructor(public esx: NgxSearchManagerService) {}

  ngOnInit() {
    console.log(this);
  }

  ngOnDestroy() {
    if (this.esx && this.accessor) {
      this.esx.searchManager.removeAccessor(this.accessor);
    }
    this.unmounted = true;
  }

  defineAccessor() {}

  getResults() {
    return this.esx.searchManager.results;
  }

  getHits() {
    return this.esx.searchManager.getHits();
  }

  getHitsCount() {
    return this.esx.searchManager.getHitsCount();
  }

  hasHits() {
    return this.esx.searchManager.hasHits();
  }

  hasHitsChanged() {
    return this.esx.searchManager.hasHitsChanged();
  }

  getQuery(): ImmutableQuery {
    return this.esx.searchManager.query;
  }

  isInitialLoading() {
    return this.esx.searchManager.initialLoading;
  }

  isLoading() {
    return this.esx.searchManager.loading;
  }

  getError() {
    return this.esx.searchManager.error;
  }
}