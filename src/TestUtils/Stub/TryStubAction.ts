import { spy, stub } from "sinon";
import { IAction } from "../../Services";

/**
 * Attempts to stub a method on an object if that method exists, stub returns a valid IAction
 *
 * @param moduleName Name of module this stub is acting on
 * @param obj Object to stub
 * @param methodName method in object to stub
 * @returns Sinon stub if methodName in obj otherwise undefined
 */
export function tryStubAction(moduleName: string, obj: any, methodName: string) {
  if (methodName in obj) {
    const invokeSpy = spy();
    const mainStub = stub(obj, methodName).callsFake((payload, meta) => {
      return ({
        invoke: invokeSpy,
        type: `${moduleName}/${methodName}`,
        payload,
        meta,
      } as IAction);
    });
    return { base: mainStub, invokeSpy };
  }
}
