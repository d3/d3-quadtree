export default function(point) {
  var parent,
      node = this._root,
      point0,
      point1,
      xm, ym,
      x = +point[0], y = +point[1],
      x0 = this._x0, y0 = this._y0,
      x1 = this._x1, y1 = this._y1,
      right,
      bottom,
      i;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return false;

  // Find the leaf node for the point.
  while (!(point1 = node.point)) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return false;
  }

  // Find the point to remove.
  while (point1 !== point) {
    if (!(point0 = point1, point1 = point1.next)) return false;
  }

  // Remove the point, or the leaf if it’s the only point.
  if (point0) { if (point.next) point0.next = point.next; else delete point0.next; }
  else if (point.next) { node.point = point.next; delete point.next; }
  else delete parent[i];
  return true;
}
