import {reduce, map, reject, isUndefined} from 'lodash';

export * from './EventEmitter';
export * from './http';
export * from './immutability-helper';

let guidCounter: number = 0;
export const guid = (prefix: string = '') => {
  let id = ++guidCounter;
  return prefix.toString() + id;
};

export const collapse = (collection: any[], seed: any) => {
  const reducer = (current: any, fn: Function) => fn(current);
  return reduce(collection, reducer, seed);
};

export const instanceOf = (klass: any) => {
  return (val: any) => val instanceof klass;
};

export const interpolate = (str: string, interpolations: any) => {
  return str.replace(
    /{([^{}]*)}/g,
    (a: string, b: any) => {
      var r = interpolations[b];
      return typeof r === 'string' ? r : a;
    }
  );
};

export const translate = (key: string, interpolations?: any) => {
  if (interpolations) {
    return interpolate(key, interpolations);
  } else {
    return key;
  }
};

export const computeOptionKeys = (options: any[], fields: any[], defaultKey: string) => {
  return map(options, (option) => {
    return generateKeyFromFields(option, fields, defaultKey);
  });
};

export const generateKeyFromFields = (ob: any, fields: any[], defaultKey: string) => {
  if(ob.key){
    return ob;
  }
  let fieldValues = reject(map(fields, (field: string) => ob[field]), isUndefined);
  if(fieldValues.length > 0){
    ob.key = fieldValues.join('_');
  } else {
    ob.key = defaultKey;
  }
  return ob;
};