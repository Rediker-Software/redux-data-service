
export interface IFieldType<T = any> {
  serialize: boolean;
  defaultValidationRules: any;
  defaultValue: T;
  isValidType(value: T | any): boolean;
  transform?(value: T): Promise<any>;
  normalize(serializedValue: any): Promise<T>;
}
