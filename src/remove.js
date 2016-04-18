export default function(point) {
  var parent,
      node = this._root,
      retainer,
      previous,
      xm, ym,
      x = +point.x, y = +point.y,
      x0 = this._x0, y0 = this._y0,
      x1 = this._x1, y1 = this._y1,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return false;

  // Find the leaf node for the point.
  // While descending, also retain the deepest parent with a non-removed sibling.
  if (!node.point) while (true) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return false;
    if (node.point) break;
    if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
  }

  // Find the point to remove.
  while (node.point !== point) if (!(previous = node, node = node.next)) return false;

  // If there are multiple coincident points, remove just the point.
  if (previous) return previous.next = node.next, true;

  // If this is the root point, remove it.
  if (!parent) return this._root = node.next, true;

  // Remove this leaf.
  parent[i] = node.next;

  // If the parent now contains exactly one leaf, collapse superfluous parents.
  if ((node = parent[0] || parent[1] || parent[2] || parent[3])
      && node === (parent[3] || parent[2] || parent[1] || parent[0])
      && node.point) {
    if (retainer) retainer[j] = node;
    else this._root = node;
  }

  return true;
}
