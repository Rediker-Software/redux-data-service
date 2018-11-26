import { random } from "faker";
import { spy, useFakeXMLHttpRequest } from "sinon";
import { RestAdapter } from "./RestAdapter";

declare var intern;
const { describe, it, beforeEach, afterEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("RestAdapter", () => {
  const apiUrl = "http://www.example.com";
  const pathName = "test";
  const restUrl = `${apiUrl}/${pathName}`;
  let xhr;
  let restAdapter;

  beforeEach(() => {
    xhr = useFakeXMLHttpRequest();
    xhr.onCreate = spy();
    restAdapter = new RestAdapter(pathName, { apiUrl });
  });

  afterEach(() => xhr.restore());

  it("builds the URL of the endpoint", () => {
    expect(restAdapter.getRestURL()).to.equal(restUrl);
  });

  it("performs a fetchAll request", () => {
    restAdapter.fetchAll().subscribe(spy());
    expect(xhr.onCreate.callCount).to.equal(1, "it should send an xhr request");
    expect(xhr.onCreate.firstCall.args[0]).to.have.property("url").to.equal(restUrl, "it should send a request to the correct url");
    expect(xhr.onCreate.firstCall.args[0]).to.have.property("method").to.equal("GET", "it should send a request with the correct HTTP method");
  });

  it("performs a fetchAll request with the given query param", () => {
    restAdapter.fetchAll({ filter: "all" }).subscribe(spy());
    expect(xhr.onCreate.callCount).to.equal(1, "it should send an xhr request");
    expect(xhr.onCreate.firstCall.args[0]).to.have.property("url").to.equal(`${restUrl}?filter=all`, "it should send a request to the correct url");
    expect(xhr.onCreate.firstCall.args[0]).to.have.property("method").to.equal("GET", "it should send a request with the correct HTTP method");
  });

  it("performs a fetchAll request with multiple query params", () => {
    restAdapter.fetchAll({ filter: "all", hello: "world" }).subscribe(spy());
    expect(xhr.onCreate.callCount).to.equal(1, "it should send an xhr request");
    expect(xhr.onCreate.firstCall.args[0]).to.have.property("url").to.equal(`${restUrl}?filter=all&hello=world`, "it should send a request to the correct url");
    expect(xhr.onCreate.firstCall.args[0]).to.have.property("method").to.equal("GET", "it should send a request with the correct HTTP method");
  });

  it("performs a fetchItem request", () => {
    restAdapter.fetchItem("2").subscribe(spy());
    expect(xhr.onCreate.callCount).to.equal(1, "it should send an xhr request");
    expect(xhr.onCreate.firstCall.args[0]).to.have.property("url").to.equal(`${restUrl}/2`, "it should send a request to the correct url");
    expect(xhr.onCreate.firstCall.args[0]).to.have.property("method").to.equal("GET", "it should send a request with the correct HTTP method");
  });

  describe("getRestURL", () => {
    it("returns apiUrl/pathName when no id is passed", () => {
      expect(restAdapter.getRestURL()).to.equal(restUrl);
    });

    it("returns apiUrl/pathName/id when an id is passed", () => {
      const id = random.number();
      expect(restAdapter.getRestURL(id)).to.equal(`${restUrl}/${id}`);
    });
  });
});
