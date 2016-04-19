import tree_add from "./add";
import tree_visit from "./visit";
import tree_visitAfter from "./visitAfter";
import tree_find from "./find";
import tree_remove from "./remove";

export default function quadtree(x0, y0, x1, y1) {
  if (arguments.length === 2) x1 = x0, y1 = y0, x0 = y0 = 0;
  return new Quadtree(x0, y0, x1, y1);
}

function Quadtree(x0, y0, x1, y1) {
  var dx = (x1 = +x1) - (x0 = +x0), dy = (y1 = +y1) - (y0 = +y0);
  if (dy > dx) x1 = (x0 -= (dy - dx) / 2) + dy;
  else y1 = (y0 -= (dx - dy) / 2) + dx;
  this.x0 = x0, this.y0 = y0;
  this.x1 = x1, this.y1 = y1;
  this.root = undefined;
}

var treeProto = Quadtree.prototype = quadtree.prototype;
treeProto.add = tree_add;
treeProto.visit = tree_visit;
treeProto.visitAfter = tree_visitAfter;
treeProto.find = tree_find;
treeProto.remove = tree_remove;
