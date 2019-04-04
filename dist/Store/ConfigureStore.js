"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_observable_1 = require("redux-observable");
var Middleware_1 = require("./Middleware");
exports.configureStore = function (reducers, epics) {
    var rootEpic = function (action$, store, d) {
        return redux_observable_1.combineEpics.apply(void 0, epics)(action$, store, d)
            .takeUntil(action$.ofType("DESTROY_ALL").do(function () {
            Object.keys(store.getState()).forEach(function (key) { return store.dispatch({ type: key + "/UNLOAD_ALL" }); });
        }));
    };
    var middleware = redux_1.applyMiddleware(Middleware_1.loggerMiddleware, redux_observable_1.createEpicMiddleware(rootEpic));
    if (process.env.NODE_ENV === "development") {
        middleware = redux_devtools_extension_1.composeWithDevTools(middleware);
    }
    return redux_1.createStore(redux_1.combineReducers(reducers), middleware);
};
