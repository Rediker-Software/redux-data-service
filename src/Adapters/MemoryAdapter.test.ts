import { random } from "faker";
import { spy, stub } from "sinon";

import { getDataService } from "../Services";

import {
  fakeModelModule,
  initializeTestServices,
  seedService,
} from "../TestUtils";

import { MemoryAdapter } from "./MemoryAdapter";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("MemoryAdapter", () => {
  const serviceName = "fakeModel";
  let memoryAdapter;

  beforeEach(() => {
    initializeTestServices(fakeModelModule);
    memoryAdapter = new MemoryAdapter(serviceName);
  });

  describe("fetchAll", () => {

    it("seeds 20 items", () => {
      return new Promise((resolve, reject) => {
        try {
          memoryAdapter
            .fetchAll()
            .take(1)
            .subscribe(({ items }) => {

              expect(items)
                .to.have.length(20);

              resolve();
            });
        } catch (e) {
          reject(e);
        }
      });
    });

  });

  describe("fetchItem", () => {

    it("seeds the requested item with the given id", () => {
      const fakeModelService = getDataService(serviceName);
      const stubPushRecord = stub(fakeModelService.actions, "pushRecord").returns({ invoke: spy() });

      const fakeId = random.number().toString();
      memoryAdapter.fetchItem(fakeId);

      expect(stubPushRecord.firstCall.args[0])
        .to.have.property("id")
        .to.equal(fakeId);
    });

    it("returns an observable with the model data of the seeded item", () => {
      const fakeModelService = getDataService(serviceName);
      const stubPushRecord = stub(fakeModelService.actions, "pushRecord").callThrough();
      const fakeId = random.number().toString();

      const fetchItem$ = memoryAdapter.fetchItem(fakeId);
      const item = stubPushRecord.firstCall.args[0];

      let fetchItemResponse;
      fetchItem$
        .take(1)
        .subscribe(response => fetchItemResponse = response);

      expect(fetchItemResponse)
        .to.deep.equal(item.modelData);
    });

  });

  describe("createItem", () => {

    it("seeds a new item with the modelData it was given", () => {
      const fakeModelService = getDataService(serviceName);
      const stubPushRecord = stub(fakeModelService.actions, "pushRecord").returns({ invoke: spy() });

      const fakeItem = seedService(serviceName) as any;
      memoryAdapter.createItem(fakeItem);

      expect(stubPushRecord.firstCall.args[0])
        .to.deep.contain(fakeItem.modelData);
    });

    it("returns an observable with the model data of the newly seeded item", () => {
      const fakeModelService = getDataService(serviceName);
      const stubPushRecord = stub(fakeModelService.actions, "pushRecord").callThrough();

      const fakeItem = seedService(serviceName) as any;
      const createItem$ = memoryAdapter.createItem(fakeItem);
      const item = stubPushRecord.firstCall.args[0];

      let createItemResponse;
      createItem$
        .take(1)
        .subscribe(response => createItemResponse = response);

      expect(createItemResponse)
        .to.deep.contain(item.modelData);
    });

  });

  describe("updateItem", () => {

    it("returns an observable with the model data it was given", () => {
      const fakeItem = seedService(serviceName) as any;
      const fakeItemData = fakeItem.modelData;
      const updateItem$ = memoryAdapter.updateItem(fakeItemData.id, fakeItemData);

      let updateItemResponse;
      updateItem$
        .take(1)
        .subscribe(response => updateItemResponse = response);

      expect(updateItemResponse)
        .to.deep.contain(fakeItemData);
    });

  });

  describe("patchItem", () => {

    it("returns an observable with the model data it was given", () => {
      const fakeItem = seedService(serviceName) as any;
      const fakeItemData = fakeItem.modelData;
      const patchItem$ = memoryAdapter.patchItem(fakeItemData.id, fakeItemData);

      let patchItemResponse;
      patchItem$
        .take(1)
        .subscribe(response => patchItemResponse = response);

      expect(patchItemResponse)
        .to.deep.contain(fakeItemData);
    });

  });

  describe("deleteItem", () => {

    it("returns an observable with the given id", () => {
      const fakeId = random.number().toString();
      const deleteItem$ = memoryAdapter.deleteItem(fakeId);

      let deleteItemResponse;
      deleteItem$
        .take(1)
        .subscribe(response => deleteItemResponse = response);

      expect(deleteItemResponse)
        .to.have.property("id")
        .to.equal(fakeId);
    });

    it("returns an observable with a dateDeleted value set to a Date", () => {
      const fakeId = random.number().toString();
      const deleteItem$ = memoryAdapter.deleteItem(fakeId);

      let deleteItemResponse;
      deleteItem$
        .take(1)
        .subscribe(response => deleteItemResponse = response);

      expect(deleteItemResponse)
        .to.have.property("dateDeleted")
        .to.be.an.instanceof(Date);
    });

  });
});
