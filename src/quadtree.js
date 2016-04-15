import tree_add from "./add";
import tree_eachAfter from "./eachAfter";
import tree_eachBefore from "./eachBefore";
import tree_find from "./find";
import tree_remove from "./remove";

export default function quadtree(x0, y0, x1, y1) {
  return new Quadtree(x0, y0, x1, y1);
}

function Quadtree(x0, y0, x1, y1) {
  var dx = (x1 = +x1) - (x0 = +x0), dy = (y1 = +y1) - (y0 = +y0);
  if (dy > dx) x1 = (x0 -= (dy - dx) / 2) + dy;
  else y1 = (y0 -= (dx - dy) / 2) + dx;
  this._x0 = x0, this._y0 = y0;
  this._x1 = x1, this._y1 = y1;
  this._root = isNaN(dx) || isNaN(dy) ? null : new Array(4);
}

var treeProto = Quadtree.prototype = quadtree.prototype;
treeProto.add = tree_add;
treeProto.eachAfter = tree_eachAfter;
treeProto.eachBefore = tree_eachBefore;
treeProto.find = tree_find;
treeProto.remove = tree_remove;
