const path = require('path');

const ENV = process.env.NODE_ENV;
const ROOT = path.resolve(__dirname, '..');

exports.dir = function(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}