
export type IFieldValidatorResult = string[] | undefined;

export type IValidatorResult<T> = {
  [P in keyof T]?: IFieldValidatorResult
};

export interface IValidator<T> {
  validate(): IValidatorResult<T>;
  validateField(fieldName: string): IFieldValidatorResult;
}
