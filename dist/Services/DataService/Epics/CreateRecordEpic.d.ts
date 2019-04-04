import "rxjs/add/operator/catch";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mapTo";
import "rxjs/add/operator/skipUntil";
import "rxjs/add/operator/take";
import { IContext } from "../Interfaces/IContext";
export declare const createRecordEpic: ({ actions, adapter, mapper, name, serializer, types }: IContext) => any;
