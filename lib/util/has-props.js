module.exports = function(obj) {
  return Array.prototype.slice.call(arguments, 1).filter(function(key) {
    return typeof obj[key] !== 'undefined';
  }).length > 0;
};
