import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SearchManager } from './SearchManager';

@Injectable()
export class NgxSearchManagerService {

  // Observable for searching state
  public searching$: Observable<any>;

  // Observable for elasticsearch results
  public results$: Observable<any>;

  // Getter/setter for search manager instance
  public get manager() { return this.searchManager; };
  public set manager(manager: SearchManager) { this.searchManager = manager }

  // Search manager initialization flag
  protected initialized: boolean = false;

  // Private search manager instance
  private searchManager: SearchManager;

  /**
   * Initializes the service with a manager instance, registers
   * listeners and observables
   * @param {SearchManager} manager
   */
  public initialize(manager: SearchManager) {
    if (!this.manager && manager) {
      this.manager = manager;
      this.initialized = true;
      this.setObservables(this.manager);
      this.register();
    }
  }

  /**
   * Registers search manager instance
   */
  public register() {
    if (this.manager) {
      this.manager.setupListeners();
      this.manager.completeRegistration();
    }
  }

  /**
   * Destroys the search manager instance and unsets initialized state
   */
  public destroy() {
    if (this.manager) {
      this.manager.unlistenHistory();
      this.initialized = false;
    }
  }

  /**
   * Kick of a search on the search manager
   * @param {Boolean} replaceState
   * @param {Boolean} notifyState 
   */
  public search(replaceState: boolean = false, notifyState: boolean = true) {
    this.manager.performSearch(replaceState, notifyState);
  }

  /**
   * Setup Observables for searching and results state 
   * @param {SearchManager} manager
   * @private
   */
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
