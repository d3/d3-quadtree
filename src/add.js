export default function(point) {
  if (isNaN(x = +point[0]) || isNaN(y = +point[1])) return this; // ignore invalid points

  // Expand the tree to cover the new point, if necessary.
  this.cover(x, y);

  var node = this._root,
      parent,
      x,
      y,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      xm,
      ym,
      xp,
      yp,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return this._root = {point: point}, this;

  // Find the appropriate leaf node for the new point.
  // If there is no leaf node, add it.
  while (!node.point) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = {point: point}, this;
  }

  // If the new point is exactly coincident with the specified point, add it.
  if (xp = node.point[0], yp = node.point[1], x === xp && y === yp) {
    node = {point: point, next: node};
    if (parent) parent[i] = node;
    else this._root = node;
    return this;
  }

  // Otherwise, split the leaf node until the old and new point are separated.
  do {
    parent = parent ? parent[i] = new Array(4) : this._root = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));

  parent[i] = {point: point};
  parent[j] = node;
  return this;
}
