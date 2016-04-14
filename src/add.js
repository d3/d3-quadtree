import Leaf from "./leaf";

export default function(point) {
  if (isNaN(x = +point[0]) || isNaN(y = +point[1])) return this; // ignore invalid points

  var point0,
      node = this._root,
      parent,
      grandparent,
      x, y,
      xm, ym,
      xp, yp,
      x0 = this._x0, y0 = this._y0,
      x1 = this._x1, y1 = this._y1,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) {
    this._root = new Leaf(point);
    this._x0 = this._x1 = x;
    this._y0 = this._y1 = y;
    return this;
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
  } while (grandparent = parent, parent = node, node = node[j = i, i = bottom << 1 | right]);

  // If the new point is in an empty node, just add it.
  if (!(point0 = parent.point)) parent[i] = new Leaf(point);

  // Or if the new point is exactly coincident with the specified point, add it.
  else if (xp = point0[0], yp = point0[1], x === xp && y === yp) point.next = point0, parent.point = point;

  // Otherwise, split the leaf node until the old and new point are separated.
  else {
    node = parent, parent = grandparent[j] = new Array(4);
    while (i === (j = (yp >= ym) << 1 | (xp >= xm))) {
      parent = parent[i] = new Array(4);
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
      i = bottom << 1 | right;
    }

    parent[i] = new Leaf(point);
    parent[j] = node;
  }

  return this;
}
