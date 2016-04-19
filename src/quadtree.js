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

function tree_copy() {
  var copy = new Quadtree(this.x0, this.y0, this.x1, this.y1),
      node = this.root,
      nodes,
      child;

  if (!node) return copy;
  if (node.point) return copy.root = leaf_copy(node), copy;

  nodes = [{source: node, target: copy.root = new Array(4)}];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.point) node.target[i] = leaf_copy(child);
        else nodes.push({source: child, target: node.target[i] = new Array(4)});
      }
    }
  }

  return copy;
}

function leaf_copy(leaf) {
  var copy = {point: leaf.point}, next = copy;
  while (leaf = leaf.next) next = next.next = {point: leaf.point};
  return copy;
}

var treeProto = Quadtree.prototype = quadtree.prototype;
treeProto.add = tree_add;
treeProto.visit = tree_visit;
treeProto.visitAfter = tree_visitAfter;
treeProto.find = tree_find;
treeProto.remove = tree_remove;
treeProto.copy = tree_copy;
