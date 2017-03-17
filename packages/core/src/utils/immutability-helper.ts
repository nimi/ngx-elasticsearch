const hasOwnProperty = {}.hasOwnProperty;

export function shallowCopy(x: any) {
  if (Array.isArray(x)) {
    return x.concat();
  } else if (x && typeof x === 'object') {
    return Object.assign(new x.constructor(), x);
  } else {
    return x;
  }
}

const COMMAND_PUSH = '$push';
const COMMAND_UNSHIFT = '$unshift';
const COMMAND_SPLICE = '$splice';
const COMMAND_SET = '$set';
const COMMAND_MERGE = '$merge';
const COMMAND_APPLY = '$apply';

const ALL_COMMANDS_SET = new Set([
  COMMAND_PUSH,
  COMMAND_UNSHIFT,
  COMMAND_SPLICE,
  COMMAND_SET,
  COMMAND_MERGE,
  COMMAND_APPLY
]);

/**
 * Returns a updated shallow copy of an object without mutating the original.
 */
export function update(value: any, spec: any) {
  if (hasOwnProperty.call(spec, COMMAND_SET)) {
    return spec[COMMAND_SET];
  }

  var nextValue = shallowCopy(value);

  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
    Object.assign(nextValue, spec[COMMAND_MERGE]);
  }

  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
    spec[COMMAND_PUSH].forEach((item: any) => nextValue.push(item));
  }

  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
    spec[COMMAND_UNSHIFT].forEach((item: any) => nextValue.unshift(item));
  }

  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
    spec[COMMAND_SPLICE].forEach((args: any[]) => nextValue.splice.apply(nextValue, args));
  }

  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
    nextValue = spec[COMMAND_APPLY](nextValue);
  }

  Object.keys(spec)
    .filter((k) => !ALL_COMMANDS_SET.has(k))
    .forEach((k) => nextValue[k] = update(value[k], spec[k]));

  return nextValue;
}