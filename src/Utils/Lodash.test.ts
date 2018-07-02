import { flattenObjectKeys, mapValuesWithKeys } from "./Lodash";
import { lorem, random } from "faker";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("Lodash FP", () => {

  describe("mapValuesWithKeys", () => {
    it("it includes the key when mapping values using fp syntax", () => {
      const hello = random.number();
      const world = random.number();

      const example = { hello, world };
      const output = mapValuesWithKeys(
        (value, key) => value + key,
      )(example);

      expect(output).to.deep.equal({
        hello: hello + "hello",
        world: world + "world",
      });
    });
  });

  describe("flattenObjectKeys", () => {
    let example;
    let b;
    let c;
    let x;
    let y;
    let name;

    beforeEach(() => {
      b = random.number();
      c = random.number();
      x = lorem.word();
      y = lorem.word();
      name = lorem.word();

      example = {
        a: {
          b,
          c,
          d: {
            x,
            y,
          },
        },
        name,
      };
    });

    it("flattens the keys of an an object's children onto a copy of the parent object", () => {
      const output = flattenObjectKeys(example);

      expect(output).to.deep.equal({
        "a.b": b,
        "a.c": c,
        "a.d": {
          x,
          y,
        },
        name,
      });
    });

    it("does not mutate the parent object", () => {
      const output = flattenObjectKeys(example);
      expect(example).to.not.equal(output);
    });
  });
});
