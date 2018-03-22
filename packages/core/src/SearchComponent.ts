import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSearchManagerService } from './SearchManagerService';
import { Accessor } from './';
import { ImmutableQuery } from './query/ImmutableQuery';
import { SearchManager } from './SearchManager';

@Component({
  selector: 'ngx-search-component',
  template: '<div></div>'
})
export class NgxElasticsearchComponent implements OnDestroy {
  protected accessor: Accessor | void;
  protected manager: SearchManager;
  
  private unmounted: boolean = false;

  constructor(public service: NgxSearchManagerService) {
    this.manager = service.manager;
  }

  ngOnInit() {
    this.accessor = this.defineAccessor();
    if (this.accessor && this.manager) {
      this.accessor = this.manager.addAccessor(this.accessor);
    }
  }

  ngOnDestroy() {
    if (this.manager && this.accessor) {
      this.manager.removeAccessor(this.accessor);
    }
    this.unmounted = true;
  }

  defineAccessor() {}

  getResults() {
    return this.manager.results;
  }

  getHits() {
    return this.manager.getHits();
  }

  getHitsCount() {
    return this.manager.getHitsCount();
  }

  hasHits() {
    return this.manager.hasHits();
  }

  hasHitsChanged() {
    return this.manager.hasHitsChanged();
  }

  getQuery(): ImmutableQuery {
    return this.manager.query;
  }

  isInitialLoading() {
    return this.manager.initialLoading;
  }

  isLoading() {
    return this.manager.loading;
  }

  getError() {
    return this.manager.error;
  }
}