// tslint:disable:no-empty max-classes-per-file no-unused-expression
import "rxjs/add/observable/of";

import { Map, Record } from "immutable";

import { spy } from "sinon";

import { fakeModelModule } from "../../../TestUtils/FakeModelModule";
import { initializeTestServices, seedService } from "../../../TestUtils/Service";

import { DataServiceStateRecord } from "../DataServiceStateRecord";
import { setFieldReducer, ISetField } from "./SetFieldReducer";
import { FakeModel } from "../../../Model/Model.mock";
import { IAction } from "../../IService";

declare var intern;
const { describe, it, beforeEach, afterEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("setFieldReducer", () => {
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

    it("should set the field on the item with the new value", () => {
      const state = DataServiceStateRecord({
        items: Map({
          [model.id]: model,
        }),
      });

      const action: IAction<ISetField<any>, any> = {
        type: `${serviceName}/SET_FIELD`,
        payload: {
          id: model.id,
          fieldName: "fullText",
          value: "Chicken",
        },
        meta: {},
        invoke: spy(),
      };
      const newState = setFieldReducer(state, action);
      const updatedItem = newState
        .get("items", null)
        .get(model.id) as FakeModel;

      expect(updatedItem.fullText, action.payload.value).to.be.equal;
    });

    it("should not set the items on the record when id not found in items", () => {
      const state = DataServiceStateRecord({
        items: Map({
          [model.id]: model,
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

      const newState = setFieldReducer(state, action);

      expect(setRecordSpy.calledWith("items")).to.be.false;
    });

    it("should update items with updated record when id found in items", () => {

      const state = DataServiceStateRecord({
        items: Map({
          [model.id]: model,
        }),
      });

      const action = {
        type: `${serviceName}/SET_FIELD`,
        payload: {
          id: model.id,
          fieldName: "fullText",
          value: "Darth",
        },
        meta: {},
        invoke: spy(),
      };

      const newState = setFieldReducer(state, action);
      const newModel = newState.items.get(model.id) as FakeModel;
      expect(newModel.fullText)
        .to.equal(action.payload.value);
    });
});
