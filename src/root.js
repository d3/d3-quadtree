import add from "./add";
import {eachAfter, eachBefore} from "./each";
// import root_find from "./find";

export default function Root() {
  this._x0 =
  this._y0 =
  this._x1 =
  this._y1 = NaN;
  this._root = null;
}

var rootProto = Root.prototype;
rootProto.add = add;
rootProto.eachAfter = eachAfter;
rootProto.eachBefore = eachBefore;
// rootProto.find = root_find;
