import { IAction, IService } from "../../Services/IService";

/**
 * Creates a mock state object for the given service to plug it into a mock Redux store
 *
 * @see redux-test-utils/createMockStore
 *
 * @param {IService<T>} service
 * @param {IAction[]} actions
 * @returns any
 */
export function createMockServiceState<T>(service: IService<T>, actions: IAction[] = []) {
  let state = service.getDefaultState();

  actions.forEach((action) => {
    state = service.reducer(state, action);
  });

  return {
    [service.name]: state,
  };
}
