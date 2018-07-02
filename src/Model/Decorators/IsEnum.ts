import { IDecorator } from "./IDecorator";
import { field, IFieldOptions, IFieldTypes } from "./Field";
import { createEnumField } from "../FieldType";

export interface IIsEnumOptions extends Partial<IFieldOptions> {
  relatedFieldName?: string;
}

/**
 * A decorator which maps a property's getter and setter to `getField` and `setField`
 * methods implemented on the target class.
 *
 * @param fieldEnum
 * @param {IIsEnumOptions} options
 * @returns {IDecorator<IFieldTypes>}
 */
export function isEnum(fieldEnum: any, options: IIsEnumOptions = {}): IDecorator<IFieldTypes> {
  return (target: any, key: string) => {
    const EnumField = createEnumField(fieldEnum);

    if (!options.relatedFieldName) {
      options.relatedFieldName = key + "Id";
    }

    // Replace TypeScript's property definition with our own.
    if (delete target[key]) {
      Object.defineProperty(target, key, {
        get() {
          return this.getField(options.relatedFieldName);
        },
        set(value) {
          return this.setField(options.relatedFieldName, value);
        },
        enumerable: true,
        configurable: true,
      });
    }

    field(EnumField, options)(target, key);
  };
}
