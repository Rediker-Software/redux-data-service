import { IModelData } from "../../Model";
export interface ISetField<T extends IModelData> {
    id: string;
    fieldName: keyof T;
    value: any;
}
