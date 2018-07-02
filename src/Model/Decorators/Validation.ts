import { IDecorator } from "./IDecorator";
import { IModelKeys } from "../IModel";
import { merge } from "lodash";

export interface IValidate<T = any> {
  readonly validationRules: IModelKeys<T>;
  validate(): IModelKeys<T>;
}

/**
 * A property decorator for specifying validation rules.
 *
 * We currently use [Validate.js](https://validatejs.org/), but this should work with any rules-based validation engine.
 *
 * @param {any} validationRules
 * @returns {IDecorator<IValidate>}
 */
export function validation(validationRules): IDecorator<IValidate> {
  return (target: any, key: string) => {
    target.validationRules = merge({}, target.validationRules, {
      [key]: validationRules,
    });
  };
}
