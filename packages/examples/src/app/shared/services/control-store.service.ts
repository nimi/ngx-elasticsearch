import { Injectable } from '@angular/core';

@Injectable()
export class ControlStoreService {
  store: any = {};
  callbacks: Function[] = [];

  has(key) {
    return this.store[key] !== undefined;
  }

  set(key, value) {
    this.store[key] = value;
    this.store[key].used = true;
    this.callbacks.forEach(cb => cb());
  }

  get(key) {
    const control = this.store[key];
    if (control) {
      control.used = true;
    }
    return control;
  }

  getAll() {
    return this.store;
  }

  reset() {
    this.store = {};
  }

  markAllUnused() {
    Object.keys(this.store).forEach(controlName => {
      this.store[controlName].used = false;
    });
  }

  subscribe(cb) {
    this.callbacks.push(cb);
  }

  unsubscribe(cb) {
    const index = this.callbacks.indexOf(cb);
    this.callbacks.splice(index, 1);
  }

}
