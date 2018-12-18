// tslint:disable:no-empty max-classes-per-file no-unused-expression
import "rxjs/add/observable/of";

import { Map, Record } from "immutable";

import { spy } from "sinon";

import { fakeModelModule } from "../../../TestUtils/FakeModelModule";
import { initializeTestServices } from "../../../TestUtils/InitializeTestServices";
import { seedService } from "../../../TestUtils/Seed";

import { DataServiceStateRecord } from "../DataServiceStateRecord";
import { setMetaFieldReducer, ISetMetaField } from "./SetMetaFieldReducer";
import { FakeModel } from "../../../Model/Model.mock";
import { IAction } from "../../IService";

declare var intern;
const { describe, it, beforeEach, afterEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("setMetaFieldReducer", () => {
    let setRecordSpy;
    let serviceName;
    let model;

    beforeEach(() => {
      initializeTestServices(fakeModelModule);
      model = seedService("fakeModel");
      setRecordSpy = spy(Record.prototype, "set");
      serviceName = "fakeModel";
    });

    afterEach(() => {
      setRecordSpy.restore();
    });

    it("should set the meta field on the item with the new value", () => {
      const state = DataServiceStateRecord({
        items: Map({
          [model.id]: model,
        }),
      });

      const action: IAction<ISetMetaField<any>, any> = {
        type: `${serviceName}/SET_META_FIELD`,
        payload: {
          id: model.id,
          fieldName: "isLoading",
          value: false,
        },
        meta: {},
        invoke: spy(),
      };
      const newState = setMetaFieldReducer(state, action);
      const updatedItem = newState
        .get("items", null)
        .get(model.id) as FakeModel;
        
      expect(updatedItem.isLoading).to.be.equal(action.payload.value);
    });

    it("should not set the metadata on the items on the record when id not found in items", () => {
      const state = DataServiceStateRecord({
        items: Map({
          [model.id]: model,
        }),
      });
      
      const action: IAction<ISetMetaField<any>, any> = {
        type: `${serviceName}/SET_META_FIELD`,
        payload: {
          id: "not likely to exist",
          fieldName: "isLoading",
          value: true,
        },
        meta: {},
        invoke: spy(),
      };

      const newState = setMetaFieldReducer(state, action);

      expect(setRecordSpy.calledWith("items")).to.be.false;
    });

    it("should update items with appropriate metadata when id found in items", () => {

      const state = DataServiceStateRecord({
        items: Map({
          [model.id]: model,
        }),
      });

      const action: IAction<ISetMetaField<any>, any> = {
        type: `${serviceName}/SET_META_FIELD`,
        payload: {
          id: model.id,
          fieldName: "isLoading",
          value: true,
        },
        meta: {},
        invoke: spy(),
      };

      const newState = setMetaFieldReducer(state, action);
      const newModel = newState.items.get(model.id) as FakeModel;
      expect(newModel.isLoading)
        .to.equal(action.payload.value);
    });
});
