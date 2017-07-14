import { findIndex, forEach, isEmpty, filter, keys } from 'lodash';

/**
 * @name isBoolOp
 * @description Check if the operator is a bool
 * @param operator 
 * @param val 
 */
function isBoolOp(operator: string, val: any) {
  return !!val.bool
    && !!val.bool[operator]
    && keys(val).length === 1
    && keys(val.bool).length === 1;
}

/**
 * @name flattenBool
 * @description Flatten bool operator
 * @param operator 
 * @param arr 
 */
function flattenBool(operator: string, arr: any[]) {
  // Flatten bool.must
  let newArr: any[] = [];
  forEach(arr, node => {
    if (isBoolOp(operator, node)) {
      newArr.push(...node.bool[operator]);
    } else {
      newArr.push(node);
    }
  });
  return newArr;
}

/**
 * @name boolHelper
 * @description Create bool query based on operator and value
 * @param val 
 * @param operator 
 */
function boolHelper(val: any, operator: string){
  if (Array.isArray(val)) {
    // Remove empty filters
    val = filter(val, f => !isEmpty(f));
    if (val.length === 1) {
      if (operator !== 'must_not')  {
        return val[0];
      } else {
        [ val ] = val; // Unbox array
      }
    } else if (val.length === 0) {
      return {};
    } else if ((operator === 'must' || operator === 'should')
      && (findIndex(val, isBoolOp.bind(null, operator)) != -1)) {
      val = flattenBool(operator, val);
    }
  }
  return {
    bool:{
      [operator]: val
    }
  };
}

/**
 * @name BoolMust
 * @description
 * 
 * A query that matches documents matching boolean combinations of other queries.
 * The bool query maps to Lucene BooleanQuery
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html
 * 
 * @param val
 */
export function BoolMust(val: any){
  return boolHelper(val, 'must');
}

/**
 * @name BoolMustNot
 * @description
 * 
 * A query that matches documents matching boolean combinations of other queries.
 * The bool query maps to Lucene BooleanQuery
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html
 * 
 * @param val
 */
export function BoolMustNot(val: any){
  return boolHelper(val, 'must_not');
}

/**
 * @name BoolShould
 * @description
 * 
 * A query that matches documents matching boolean combinations of other queries.
 * The bool query maps to Lucene BooleanQuery
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html
 * 
 * @param val
 */
export function BoolShould(val: any){
  return boolHelper(val, 'should');
}
