const IS_PREFIX = 'is-';
const HAS_PREFIX = 'has-';

const defaultSettings = {
  ns: 'ngx-es-',
  el: '__',
  mod: '_',
  modValue: '_',
  classMap: null
};

// Settings object is global on module level
const settings = defaultSettings;

/**
 * Returns given mixes as list of strings
 * @param {*[]} mixes
 * @return {String[]}
 * @example
 block('block').mix(block('another')); "block another"
 block('one').mix(['two', 'three']); "one two three"
 */
function normalizeMixes(mixes: any[] = []) {
  return mixes
    .map((mix) => {
      if (typeof mix === 'function') {
        return mix.toString();
      } else if (Array.isArray(mix)) {
        return mix.join(' ');
      } else if (typeof mix === 'string') {
        return mix;
      }
      return '';
    })
    .filter((mix) => mix);
}

/**
 * Returns final set of classes
 * @return {String}
 */
function toString(settings, context) {
  let {name, mods, mixes, states} = context,
    classes = [name];

  // Add list of modifiers
  if (mods) {
    classes = classes.concat(
      Object.keys(mods)
        .filter((key) => mods[key])
        .map((key) => {
          let value = mods[key];

          // Modifier with only name
          if (value === true) {
            return name + settings.mod + key;
            // Modifier with name and value
          } else {
            return name + settings.mod + key + settings.modValue + value;
          }
        })
    );
  }

  // Add states
  if (states) {
    Object.keys(states).forEach((prefix) => {
      let statesByPrefix = states[prefix];

      classes = classes.concat(
        Object.keys(statesByPrefix)
          .filter((key) => statesByPrefix[key])
          .map((key) => prefix + key)
      );
    });
  }

  // Add namespace
  if (settings.ns) {
    classes = classes.map((className) => settings.ns + className);
  }

  // Add mixes
  // Don't do it before adding namespace! @see https://github.com/albburtsev/bem-cn/issues/32
  if (mixes) {
    classes = classes.concat(
      normalizeMixes(mixes)
    );
  }

  // Resolve class name from classMap
  if (settings.classMap) {
    classes = classes.map((className) => settings.classMap[className] || className);
  }

  return classes.join(' ');
}

/**
 * Adds new mixes to context and returns selector
 * @param {Object} settings
 * @param {Object} context
 * @param {*} mixes
 * @return {Function}
 */
function mix(settings, context, ...mixes) {
  // Copy context object for new selector generator
  let copied = { ...context };

  // Copy and update list of mixes
  copied.mixes = (copied.mixes || []).concat(mixes);

  return selector(settings, copied);
}

/**
 * Adds new states to context and returns selector
 * @param {Object} settings
 * @param {Object} context
 * @param {String} prefix One of available prefixes `is-` or `has-`
 * @param {Object} states
 * @return {Function}
 */
function state(settings, context, prefix, ...states) {
  // Copy context object for new selector generator
  let copied = { ...context },
    copiedState = { ...(copied.states || {}) };

  // Copy and update object with states
  copiedState[prefix] = { ...(copiedState[prefix] || {}), ...states};
  copied.states = copiedState;

  return selector(settings, copied);
}

/**
 * Selector generator, self-curried function
 * @param {Object} settings
 * @param {String} [settings.ns = ''] Namespace for all classes
 * @param {String} [settings.el = '__'] Delimiter before element name
 * @param {String} [settings.mod = '_'] Delimiter before modifier name
 * @param {String} [settings.modValue = '_'] Delimiter before modifier value
 * @param {Object} [settings.classMap = null]
 * @param {Object} context
 * @param {String} context.name Block or element name
 * @param {Object} [context.mods] Store with all modifiers
 * @param {Object} [context.states] Store with all states
 * @param {Array} [context.mixes] List of external classes
 * @return {Function}
 */
function selector(settings, context) {
  const inner: any = (...args) => {
    // Call without arguments, time to return class names as a string
    if (!args.length) {
      return toString(settings, context);
    }

    // Don't forget to copy context object for new selector generator
    let copied = { ...context };

    // Add new elements and modifiers to the context
    copied = args.reduce((copied, arg) => {
      // New element found
      if (typeof arg === 'string') {
        copied.name += settings.el + arg;
        // New modifier found
      } else if (typeof arg === 'object') {
        copied.mods = { ...(copied.mods || {}), ...arg };
      }

      return copied;
    }, copied);

    return selector(settings, copied);
  };

  inner.mix = mix.bind(null, settings, context);
  inner.has = state.bind(null, settings, context, HAS_PREFIX);
  inner.state = inner.is = state.bind(null, settings, context, IS_PREFIX);
  inner.toString = inner.valueOf = toString.bind(null, settings, context);
  inner.split = (...args) =>
    String.prototype.split.apply(
      toString(settings, context),
      args
    );

  return inner;
}

/**
 * Creates new BEM block
 * @param {String} name
 * @return {Function} Selector generator
 */
export function block(name) {
  if (typeof name !== 'string') {
    throw new Error(`Name not provided`);
  }

  name = name.trim();

  // It is easy to define default settings here
  return selector(settings, {name});
}