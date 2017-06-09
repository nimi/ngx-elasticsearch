import { Injectable } from '@angular/core';

@Injectable()
export class ControlStoreService {
  store: Map<string, any> = new Map();

  has(key) {
    return this.store.has(key);
  }

  set(key, value) {
    Object.assign(value, { used: true });
    this.store.set(key, value);
  }

  get(key) {
    const control = this.store.get(key);
    if (control) { control.used = true; }
    return control;
  }

  getAll() {
    let o = {};
    this.store.forEach((v, k) => o[k] = v);
    return o;
  }

  getAllKeys() {
    let arr = [];
    this.store.forEach((v, k) => arr.push(k));
    return arr;
  }

  getAllValues() {
    let arr = [];
    this.store.forEach((v, k) => arr.push(v));
    return arr;
  }

  reset() {
    this.store = new Map();
  }

  markAllUnused() {
    // Object.keys(this.store).forEach(controlName => {
    //   this.store[controlName].used = false;
    // });
  }

}
