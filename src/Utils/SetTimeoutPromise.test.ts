import { random } from "faker";

import { setTimeoutPromise } from "./SetTimeoutPromise";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("setTimeoutPromise", () => {

  it("returns a promise which is resolved with the result of the callback", async () => {
    const expectedValue = random.word();
    const result = await setTimeoutPromise(() => expectedValue);

    expect(result).to.equal(expectedValue);
  });

  it("rejects the promise if the callback throws", async () => {
    return new Promise((resolve) => {
      const promise = setTimeoutPromise(() => {
        throw new Error();
      });

      promise.catch(() => resolve());
    });
  });

});
