import { getNestedFieldName } from "./String";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("String utils", () => {

  describe("getNestedFieldName", () => {
    it("returns the last item at the end of a dot-notated string", () => {
      const example = "a.b.c";
      const output = getNestedFieldName(example);

      expect(output).to.equal("c");
    });
  });
});
