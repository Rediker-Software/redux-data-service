// tslint:disable:max-classes-per-file
import { lorem, random } from "faker";
import { merge } from "lodash";

import { IModel, IModelData } from "./IModel";
import { Model } from "./Model";
import { StringField } from "./FieldType";
import { attr } from "./Decorators/Attr";

export class FakeModel extends Model<IFakeModelData> implements IFakeModel {
  public serviceName = "fakeModel";

  @attr(StringField)
  public fullText: string;

  public getData() {
    return this.modelData;
  }
}

export interface IFakeModel extends IModel<IFakeModelData>, IFakeModelData {

}

export interface IFakeModelData extends IModelData {
  fullText: string;
}

/**
 * Generates a single item using fake data
 *
 * @param {number} id
 * @returns {IFakeModel}
 */
export function createMockFakeModelData(id?: string): IFakeModelData {
  return {
    id: id != null ? id : random.number().toString(),
    fullText: lorem.word(),
    dateUpdated: new Date(),
    dateDeleted: null,
  };
}

export function createMockFakeModel(overrideValues?: IFakeModelData): FakeModel {
  const modelData = merge({},
    createMockFakeModelData(),
    overrideValues,
  );

  return new FakeModel(modelData);
}

/**
 * Generates an array of items using fake data
 *
 * @param {number} numItems
 * @returns {IFakeModel[]}
 */
export function createMockFakeModelArray(numItems = 10): IFakeModelData[] {
  const items: IFakeModelData[] = [];

  for (let x = 0; x < numItems; x++) {
    items.push(createMockFakeModelData(x.toString()));
  }

  return items;
}

export function createMockFakeModels(numItems = 10): FakeModel[] {
  return createMockFakeModelArray(numItems).map(item => new FakeModel(item));
}
