import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SearchManager } from './SearchManager';

@Injectable()
export class NgxSearchManagerService {
  public searching$: Observable<any>;
  public results$: Observable<any>;
  public manager: SearchManager;
  public get searchManager() { return this.manager; };
  protected initialized: boolean = false;

  public initialize(manager: SearchManager) {
    if (!this.manager && manager) {
      this.manager = manager;
      this.initialized = true;
      this.setObservables(this.manager);
      this.register();
    }
  }

  public register() {
    if (this.manager) {
      this.manager.setupListeners();
      this.manager.completeRegistration();
    }
  }

  public destroy() {
    if (this.manager) {
      this.manager.unlistenHistory();
      this.initialized = false;
    }
  }

  public search(replaceState: boolean = false, notifyState: boolean = true) {
    this.manager.performSearch(replaceState, notifyState);
  }

  private setObservables(manager: SearchManager) {
    this.searching$ = Observable.create(
      (observer) => {
        const listener = manager.searching$$
          .subscribe(val => {
            try { observer.next(val); }
            catch (err) { observer.error(err); }
          });

        return function unsubscribe() {
          listener.unsubscribe();
        }
      }
    );
    this.results$ = Observable.create(
      (observer) => {
        const listener = manager.results$$
          .subscribe(val => {
            try { observer.next(val); }
            catch (err) { observer.error(err); }
          });

        return function unsubscribe() {
          listener.unsubscribe();
        }
      }
    );
  }
}
