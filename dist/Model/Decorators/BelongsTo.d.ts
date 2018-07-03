import { IDecorator } from "./IDecorator";
import { IRelationship, IRelationshipOptions } from "./Relationship";
export declare function belongsTo(options?: IRelationshipOptions): IDecorator<IRelationship>;
