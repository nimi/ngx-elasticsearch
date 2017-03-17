import {reduce, map, reject, isUndefined} from 'lodash';

export class Utils {
  static guidCounter: number = 0;

  static guid(prefix: string = ''){
    let id = ++Utils.guidCounter;
    return prefix.toString() + id;
  }

  static collapse(collection: any[], seed: any){
    const reducer = (current: any, fn: Function) => fn(current);
    return reduce(collection, reducer, seed);
  }

  static instanceOf(klass: any){
    return (val: any) => val instanceof klass;
  }

  static interpolate(str: string, interpolations: any){
    return str.replace(
  		/{([^{}]*)}/g,
  		(a: string, b: any) => {
  			var r = interpolations[b];
  			return typeof r === 'string' ? r : a;
  		}
    );
  }

  static translate(key: string, interpolations?: any){
    if (interpolations) {
      return Utils.interpolate(key, interpolations);
    } else {
      return key;
    }
  }

  static computeOptionKeys(options: any[], fields: any[], defaultKey: string){
    return map(options, (option) => {
      return Utils.generateKeyFromFields(option, fields, defaultKey);
    });
  }

  static generateKeyFromFields(ob: any, fields: any[], defaultKey: string){
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
}
