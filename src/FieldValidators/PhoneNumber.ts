export const initializePhoneNumberValidator = (validate) =>
  validate.validators.phoneNumber = (value) =>
    validate.single(value, {
      format: {
        pattern: /^\+?[1-9]\d{1,14}$/, // E.164 format
        message: "must be a valid phone number",
      },
    });
