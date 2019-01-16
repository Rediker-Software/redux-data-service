import { useFakeXMLHttpRequest } from "sinon";

let _FakedXHRHistory = [];
let _FakeXHR;

/** Stub all XHR requests via Sinon */
export function stubXHR() {
  _FakeXHR = useFakeXMLHttpRequest();
  _FakedXHRHistory = [];
  _FakeXHR.onCreate = (xhr) => {
    console.log("xhr onCreate", xhr);
    _FakedXHRHistory.push(xhr);
  };
}

export function getFakeXHR() {
  return _FakeXHR;
}

export function getFakedXHRHistory() {
  return _FakedXHRHistory;
}
