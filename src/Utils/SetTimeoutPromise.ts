/**
 * Calls `setTimeout` with the given `callback` function for the given `delay` in milliseconds
 * and returns a promise.
 *
 * The promise will resolve with the value returned from the callback if it succeeds;
 * it will reject with an Error if one is thrown.
 */
export async function setTimeoutPromise<T = void>(callback: () => T, delay: number = 0): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = callback();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    }, delay);
  });
}
