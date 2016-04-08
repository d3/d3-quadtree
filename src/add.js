import Leaf from "./leaf";

export default function(point) {
  if (isNaN(x = point[0]) || isNaN(y = point[1])) return; // ignore invalid points

  var point0,
      node = this._root,
      parent,
      grandparent,
      x,
      y,
      xm,
      ym,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      right,
      bottom,
      i,
      i0;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) {
    this._root = new Leaf(point);
    this._x0 = this._x1 = x;
    this._y0 = this._y1 = y;
    return;
  }

  // Expand the tree to cover the new point, if necessary.
  if (x0 > x || x > x1 || y0 > y || y > y1) {
    xm = x0 === x1 ? Math.max(Math.abs(x0 - x), Math.abs(y0 - y)) : (x1 - x0) * 2;
    switch (i = (y < (y0 + y1) / 2) << 1 | (x < (x0 + x1) / 2)) {
      case 0: do parent = new Array(4), parent[i] = node, node = parent, x1 = x0 + xm, y1 = y0 + xm, xm *= 2; while (x > x1 || y > y1); break;
      case 1: do parent = new Array(4), parent[i] = node, node = parent, x0 = x1 - xm, y1 = y0 + xm, xm *= 2; while (x0 > x || y > y1); break;
      case 2: do parent = new Array(4), parent[i] = node, node = parent, x1 = x0 + xm, y0 = y1 - xm, xm *= 2; while (x > x1 || y0 > y); break;
      case 3: do parent = new Array(4), parent[i] = node, node = parent, x0 = x1 - xm, y0 = y1 - xm, xm *= 2; while (x0 > x || y0 > y); break;
    }
    this._root = node;
    this._x0 = x0, this._x1 = x1;
    this._y0 = y0, this._y1 = y1;
  }

  // Find the appropriate leaf node for the new point.
  do {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    grandparent = parent, parent = node, node = node[i0 = i, i = bottom << 1 | right];
  } while (node);

  // If the new point is in an empty node, just add it.
  if (!(point0 = parent.point)) return void (parent[i] = new Leaf(point));

  // If the new point is exactly coincident with the specified point, add it.
  if (x === point0[0] && y === point0[1]) {
    point.next = point0;
    parent.point = point;
    return;
  }

  // Otherwise, split the leaf node until the old and new point are separated.
  parent = grandparent[i0] = new Array(4);
  while (i === (i0 = (point0[1] >= ym) << 1 | (point0[0] >= xm))) {
    parent = parent[i] = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    i = bottom << 1 | right;
  }

  parent[i0] = new Leaf(point0);
  parent[i] = new Leaf(point);
}
