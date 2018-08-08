import { addPenultimateFieldToPath, getNestedFieldName } from "./String";

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

  describe("addPenultimateFieldToPath", () => {
    it("adds the given string as the second to last value in the given string path, returned as an array", () => {
      const example = "a.b.c";
      const output = addPenultimateFieldToPath(example, "x");

      expect(output).to.deep.equal(["a", "b", "x", "c"]);
    });
  });
});
