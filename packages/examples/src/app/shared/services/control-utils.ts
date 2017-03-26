import { EventEmitter } from '@angular/core';
import { ControlManagerService } from './control-manager.service';

export const manager = new ControlManagerService();

export function control(name, options) {
  return manager.control(name, options);
}

export function text(name, value) {
  return manager.control(name, { type: 'text', value });
}

export function boolean(name, value) {
  return manager.control(name, { type: 'boolean', value });
}

export function number(name, value, options = {}) {
  const defaults = {
    range: false,
    min: 0,
    max: 10,
    step: 1,
  };

  const mergedOptions = { ...defaults, ...options };

  const finalOptions = {
    ...mergedOptions,
    type: 'number',
    value,
  };

  return manager.control(name, finalOptions);
}

export function color(name, value) {
  return manager.control(name, { type: 'color', value });
}

export function object(name, value) {
  return manager.control(name, { type: 'object', value });
}

export function select(name, options, value) {
  return manager.control(name, { type: 'select', options, value });
}

export function array(name, value, separator = ',') {
  return manager.control(name, { type: 'array', value, separator });
}

export function date(name, value = new Date()) {
  const proxyValue = value ? value.getTime() : null;
  return manager.control(name, { type: 'date', value: proxyValue });
}

export function useControls(exampleFn, context) {
  const channel = new EventEmitter(); // addons.getChannel();
  return manager.wrapSuite(channel, exampleFn, context);
}
