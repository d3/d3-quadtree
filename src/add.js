var maxDepth = 64;

export default function(x, y, data) {
  if (isNaN(x = +x) || isNaN(y = +y)) return; // ignore invalid points

  var point = [x, y],
      point0,
      node = this._root,
      parent,
      depth = 0,
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

  if (data != null) point.data = data;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) {
    this._root = leaf(point)
    this._x0 = this._x1 = x;
    this._y0 = this._y1 = y;
    return;
  }

  // If the new point is outside the existing bounds of the tree…
  if (x0 > x || x >= x1 || y0 > y || y >= y1) {

    // If the tree only contains coincident points so far…
    // Note that if the points have the same x-coordinate but different y,
    // the bounds are squarified, and this tests exact coincidence!
    if (x0 === x1) {

      // If the root point is coincident with the new point, just add it.
      if (x === x0 && y === y0) {
        point.next = this._root.point;
        this._root.point = point;
        return;
      }

      // Otherwise wrap expand the tree to cover the first non-coincident point,
      // making sure that the bounds are squarified.
      xm = Math.max(Math.abs(x0 - x), Math.abs(y0 - y));
      if (right = x > x0) this._x1 = x0 + xm; else this._x0 = x1 - xm;
      if (bottom = y > y0) this._y1 = y0 + xm; else this._y0 = y1 - xm;
      this._root = new Array(4);
      this._root[i = bottom << 1 | right] = leaf(point);
      this._root[3 - i] = node;
      return;
    }

    // Otherwise, double the size of the root until the new point fits.
    // TODO If this creates a tree deeper than the maximum depth,
    // collapse all the points below the given depth to a linked list.
    xm = x1 - x0;
    switch (i = (y < (y0 + y1) / 2) << 1 | (x < (x0 + x1) / 2)) {
      case 0: do parent = new Array(4), parent[i] = node, node = parent, xm *= 2, x1 = x0 + xm, y1 = y0 + xm; while (x >= x1 || y >= y1); break;
      case 1: do parent = new Array(4), parent[i] = node, node = parent, xm *= 2, x0 = x1 - xm, y1 = y0 + xm; while (x0 > x || y >= y1); break;
      case 2: do parent = new Array(4), parent[i] = node, node = parent, xm *= 2, x1 = x0 + xm, y0 = y1 - xm; while (x >= x1 || y0 > y); break;
      case 3: do parent = new Array(4), parent[i] = node, node = parent, xm *= 2, x0 = x1 - xm, y0 = y1 - xm; while (x0 > x || y0 > y); break;
    }

    node[3 - i] = leaf(point);
    this._root = node;
    this._x0 = x0, this._x1 = x1;
    this._y0 = y0, this._y1 = y1;
    return;
  }

  // Find the appropriate leaf node for the new point.
  while (node) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    parent = node, node = node[i = bottom << 1 | right], ++depth;
  }

  // If the new point is in an empty node, just add it.
  if (!(point0 = parent.point)) return parent[i] = leaf(point);

  // Otherwise, split the leaf node until the old and new point are separated.
  // TODO Test if the old and new point are exactly coincident to abort early.
  parent.point = undefined;
  while (i === (i0 = (point0[1] >= ym) << 1 | (point0[0] >= xm))) {
    parent = parent[i] = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    i = bottom << 1 | right;
    if (++depth > maxDepth) return point.next = point0, parent.point = point;
  }

  parent[i0] = leaf(point0);
  parent[i] = leaf(point);
}

function leaf(point) {
  var node = new Array(4);
  node.point = point;
  return node;
}
