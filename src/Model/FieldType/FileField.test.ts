/* tslint:disable: no-unused-expression */

import { FileField } from "./FileField";

import { random } from "faker";

declare var intern;
const { describe, it, before } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

const fileData = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAA1JREFUCB1jYGBg+A8AAQQBAB5znEAAAAAASUVORK5CYII=";

describe("FieldType: FileField", () => {

  it("considers null to be a valid type", () => {
    const value = null;
    expect(FileField.isValidType(value)).to.be.true;
  });

  it("considers a File to be a valid type", () => {
    const value = new File([], "file");
    expect(FileField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-file to be a valid type", () => {
    const value = 7;
    expect(FileField.isValidType(value)).to.be.false;
  });

  it("transforms a File into a byte array", async () => {
    // convert base64 value into a file
    const file = new File([atob(fileData)], "dot.png", { type: "image/png" });

    const encodedValue = await FileField.transform(file);
    expect(encodedValue).to.deep.equal([
      194, 137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 195, 132, 194, 137, 0, 0, 0, 4, 103, 65,
      77, 65, 0, 0, 194, 177, 194, 143, 11, 195, 188, 97, 5, 0, 0, 0, 13, 73, 68, 65, 84, 8, 29, 99, 96, 96, 96, 195, 184, 15, 0, 1, 4, 1, 0, 30, 115, 194, 156,
      64, 0, 0, 0, 0, 73, 69, 78, 68, 194, 174, 66, 96, 194, 130,
    ]);
  });

  it("should be serialized", () => {
    expect(FileField.serialize).to.be.true;
  });

  describe("normalize", () => {

    it("normalizes a File by returning the given value", async () => {
      const serializedValue = random.word();

      expect(await FileField.normalize(serializedValue)).to.equal(serializedValue);
    });

  });

});
