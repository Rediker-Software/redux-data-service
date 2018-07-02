"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convert = require("lodash/fp/convert");
var lodash_1 = require("lodash");
exports.mapValuesWithKeys = convert("mapValues", lodash_1.mapValues, {
    cap: false,
});
exports.flattenObjectKeys = function (obj) {
    var output = {};
    lodash_1.forEach(obj, function (child, key) {
        if (lodash_1.isPlainObject(child)) {
            lodash_1.forEach(child, function (subChild, childKey) {
                output[key + "." + childKey] = subChild;
            });
        }
        else {
            output[key] = child;
        }
    });
    return output;
};
//# sourceMappingURL=Lodash.js.map