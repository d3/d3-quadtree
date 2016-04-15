export default function(point) {
  var parent,
      node = this._root,
      previous,
      xm, ym,
      x = +point.x, y = +point.y,
      x0 = this._x0, y0 = this._y0,
      x1 = this._x1, y1 = this._y1,
      right,
      bottom,
      i;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return false;

  // Find the leaf node for the point.
  while (!node.point) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return false;
  }

  // Find the point to remove.
  while (node.point !== point) if (!(previous = node, node = node.next)) return false;

  // Remove the point, or the leaf if it’s the only point.
  if (previous) previous.next = node.next;
  else if (parent) parent[i] = node.next;
  else this._root = node.next;
  return true;
}
