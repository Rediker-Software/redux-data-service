import { IDecorator } from "./IDecorator";
import { IModelKeys } from "../IModel";
import { IFieldType } from "../FieldType";
import { IFieldTypes, field, IFieldOptions } from "./Field";

/**
 * Classes which wish to use the `@attr` decorator should implement this interface.
 *
 */
export interface IAttrs<T = any> extends IFieldTypes {
  readonly fields: IModelKeys<T, IFieldType>;
  getField(fieldName, defaultValue): any;
  setField(fieldName, value): void;
}

/**
 * A decorator which maps a property's getter and setter to `getField` and `setField`
 * methods implemented on the target class.
 *
 * @param {IFieldType} fieldType
 * @param {IFieldOptions} options
 * @returns {IDecorator<IAttrs>}
 */
export function attr(fieldType: IFieldType, options: IFieldOptions = {}): IDecorator<IAttrs> {
  const defaultValue = options.defaultValue || fieldType.defaultValue;

  return (target: any, key: string) => {
    // Replace TypeScript's property definition with our own.
    if (delete target[key]) {
      Object.defineProperty(target, key, {
        get() {
          return this.getField(key, defaultValue);
        },
        set(value) {
          return this.setField(key, value);
        },
        enumerable: true,
        configurable: true,
      });
    }

    field(fieldType, options)(target, key);
  };
}
