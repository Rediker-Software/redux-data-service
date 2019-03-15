// tslint:disable no-unused-expression

import { stub, spy } from "sinon";
import { lorem, random } from "faker";

import { createRecordEpic } from "./CreateRecordEpic";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("CreateRecordEpic", () => {


  beforeEach(() => {

  });

  it("needs a test", () => {
    expect(false).to.be.true;
  });

  it("createRecordEpic should call normalize after deserialize", () => {
    const onSuccess = spy();
    const expectedResult = { fullText: "zella puppy" };
    const createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess });
    const normalizeStub = stub(fakeService.mapper, "normalize");

    stub(fakeService.serializer, "deserialize").returns(expectedResult);

    fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
      .subscribe(noop, noop,
        () => {
          expect(normalizeStub.firstCall.args[0]).to.equal(expectedResult);
        });
  });

  it("createRecordEpic should serialize the result from transform", () => {
    const onSuccess = spy();
    const expectedResult = { fullText: "zella puppy transform" };
    const createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess });

    stub(fakeService.mapper, "transform").returns(expectedResult);
    const serialStub = stub(fakeService.serializer, "serialize");

    fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
      .subscribe(noop, noop,
        () => {
          expect(serialStub.firstCall.args[0]).to.equal(expectedResult);
        });
  });

  it("createRecordEpic should call transform before serialize", () => {
    const onSuccess = spy();
    const expectedResult = fakeModels[0];
    const createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess });
    const transformStub = stub(fakeService.mapper, "transform");

    fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
      .subscribe(noop, noop,
        () => {
          expect(transformStub.firstCall.args[0]).to.equal(expectedResult);
        });
  });

  it("should fire the onSuccess callback with response", () => {
    const onSuccess = spy();
    const expectedResult = { fullText: "puppy" };
    const createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess });

    stub(fakeService.mapper, "normalize").returns(expectedResult);

    fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
      .subscribe(noop, noop,
        () => {
          expect(onSuccess.calledWithMatch(expectedResult)).to.be.true;
        });
  });

  it("should fire pushRecord with response", () => {
    const onSuccess = spy();
    const expectedResult = { fullText: "puppy" };
    const createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess });
    const pushRecordAction = stub(fakeService.actions, "pushRecord");

    stub(fakeService.mapper, "normalize").returns(expectedResult);

    fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
      .subscribe(noop, noop,
        () => {
          expect(pushRecordAction.calledWithMatch(expectedResult)).to.be.true;
        });
  });

  it("should use the store's getState() method", () => {
    const expectedResult = { id: "123" };
    const createRecordAction = fakeService.actions.createRecord(expectedResult);
    stub(fakeService.actions, "pushRecord");
    mockAdapter.updateItem.returns(Observable.of(expectedResult));

    const stubGetState = stub(store, "getState");

    fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
      .subscribe(noop, noop,
        () => {
          expect(stubGetState.callCount).to.equal(1);
        });
  });

});
