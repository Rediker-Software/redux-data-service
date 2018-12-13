import { MockAdapter } from "./Adapters/MockAdapter";
import { RestAdapter } from "./Adapters/RestAdapter";
import { configure, getConfiguration } from "./Configure";
import { RestSerializer } from "./Serializers/RestSerializer";
import { MockSerializer } from "./Serializers/MockSerializer";
import { Mapper } from "./Mapper/Mapper";
import { MockMapper } from "./Mapper/MockMapper";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("Configure", () => {

  it("uses the RestSerializer in the configuration by default when no Serializer is specified", () => {
    configure({ modules: null });
    const config = getConfiguration();
    expect(config.serializer).to.equal(RestSerializer);
  });

  it("uses the provided Serializer in the configuration", () => {
    configure({ modules: null, serializer: MockSerializer });
    const config = getConfiguration();
    expect(config.serializer).to.equal(MockSerializer);
  });

  it("uses the RestAdapter in the configuration by default when no Adapter is specified", () => {
    configure({ modules: null });
    const config = getConfiguration();
    expect(config.adapter).to.equal(RestAdapter);
  });

  it("uses the provided Adapter in the configuration", () => {
    configure({ modules: null, adapter: MockAdapter });
    const config = getConfiguration();
    expect(config.adapter).to.equal(MockAdapter);
  });

  it("uses the Mapper in the configuration by default when no Mapper is specified", () => {
    configure({ modules: null });
    const config = getConfiguration();
    expect(config.mapper).to.equal(Mapper);
  });

  it("uses the provided Mapper in the configuration", () => {
    configure({ modules: null, mapper: MockMapper });
    const config = getConfiguration();
    expect(config.mapper).to.equal(MockMapper);
  });

});
