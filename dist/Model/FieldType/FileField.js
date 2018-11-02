"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileField = {
    serialize: true,
    defaultValidationRules: {},
    defaultValue: null,
    isValidType: function (value) { return value == null || value instanceof File; },
    normalize: function (value) { return value; },
    transform: function (file) {
        return new Promise(function (resolve, reject) {
            try {
                var reader = new FileReader();
                reader.onload = function () {
                    var arrayBuffer = this.result;
                    var uint8Array = new Uint8Array(arrayBuffer);
                    resolve(Array.from(uint8Array));
                };
                reader.readAsArrayBuffer(file);
            }
            catch (e) {
                reject(e);
            }
        });
    },
};
