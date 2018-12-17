// tslint:disable:no-empty max-classes-per-file no-unused-expression
import "rxjs/add/observable/of";

import { Map, Record } from "immutable";

import { lorem } from "faker";
import { match, spy } from "sinon";

import { DataServiceStateRecord } from "../DataServiceStateRecord";
import { setFieldReducer, ISetField } from "./SetFieldReducer";
import { IModelMeta } from "../../../Model/IModel";
import { IFakeModelData, FakeModel } from "../../../Model/Model.mock";
import { IAction } from "../../IService";

declare var intern;
const { describe, it, beforeEach, afterEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("setFieldReducer", () => {

  it("has a reducer for setting the field of a record", () => {
    expect(setFieldReducer).to.be.a("function");
  });

  describe("setFieldReducer", () => {
    let setRecordSpy;
    let serviceName;

    beforeEach(() => {
      setRecordSpy = spy(Record.prototype, "set");
      serviceName = "FakeModel";
    });

    afterEach(() => {
      setRecordSpy.restore();
    });

    it("should set the field on the item with the new value", () => {
      const modelData = {
        id: "1",
        fullText: "Egg",
      };
      const modelMeta = {} as IModelMeta<IFakeModelData>;
      const model = new FakeModel(modelData, modelMeta);

      const state = DataServiceStateRecord({
        items: Map({
          [modelData.id]: model,
        }),
      });

      const action: IAction<ISetField<any>, any> = {
        type: `${serviceName}/SET_FIELD`,
        payload: {
          id: modelData.id,
          fieldName: "fullText",
          value: "Chicken",
        },
        meta: {},
        invoke: spy(),
      };
      debugger;
      const sut = setFieldReducer(state, action);
      const updatedItem = sut
        .get("items", null)
        .get(modelData.id) as FakeModel;

      expect(updatedItem.fullText, action.payload.value).to.be.equal;
    });

    it("should not set the items on the record when id not found in items", () => {
      const modelData = {
        id: "1",
        firstName: "Elton",
      };
      const modelMeta = {} as IModelMeta<IFakeModelData>;
      const model = new FakeModel(modelData, modelMeta);

      const state = DataServiceStateRecord({
        items: Map({
          [modelData.id]: model,
        }),
      });
      
      const action = {
        type: `${serviceName}/SET_FIELD`,
        payload: {
          id: "not likely to exist",
          fieldName: "firstName",
          value: "Sir Elton",
        },
        meta: {},
        invoke: spy(),
      };

      const sut = setFieldReducer(state, action);

      expect(setRecordSpy.calledWith("items")).to.be.false;
    });

    it("should update items with updated record when id found in items", () => {
      const modelData = {
        id: "1",
        fullText: "Anakin",
      };
      const modelMeta = { changes: null } as IModelMeta<IFakeModelData>;
      const model = new FakeModel(modelData, modelMeta);

      const state = DataServiceStateRecord({
        items: Map({
          [modelData.id]: model,
        }),
      });

      const action = {
        type: `${serviceName}/SET_FIELD`,
        payload: {
          id: modelData.id,
          fieldName: "fullText",
          value: "Darth",
        },
        meta: {},
        invoke: spy(),
      };

      const sut = setFieldReducer(state, action);

      expect(setRecordSpy.calledWith("items",
        match((updatedItems) => {
          const updatedModel = updatedItems.get(modelData.id);
          return updatedModel.meta.changes.fullText === action.payload.value;
        }))).to.be.true;
    });
  });

});
