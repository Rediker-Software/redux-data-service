// tslint:disable: max-classes-per-file no-unused-expression

import { spy, stub } from "sinon";
import { getEpics, getReducers, getService, initializeServices, registerService } from "./ServiceProvider";
import { IActionCreators, IActionEpic, IActionTypes, IReducer, ISelectors, IService } from "./IService";
import { Subject } from "rxjs/Subject";
import { initialize, resetInitializationStatus } from "../Initialize";
import { combineEpics } from "redux-observable";

declare var intern;
const { describe, it, beforeEach, afterEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("ServiceProvider", () => {

  describe("dependency injection", () => {
    let fakeService: IService<any>;

    beforeEach(() => {
      fakeService = {
        name: "fake",
        types: {},
        actions: {},
        reducer: spy(),
        epics: [],
        selectors: {},
        getDefaultState: () => ({
          hello: "world",
        }),
      };

      registerService(fakeService);
    });

    it("enables dependency injection by returning the requested service by its name", () => {
      const injectedService = getService("fake");
      expect(injectedService).to.equal(fakeService);
    });

    it("supports replacing a registered service with a mock version of it", () => {
      const mockFakeService = {
        name: "fake",
        types: {},
        actions: {},
        reducer: spy(),
        epics: [],
        selectors: {},
        getDefaultState: () => ({
          hello: "mock",
        }),
      };

      registerService(mockFakeService);

      const injectedService = getService("fake");
      expect(injectedService).to.equal(mockFakeService).but.to.not.equal(fakeService);
    });
  });

  describe("initializing services from modules", () => {

    it(`registers services from modules whose service class name is the module name + "Service"`, () => {
      class OrganizationTypeService implements IService<any> {
        public readonly name = "organizationType";

        public readonly actions: IActionCreators | {};
        public readonly epics: IActionEpic[];
        public getDefaultState: () => any;
        public readonly reducer: IReducer<any>;
        public readonly selectors: ISelectors;
        public readonly types: IActionTypes | {};
      }

      const modules = {
        organizationType: {
          OrganizationTypeService,
        },
      };

      initializeServices(modules);

      const service = getService("organizationType");
      expect(service).to.be.an.instanceOf(OrganizationTypeService);
    });

    it(`does not register classes which do not end in "Service"`, () => {
      class Model implements IService<any> {
        public readonly name = "organizationType";

        public readonly actions: IActionCreators | {};
        public readonly epics: IActionEpic[];
        public getDefaultState: () => any;
        public readonly reducer: IReducer<any>;
        public readonly selectors: ISelectors;
        public readonly types: IActionTypes | {};
      }

      const modules = {
        organizationType: {
          Model,
        },
      };

      initializeServices(modules);
      initialize();

      expect(() => getService("organizationType")).to.throw(ReferenceError, "not found");
    });

    it("does not throw if the application is still initializing", () => {
      resetInitializationStatus();
      expect(() => getService("lolCoolServiceBrah")).to.not.throw();
    });

    it("registers services from multiple modules", () => {
      class OrganizationTypeService implements IService<any> {
        public readonly name = "organizationType";

        public readonly actions: IActionCreators | {};
        public readonly epics: IActionEpic[];
        public getDefaultState: () => any;
        public readonly reducer: IReducer<any>;
        public readonly selectors: ISelectors;
        public readonly types: IActionTypes | {};
      }

      class StudentService implements IService<any> {
        public readonly name = "student";

        public readonly actions: IActionCreators | {};
        public readonly epics: IActionEpic[];
        public getDefaultState: () => any;
        public readonly reducer: IReducer<any>;
        public readonly selectors: ISelectors;
        public readonly types: IActionTypes | {};
      }

      const modules = {
        organizationType: {
          OrganizationTypeService,
        },
        student: {
          StudentService,
        },
      };

      initializeServices(modules);

      const service = getService("student");
      expect(service).to.be.an.instanceOf(StudentService);
    });

    it("registers services from modules even if some modules do not have Services", () => {
      class OrganizationTypeService implements IService<any> {
        public readonly name = "organizationType";

        public readonly actions: IActionCreators | {};
        public readonly epics: IActionEpic[];
        public getDefaultState: () => any;
        public readonly reducer: IReducer<any>;
        public readonly selectors: ISelectors;
        public readonly types: IActionTypes | {};
      }

      class StudentService implements IService<any> {
        public readonly name = "student";

        public readonly actions: IActionCreators | {};
        public readonly epics: IActionEpic[];
        public getDefaultState: () => any;
        public readonly reducer: IReducer<any>;
        public readonly selectors: ISelectors;
        public readonly types: IActionTypes | {};
      }

      const modules = {
        organization: {},
        organizationType: {
          OrganizationTypeService,
        },
        student: {
          StudentService,
        },
      };

      initializeServices(modules);

      const service = getService("student");
      expect(service).to.be.an.instanceOf(StudentService);
    });
  });

  describe("getReducers", () => {
    it("combines the reducers from each service to create a root reducer which can be passed into Redux", () => {
      const studentReducerStub = stub().returns({
        hello: "world",
      });
      const studentService = {
        name: "student",
        types: {},
        actions: {},
        reducer: studentReducerStub,
        epics: [],
        selectors: {},
        getDefaultState: () => ({}),
      };
      const organizationTypeReducerStub = stub().returns({
        types: [],
      });
      const organizationTypeService = {
        name: "organizationType",
        types: {},
        actions: {},
        reducer: organizationTypeReducerStub,
        epics: [],
        selectors: {},
        getDefaultState: () => ({}),
      };

      registerService(studentService);
      registerService(organizationTypeService);

      const reducers = getReducers();

      expect(reducers).to.deep.equal({
        student: studentReducerStub,
        organizationType: organizationTypeReducerStub,
      });
    });
  });

  describe("getEpics", () => {
    it("combines the epics from each service to create a root epic which can be passed into redux-observable", () => {
      const studentEpicStub = stub().returns(new Subject());
      const studentService = {
        name: "student",
        types: {},
        actions: {},
        reducer: () => ({}),
        epics: [studentEpicStub],
        selectors: {},
        getDefaultState: () => ({}),
      };
      const organizationTypeEpicStub = stub().returns(new Subject());
      const organizationTypeService = {
        name: "organizationType",
        types: {},
        actions: {},
        reducer: () => ({}),
        epics: [organizationTypeEpicStub],
        selectors: {},
        getDefaultState: () => ({}),
      };

      registerService(studentService);
      registerService(organizationTypeService);

      const rootEpic = combineEpics(...getEpics());
      rootEpic.call(rootEpic);

      expect(studentEpicStub.callCount).to.equal(1);
      expect(organizationTypeEpicStub.callCount).to.equal(1);
    });
  });

});
