"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createMockServiceState(service, actions) {
    if (actions === void 0) { actions = []; }
    var _a;
    var state = service.getDefaultState();
    actions.forEach(function (action) {
        state = service.reducer(state, action);
    });
    return _a = {},
        _a[service.name] = state,
        _a;
}
exports.createMockServiceState = createMockServiceState;
