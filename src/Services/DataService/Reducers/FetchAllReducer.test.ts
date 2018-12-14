// // tslint:disable:no-empty max-classes-per-file no-unused-expression
// import { match, spy, stub } from "sinon";
// import { ActionsObservable } from "redux-observable";
// import { Observable } from "rxjs/Observable";
// import "rxjs/add/observable/of";
// import { Subject } from "rxjs/Subject";
//
// import { Map, Record } from "immutable";
// import { createMockStore } from "redux-test-utils";
// import hash from "object-hash";
//
// import { createMockServiceState } from "../../TestUtils";
// import { IModelMeta } from "../../Model";
// import { createMockFakeModel, createMockFakeModels, FakeModel, IFakeModelData } from "../../Model/Model.mock";
// import { MockAdapter } from "../../Adapters/MockAdapter";
// import { MockMapper } from "../../Mapper/MockMapper";
// import { MockSerializer } from "../../Serializers";
// import { configure } from "../../Configure";
//
// import { DataService, IDataServiceState, IRequestCacheKey } from "./";
// import { BaseService } from "../BaseService";
// import { registerService } from "../ServiceProvider";
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
//   describe("pushAllReducer", () => {
//     it("updates the state's requestCache, after the pushAllReducer fires", () => {
//       const queryParams = { fakeField: "fakeVal" };
//
//       const updatedState: IDataServiceState<any> =
//         fakeService.pushAllReducer(state.fakeModel, fakeService.actions.pushAll({ items: fakeModels }, { queryParams }));
//
//       const cachedRequest = updatedState.requestCache.get(hash(queryParams || {}) as IRequestCacheKey);
//       expect(cachedRequest.toJS()).to.deep.equal(
//         { ids: fakeModels.map((x) => x.id), isLoading: false, errors: null },
//         "cached request value is properly initilized");
//     });
//   });
//
// });
