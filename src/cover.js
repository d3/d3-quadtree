export default function(x, y) {
  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

  var node = this._root,
      parent,
      i,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      z = x1 - x0;

  if (isNaN(x0)) x0 = x1 = x, y0 = y1 = y;

  else if (x0 > x || x > x1 || y0 > y || y > y1) {

    // If the quadtree already has bounds, double repeatedly to cover.
    if (z) {
      switch (i = (y < (y0 + y1) / 2) << 1 | (x < (x0 + x1) / 2)) {
        case 0: {
          do parent = new Array(4), parent[i] = node, node = parent;
          while (z *= 2, x1 = x0 + z, y1 = y0 + z, x > x1 || y > y1);
          break;
        }
        case 1: {
          do parent = new Array(4), parent[i] = node, node = parent;
          while (z *= 2, x0 = x1 - z, y1 = y0 + z, x0 > x || y > y1);
          break;
        }
        case 2: {
          do parent = new Array(4), parent[i] = node, node = parent;
          while (z *= 2, x1 = x0 + z, y0 = y1 - z, x > x1 || y0 > y);
          break;
        }
        case 3: {
          do parent = new Array(4), parent[i] = node, node = parent;
          while (z *= 2, x0 = x1 - z, y0 = y1 - z, x0 > x || y0 > y);
          break;
        }
      }
      if (this._root && this._root.length === 4) this._root = node;
    }

    // Otherwise, just expand and squarify the bounds.
    else {
      if (y < y0) y0 = y; else y1 = y;
      if (x < x0) x0 = x; else x1 = x;
      var dx = x1 - x0, dy = y1 - y0;
      if (dy > dx) x1 = (x0 -= (dy - dx) / 2) + dy;
      else y1 = (y0 -= (dx - dy) / 2) + dx;
    }
  }

  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}
