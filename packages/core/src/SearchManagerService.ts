import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SearchManager } from './SearchManager';

/**
 * @name NgxSearchManagerService
 * @description
 *
 * This is the core service for powering all elastic components
 * 
 */
@Injectable()
export class NgxSearchManagerService {

  /**
   * @name searching$
   * @type {Observable}
   * @description Searching state
   */
  public searching$: Observable<any>;

  /**
   * @name results$
   * @type {Observable}
   * @description Search results state
   */
  public results$: Observable<any>;

  /**
   * @name searching$
   * @type {Observable}
   * @description Searching state
   */
  // Getter/setter for search manager instance
  public get manager() { return this.searchManager; };
  public set manager(manager: SearchManager) { this.searchManager = manager }

  
  // Search manager initialization flag
  protected initialized: boolean = false;

  // Private search manager instance
  private searchManager: SearchManager;

  /**
   * @name intialize
   * @description
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
   * @name destroy
   * @description
   * Destroys the search manager instance and unsets initialized state
   */
  public destroy() {
    if (this.manager) {
      this.manager.unlistenHistory();
      this.initialized = false;
    }
  }

  /**
   * @name search
   * @description
   * Kick of a search on the search manager
   * @param {Boolean} replaceState
   * @param {Boolean} notifyState 
   */
  public search(replaceState: boolean = false, notifyState: boolean = true) {
    this.manager.performSearch(replaceState, notifyState);
  }

  /**
   * @name setObservables
   * @description
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

  /**
   * @name register
   * @description
   * Registers search manager instance
   */
  private register() {
    if (this.manager) {
      this.manager.setupListeners();
      this.manager.completeRegistration();
    }
  }
}
