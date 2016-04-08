import root_add from "./add";
import root_each from "./each";
// import root_find from "./find";

export default function Root() {
  this._x0 =
  this._y0 =
  this._x1 =
  this._y1 = NaN;
  this._root = null;
}

var rootProto = Root.prototype;
rootProto.add = root_add;
rootProto.each = root_each;
// rootProto.find = root_find;
