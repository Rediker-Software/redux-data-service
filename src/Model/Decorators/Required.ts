import { IDecorator } from "./IDecorator";
import { IValidate, validation } from "./Validation";

/**
 * Decorator to conveniently set a "required" validation rule.
 *
 * @param {string} message
 * @param {boolean} allowEmpty
 * @returns {IDecorator<IValidate>}
 */
export function required(message = "is required", allowEmpty = false): IDecorator<IValidate> {
  return (target: any, key: string) => {
    return validation({ presence: { message, allowEmpty } })(target, key);
  };
}
