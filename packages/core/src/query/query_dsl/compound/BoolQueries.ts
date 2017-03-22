import { findIndex, forEach, isEmpty, filter, keys } from 'lodash';

function isBoolOp(operator: string, val: any) {
  // Has {bool: must: []} ?
  if (!val.bool || !val.bool[operator]) { return false; }

  // Doesn't have other stuff ?
  return (keys(val).length == 1) && (keys(val.bool).length == 1);
}

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

function boolHelper(val: any, operator: string){
  const isArr = Array.isArray(val);
  if (isArr) {
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
      [operator]:val
    }
  };
}

export function BoolMust(val: any){
  return boolHelper(val, 'must');
}

export function BoolMustNot(val: any){
  return boolHelper(val, 'must_not');
}

export function BoolShould(val: any){
  return boolHelper(val, 'should');
}
