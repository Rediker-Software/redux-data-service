import { stub } from "sinon";
import { of as of$ } from "rxjs/observable/of";
import { IMapper } from "./IMapper";

export class MockMapper implements IMapper<any> {
  public transform = stub().callsFake(model =>
    of$({
      ...model,
    }),
  );

  public normalize = stub().callsFake(data =>
    of$({
      data,
    }),
  );
}
