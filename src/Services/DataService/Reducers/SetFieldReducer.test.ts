// // tslint:disable:no-empty max-classes-per-file no-unused-expression
// import { match, spy, stub } from "sinon";
// import "rxjs/add/observable/of";
//
// import { Map, Record } from "immutable";
// import { createMockStore } from "redux-test-utils";
//
// import { createMockServiceState } from "../../../TestUtils";
// import { IModelMeta } from "../../../Model";
// import { createMockFakeModels, FakeModel, IFakeModelData } from "../../../Model/Model.mock";
// import { MockAdapter } from "../../../Adapters/MockAdapter";
// import { MockMapper } from "../../../Mapper/MockMapper";
// import { MockSerializer } from "../../../Serializers";
// import { configure } from "../../../Configure";
//
// import { DataService } from "./";
// import { registerService } from "../../ServiceProvider";
//
// declare var intern;
// const { describe, it, beforeEach, afterEach } = intern.getPlugin("interface.bdd");
// const { expect } = intern.getPlugin("chai");
//
// const noop = () => null;
//
// describe("DataService", () => {
//   let fakeService;
//   let mockAdapter;
//   let store;
//   let fakeModels;
//   let state;
//   const serviceName = "fakeModel";
//   let mockMapper;
//   let mockSerializer;
//
//   beforeEach(() => {
//     configure({ modules: null });
//     mockAdapter = new MockAdapter();
//     mockMapper = new MockMapper();
//     mockSerializer = new MockSerializer();
//
//     class FakeService extends DataService<IFakeModelData> {
//       public name = serviceName;
//       public ModelClass = FakeModel;
//       protected _adapter = mockAdapter;
//       protected _mapper = mockMapper;
//       protected _serializer = mockSerializer;
//     }
//
//     fakeService = new FakeService();
//     registerService(fakeService);
//
//     fakeModels = createMockFakeModels();
//
//     state = createMockServiceState<IFakeModelData>(fakeService, [
//       fakeService.actions.pushAll({ items: fakeModels }),
//     ]);
//     store = createMockStore(state);
//   });
//
//   it("has a reducer for setting the field of a record", () => {
//     expect(fakeService.setFieldReducer).to.be.a("function");
//   });
//
//   describe("setFieldReducer", () => {
//     let setRecordSpy;
//
//     beforeEach(() => {
//       setRecordSpy = spy(Record.prototype, "set");
//     });
//
//     afterEach(() => {
//       setRecordSpy.restore();
//     });
//
//     it("should set the field on the item with the new value", () => {
//       const modelData = {
//         id: "1",
//         fullText: "Egg",
//       };
//       const modelMeta = {} as IModelMeta<IFakeModelData>;
//       const model = new FakeModel(modelData, modelMeta);
//
//       const items = Map()
//         .set(modelData.id, model);
//
//       const stateRecord = Record({ items })();
//
//       const action = {
//         type: `${serviceName}/SET_FIELD`,
//         payload: {
//           id: modelData.id,
//           fieldName: "fullText",
//           value: "Chicken",
//         },
//         meta: {},
//       };
//
//       const sut = fakeService.setFieldReducer(stateRecord, action);
//       const updatedItem = sut
//         .get("items")
//         .get(modelData.id);
//
//       expect(updatedItem.fullText, action.payload.value).to.be.equal;
//     });
//
//     it("should not set the items on the record when id not found in items", () => {
//       const modelData = {
//         id: "1",
//         firstName: "Elton",
//       };
//       const modelMeta = {} as IModelMeta<IFakeModelData>;
//       const model = new FakeModel(modelData, modelMeta);
//
//       const items = Map()
//         .set(modelData.id, model);
//
//       const stateRecord = Record({ items })();
//
//       const action = {
//         type: `${serviceName}/SET_FIELD`,
//         payload: {
//           id: "not likely to exist",
//           fieldName: "firstName",
//           value: "Sir Elton",
//         },
//         meta: {},
//       };
//
//       const sut = fakeService.setFieldReducer(stateRecord, action);
//
//       expect(setRecordSpy.calledWith("items")).to.be.false;
//     });
//
//     it("should update items with updated record when id found in items", () => {
//       const modelData = {
//         id: "1",
//         fullText: "Anakin",
//       };
//       const modelMeta = { changes: null } as IModelMeta<IFakeModelData>;
//       const model = new FakeModel(modelData, modelMeta);
//
//       const items = Map()
//         .set(modelData.id, model);
//
//       const stateRecord = Record({ items })();
//
//       const action = {
//         type: `${serviceName}/SET_FIELD`,
//         payload: {
//           id: modelData.id,
//           fieldName: "fullText",
//           value: "Darth",
//         },
//         meta: {},
//       };
//
//       const sut = fakeService.setFieldReducer(stateRecord, action);
//
//       expect(setRecordSpy.calledWith("items",
//         match((updatedItems) => {
//           const updatedModel = updatedItems.get(modelData.id);
//           return updatedModel.meta.changes.fullText === action.payload.value;
//         }))).to.be.true;
//     });
//   });
//
// });
