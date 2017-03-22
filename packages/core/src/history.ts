import { createHistory, useQueries } from 'history';
const qs = require('qs');

export const encodeObjUrl = (obj: any) => {
  return qs.stringify(obj, { encode: true, encodeValuesOnly: true });
};

export const decodeObjString = (str: string) => {
  return qs.parse(str);
};

export const createHistoryInstance = () => {
  return useQueries(createHistory)({
    stringifyQuery: (ob: any) => encodeObjUrl(ob),
    parseQueryString: (str: string) => decodeObjString(str)
  });
};