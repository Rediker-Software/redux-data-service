import * as Initializers from "./Initializers";
import { forEach } from "lodash";

let initializationComplete = false;

/**
 * Determine if the application's initializers have been fired yet.
 *
 * @returns {boolean}
 */
export const isApplicationInitialized = () => initializationComplete;

/**
 * Reset the application's initialization status.
 *
 * @returns {boolean}
 */
export const resetInitializationStatus = () => initializationComplete = false;

export const makeInitialize = (initializers) => () => {
  forEach(initializers, (initializer, name) => {
    if (name.startsWith("initialize")) {
      initializer();
    }
  });

  initializationComplete = true;
};

/**
 * Initializers are fired once when the app boots up, providing a useful hook for initializing the application.
 * For instance, if a third-party dependency needs some initial setup, create an initializer in the Initializers directory.
 *
 * Every function exported from the Initializers directory whose name starts with "initialize" will be executed.
 *
 */
export const initialize = makeInitialize(Initializers);
