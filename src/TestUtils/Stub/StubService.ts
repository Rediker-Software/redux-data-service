import { isEmpty } from "lodash";
import { getDataService } from "../../Services";

/**
 * Attempts to stub a service
 *
 * @param moduleName name of module which will have its service stubbed
 * @returns stubMapEntry or undefined if nothing stubbed
 */
export function stubService(moduleName: string) {
  const service = getDataService(moduleName);
  const actionsToStub = ["fetchAll", "fetchRecord", "createRecord", "updateRecord", "patchRecord", "deleteRecord"];

  const stubActions = actionsToStub.reduce((actionStubMapEntry, fnNameToStub) => {
    const stubAction = tryStubAction(moduleName, service.actions, fnNameToStub);
    if (stubAction) { // if it successfully stubbed
      actionStubMapEntry[fnNameToStub] = stubAction;
    }
    return actionStubMapEntry;
  }, {});

  return isEmpty(stubActions) ? undefined : stubActions;
}
