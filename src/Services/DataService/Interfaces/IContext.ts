import { IActionCreators, IActionTypes } from "../../IService";
import { ISerializer } from "../../../Serializers";
import { IMapper } from "../../../Mapper";
import { IAdapter } from "../../../Adapters";

export interface IContext {
  readonly name: string;
  readonly types: IActionTypes;
  readonly actions: IActionCreators;
  readonly serializer: ISerializer<any>;
  readonly mapper: IMapper<any>;
  readonly adapter: IAdapter<any>;
}
