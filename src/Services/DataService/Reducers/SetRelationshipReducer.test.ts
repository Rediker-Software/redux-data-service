// tslint:disable:no-empty max-classes-per-file no-unused-expression
import { spy } from "sinon";
import "rxjs/add/observable/of";

import { Map, Record } from "immutable";

import { initializeTestServices } from "../../../TestUtils/InitializeTestServices";
import { seedService } from "../../../TestUtils/Seed";
import { fakeModelModule } from "../../../TestUtils/FakeModelModule";

import { ISetField } from "../ISetField";
import { DataServiceStateRecord } from "../DataServiceStateRecord";
import { IAction } from "../../IService";
import { setRelationshipReducer } from "./SetRelationshipReducer";

declare var intern;
const { describe, it, beforeEach, afterEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("setRelationshipReducer", () => {
  let model;
  let setRecordSpy;
  let serviceName;

  beforeEach(() => {
    initializeTestServices(fakeModelModule);
    model = seedService("fakeModel");
    setRecordSpy = spy(Record.prototype, "set");
    serviceName = "fakeModel";
  });

  afterEach(() => {
    setRecordSpy.restore();
  });

  it("should set the relationship on the item with the new value", () => {
    const state = DataServiceStateRecord({
      items: Map({
        [model.id]: model,
      }),
    });

    const action: IAction<ISetField<any>, any> = {
      type: `${serviceName}/SET_RELATIONSHIP`,
      payload: {
        id: model.id,
        fieldName: "poultryCollection",
        value: "Chicken",
      },
      meta: {},
      invoke: spy(),
    };
    const newState = setRelationshipReducer(state, action);
    const updatedItem = newState
      .get("items", null)
      .get(model.id) as any;

    const updatedItemRelationship = updatedItem.relatedModels[action.payload.fieldName];

    expect(updatedItemRelationship).to.equal(action.payload.value);
  });

  it("should not set the relationships on the record items when id not found", () => {
    const state = DataServiceStateRecord({
      items: Map({
        [model.id]: model,
      }),
    });
    
    const action = {
      type: `${serviceName}/SET_RELATIONSHIP`,
      payload: {
        id: "not likely to exist",
        fieldName: "singerCollection",
        value: "Sir Elton",
      },
      meta: {},
      invoke: spy(),
    };

    const newState = setRelationshipReducer(state, action);

    expect(setRecordSpy.calledWith("items")).to.be.false;
  });

  it("should update items with relationships id found in items", () => {
    const state = DataServiceStateRecord({
      items: Map({
        [model.id]: model,
      }),
    });

    const action = {
      type: `${serviceName}/SET_RELATIONSHIP`,
      payload: {
        id: model.id,
        fieldName: "vaderCollection",
        value: "Darth",
      },
      meta: {},
      invoke: spy(),
    };

    const newState = setRelationshipReducer(state, action);
    const newModel = newState.items.get(model.id) as any;

    const newRelatedModel = newModel.relatedModels[action.payload.fieldName];
    expect(newRelatedModel)
      .to.equal(action.payload.value);
  });
});
