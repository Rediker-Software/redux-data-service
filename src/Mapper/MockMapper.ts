import { IMapper } from "./IMapper";

export class MockMapper implements IMapper<any> {
  public async transform(model) {
    return model;
  }

  public async normalize(data) {
    return data;
  }  

  public async normalizeQueryResponse(data) {
    return data;
  }
}
