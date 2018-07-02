import * as validateJS from "validate.js";
import * as Validators from "../Validators";
import { forEach } from "lodash";

export interface IValidator {
  (validate: validateJS.ValidateJS): void;
}

export interface IValidatorMap {
  [name: string]: IValidator;
}

export const makeInitializeValidateJS = (validate: validateJS.ValidateJS, validators: IValidatorMap) => () =>
  forEach(validators, (initializer, name) => {
    if (name.startsWith("initialize")) {
      initializer(validate);
    }
  });

/**
 * Validation initializers are pulled out of the Validation directory and executed
 * using a standard naming convention such that they are executed if their name starts with "initialize".
 * They are passed an instance of validate.js
 *
 */
export const initializeValidateJS = makeInitializeValidateJS(validateJS, Validators);
