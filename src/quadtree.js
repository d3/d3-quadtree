import constant from "./constant";
import Node from "./node";
import Root from "./root";

var maxDepth = 64;

function defaultX(d) {
  return d[0];
}

function defaultY(d) {
  return d[1];
}

export default function() {
  var x = defaultX,
      y = defaultY,
      x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;

  function quadtree(data) {
    var d, i, n = data.length,
        points = new Array(n),
        point,
        xi, yi,
        x0a = x0,
        y0a = y0,
        x1a = x1,
        y1a = y1;

    // Compute the points and the bounds.
    for (i = 0; i < n; ++i) {
      if (isNaN(xi = +x(d = data[i], i, data)) || isNaN(yi = +y(d, i, data))) continue;
      points[i] = point = [xi, yi];
      point.data = d;
      point.index = i;
      x0a = Math.min(x0a, xi), x1a = Math.max(x1a, xi);
      y0a = Math.min(y0a, yi), y1a = Math.max(y1a, yi);
    }

    // Create the root and add all points.
    var root = new Root(x0a, y0a, x1a, y1a);
    for (i = 0; i < n; ++i) if (points[i]) add(root, points[i]);
    return root;
  }

  quadtree.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), quadtree) : x;
  };

  quadtree.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), quadtree) : y;
  };

  quadtree.extent = function(_) {
    return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], quadtree) : [[x0, y0], [x1, y1]];
  };

  quadtree.size = function(_) {
    return arguments.length ? (x0 = y0 = 0, x1 = +_[0], y1 = +_[1], quadtree) : [x1 - x0, y1 - y0];
  };

  return quadtree;
}

function add(node, point) {
  var point0,
      parent,
      depth = 0,
      x = point[0], y = point[1], xm, ym,
      x0 = node.x0, x1 = node.x1,
      y0 = node.y0, y1 = node.y1,
      right,
      bottom,
      i,
      i0;

  // Find the appropriate leaf node for the new point.
  while (node) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    parent = node, node = node[i = bottom << 1 | right], ++depth;
  }

  // If the new point is in an empty node, just add it.
  if (!(point0 = parent.point)) return parent[i] = new Node(point);

  // Otherwise, split the leaf node until the old and new point are separated.
  parent.point = undefined;
  while (i === (i0 = (point0[1] >= ym) << 1 | (point0[0] >= xm))) {
    parent = parent[i] = new Node;
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    i = bottom << 1 | right;
    if (++depth > maxDepth) return point.next = point0, parent.point = point;
  }

  parent[i0] = new Node(point0);
  parent[i] = new Node(point);
}
