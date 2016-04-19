export default function(point) {
  if (isNaN(x = +point.x) || isNaN(y = +point.y)) return this; // ignore invalid points

  var node = this.root,
      parent,
      x, y,
      xm, ym,
      xp, yp,
      x0 = this.x0, y0 = this.y0,
      x1 = this.x1, y1 = this.y1,
      right,
      bottom,
      i,
      j;

  // Expand the tree to cover the new point, if necessary.
  if (x0 > x || x > x1 || y0 > y || y > y1) {
    xm = x0 === x1 ? Math.max(Math.abs(x0 - x), Math.abs(y0 - y)) : (x1 - x0) * 2;
    switch (i = (y < (y0 + y1) / 2) << 1 | (x < (x0 + x1) / 2)) {
      case 0: do parent = new Array(4), parent[i] = node, node = parent, x1 = x0 + xm, y1 = y0 + xm, xm *= 2; while (x > x1 || y > y1); break;
      case 1: do parent = new Array(4), parent[i] = node, node = parent, x0 = x1 - xm, y1 = y0 + xm, xm *= 2; while (x0 > x || y > y1); break;
      case 2: do parent = new Array(4), parent[i] = node, node = parent, x1 = x0 + xm, y0 = y1 - xm, xm *= 2; while (x > x1 || y0 > y); break;
      case 3: do parent = new Array(4), parent[i] = node, node = parent, x0 = x1 - xm, y0 = y1 - xm, xm *= 2; while (x0 > x || y0 > y); break;
    }
    this.root = node;
    this.x0 = x0, this.x1 = x1;
    this.y0 = y0, this.y1 = y1;
  }

  // If the tree is empty, initialize the root as a leaf.
  if (!node) {
    this.root = {point: point};
    if (isNaN(x0)) this.x0 = this.x1 = x, this.y0 = this.y1 = y;
    return this;
  }

  // Find the appropriate leaf node for the new point.
  // If there is no leaf node, add it.
  while (!node.point) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = {point: point}, this;
  }

  // If the new point is exactly coincident with the specified point, add it.
  if (xp = node.point.x, yp = node.point.y, x === xp && y === yp) {
    node = {point: point, next: node};
    if (parent) parent[i] = node;
    else this.root = node;
    return this;
  }

  // Otherwise, split the leaf node until the old and new point are separated.
  do {
    parent = parent ? parent[i] = new Array(4) : this.root = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));

  parent[i] = {point: point};
  parent[j] = node;
  return this;
}
