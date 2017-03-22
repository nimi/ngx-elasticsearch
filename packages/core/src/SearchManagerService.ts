import { Injectable } from '@angular/core';
import { SearchManager } from './SearchManager';

@Injectable()
export class NgxSearchManagerService {
  public manager: SearchManager;
  public get searchManager() { return this.manager; };
  protected initialized: boolean = false;

  initialize(manager: SearchManager) {
    if (!this.manager && manager) {
      this.manager = manager;
      this.initialized = true;
    }
  }

  register() {
    if (this.manager) {
      this.manager.setupListeners();
      this.manager.completeRegistration();
    }
  }

  destroy() {
    if (this.manager) {
      this.manager.unlistenHistory();
      this.initialized = false;
      delete this.manager;
    }
  }
}