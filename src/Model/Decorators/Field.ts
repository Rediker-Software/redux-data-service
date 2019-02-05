import { defaultsDeep, merge } from "lodash";

import { Omit } from "../../Omit";
import { IModelKeys } from "../IModel";
import { IFieldType } from "../FieldType";

import { IDecorator } from "./IDecorator";
import { IValidate, validation } from "./Validation";

/**
 * Classes which wish to use the `@field` decorator (or any of the decorators which call it) will need to implement this interface.
 */
export interface IFieldTypes<T = any> extends IValidate {
  readonly fields: IModelKeys<T, IFieldType>;
}

export interface IFieldOptions extends Partial<Omit<IFieldType, "navigationFieldName">> {
}

/**
 * A decorator which marks the FieldType for the property and sets up default validation rules.
 *
 * Note: Chances are you should use the `@attr`, `@belongsTo` or `@hasMany` decorators instead,
 * each of which wrap this decorator.
 *
 * @param {IFieldType} fieldType
 * @param {IFieldOptions} options
 * @returns {IDecorator<IFieldTypes>}
 */
export function field(fieldType: IFieldType, options: IFieldOptions & any = {}): IDecorator<IFieldTypes> {
  const fieldConfig = defaultsDeep({}, options, fieldType);
  const validationRules = fieldConfig.defaultValidationRules;

  return (target: any, key: string) => {
    target.fields = merge({}, target.fields, { [key]: fieldConfig });
    validation(validationRules)(target, key);
  };
}
