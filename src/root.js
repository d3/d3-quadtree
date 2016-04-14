import root_add from "./add";
import root_eachAfter from "./eachAfter";
import root_eachBefore from "./eachBefore";
import root_find from "./find";
import root_remove from "./remove";

export default function Root() {
  this._x0 =
  this._y0 =
  this._x1 =
  this._y1 = NaN;
  this._root = null;
}

var rootProto = Root.prototype;
rootProto.add = root_add;
rootProto.eachAfter = root_eachAfter;
rootProto.eachBefore = root_eachBefore;
rootProto.find = root_find;
rootProto.remove = root_remove;
