import Quad from "./quad";

export default function(x, y) {
  var minDistance2 = Infinity,
      minPoint,
      x0 = this._x0,
      y0 = this._y0,
      x1,
      y1,
      x2,
      y2,
      x3 = this._x1,
      y3 = this._y1,
      quads = [],
      node = this._root,
      q,
      i;

  if (node) quads.push(new Quad(node, x0, y0, x3, y3));

  while (q = quads.pop()) {
    node = q.node, x1 = q.x0, y1 = q.y0, x2 = q.x1, y2 = q.y1;

    // Stop searching if this quadrant can’t contain a closer node.
    if (!node || x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0) continue;

    // Visit this point. (Visiting coincident points isn’t necessary!)
    if (node.point) {
      var dx = x - node.point[0],
          dy = y - node.point[1],
          d2 = dx * dx + dy * dy;
      if (d2 < minDistance2) {
        var d = Math.sqrt(minDistance2 = d2);
        x0 = x - d, y0 = y - d;
        x3 = x + d, y3 = y + d;
        minPoint = node.point;
      }
    }

    // Bisect the current quadrant.
    var xm = (x1 + x2) / 2,
        ym = (y1 + y2) / 2;

    quads.push(
      new Quad(node[3], xm, ym, x2, y2),
      new Quad(node[2], x1, ym, xm, y2),
      new Quad(node[1], xm, y1, x2, ym),
      new Quad(node[0], x1, y1, xm, ym)
    );

    // Visit the closest quadrant first.
    if (i = (y >= ym) << 1 | (x >= xm)) {
      q = quads[quads.length - 1];
      quads[quads.length - 1] = quads[quads.length - 1 - i];
      quads[quads.length - 1 - i] = q;
    }
  }

  return minPoint;
}
