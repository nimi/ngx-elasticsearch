import {reduce, compact, assign} from 'lodash';

export function AggsContainer(key: string, inner: any, aggsArray: Array<any> = []) {
  aggsArray = compact(aggsArray);
  if (aggsArray.length > 0) {
    inner.aggs = reduce(aggsArray, assign, {});
  }
  return { [key]: inner };
}
