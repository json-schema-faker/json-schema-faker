'use strict';

var __ = require('underscore');
var __de = require('underscore-deep-extend');
__.mixin({deepExtend: __de(__)});

//var merge = require('deepmerge');

function combine(target) {
    var props = Array.prototype.slice.call(arguments, 1);

    props.forEach(function (obj) {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
//        target[key] = merge(target[key], obj[key]);
                if (target[key]) {
                    target[key] = __.deepExtend(target[key], obj[key]);
                } else {
                    target[key] = obj[key];
                }
            }
        }
    });
}

module.exports = combine;
