import { IModelData } from "../Model";

export type IFieldValidatorResult = string[] | undefined;

export type IValidatorResult<T> = {
  [P in keyof T]?: IFieldValidatorResult
};

export interface IValidator<T extends IModelData> {
  validate(model: T): Promise<IValidatorResult<T>>;
  validateField(model: T, fieldName: string): Promise<IFieldValidatorResult>;
}
