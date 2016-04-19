import tree_add from "./add";
import tree_cover from "./cover";
import tree_extent from "./extent";
import tree_find from "./find";
import tree_points from "./points";
import tree_remove from "./remove";
import tree_root from "./root";
import tree_size from "./size";
import tree_visit from "./visit";
import tree_visitAfter from "./visitAfter";

export default function quadtree() {
  return new Quadtree;
}

function Quadtree(x0, y0, x1, y1) {
  this._x0 = +x0;
  this._y0 = +y0;
  this._x1 = +x1;
  this._y1 = +y1;
  this._root = undefined;
}

function leaf_copy(leaf) {
  var copy = [leaf[0], leaf[1]], next = copy;
  while (leaf = leaf.next) next = next.next = [leaf[0], leaf[1]];
  return copy;
}

var treeProto = quadtree.prototype = Quadtree.prototype;

treeProto.copy = function() {
  var copy = new Quadtree(this._x0, this._y0, this._x1, this._y1),
      node = this._root,
      nodes,
      child;

  if (!node) return copy;

  if (node.length === 2) return copy._root = leaf_copy(node), copy;

  nodes = [{source: node, target: copy._root = new Array(4)}];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length === 4) nodes.push({source: child, target: node.target[i] = new Array(4)});
        else node.target[i] = leaf_copy(child);
      }
    }
  }

  return copy;
};

treeProto.add = tree_add;
treeProto.cover = tree_cover;
treeProto.extent = tree_extent;
treeProto.find = tree_find;
treeProto.points = tree_points;
treeProto.remove = tree_remove;
treeProto.root = tree_root;
treeProto.size = tree_size;
treeProto.visit = tree_visit;
treeProto.visitAfter = tree_visitAfter;
