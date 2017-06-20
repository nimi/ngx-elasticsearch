import { createHistory, useQueries } from 'history';
import { stringify, parse } from 'qs';

export const encodeObjUrl = (obj: any) => {
  return stringify(obj, { encode: true, encodeValuesOnly: true });
};

export const decodeObjString = (str: string) => {
  return parse(str);
};


export const createHistoryInstance = () => {
  return useQueries(createHistory)({
    stringifyQuery: (ob: any) => encodeObjUrl(ob),
    parseQueryString: (str: string) => decodeObjString(str)
  });
};