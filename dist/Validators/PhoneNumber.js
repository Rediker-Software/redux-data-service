"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePhoneNumberValidator = function (validate) {
    return validate.validators.phoneNumber = function (value) {
        return validate.single(value, {
            format: {
                pattern: /^\+?[1-9]\d{1,14}$/,
                message: "must be a valid phone number",
            },
        });
    };
};
//# sourceMappingURL=PhoneNumber.js.map