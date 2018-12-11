import { IValidator, IFieldValidatorResult, IValidatorResult } from "./IValidator";
import { IModelData } from "../Model";

/**
 * Validator class for validating the state of a given Model instance.
 * Model-specific Validators can be created by extending this class or implementing IValidator and setting it on the model.
 */
export class Validator<T extends IModelData> implements IValidator<T> {

  public async validateField(model: T, fieldName: string): Promise<IFieldValidatorResult> {
    return undefined;
  }

  public async validate(model: T): Promise<IValidatorResult<T>> {
    return undefined;
  }

}
