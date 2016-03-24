/**
 * Returns true/false whether the object parameter has its own properties defined
 *
 * @param obj
 * @returns {boolean}
 */
function hasProperties(obj) {
    return Array.prototype.slice.call(arguments, 1).filter(function (key) {
        return typeof obj[key] !== 'undefined';
    }).length > 0;
}
module.exports = hasProperties;
