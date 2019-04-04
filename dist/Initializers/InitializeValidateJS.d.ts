import * as validateJS from "validate.js";
export interface IValidator {
    (validate: validateJS.ValidateJS): void;
}
export interface IValidatorMap {
    [name: string]: IValidator;
}
export declare const makeInitializeValidateJS: (validate: validateJS.ValidateJS, validators: IValidatorMap) => () => IValidatorMap;
export declare const initializeValidateJS: () => IValidatorMap;
