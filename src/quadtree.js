import constant from "./constant";
import Root from "./root";

function defaultX(d) {
  return d[0];
}

function defaultY(d) {
  return d[1];
}

export default function() {
  var x = defaultX,
      y = defaultY,
      ox,
      oy,
      l;

  function quadtree(data) {
    var d, i, n = data.length, p,
        xi, yi,
        x0 = -Infinity,
        y0 = -Infinity,
        x1 = Infinity,
        y1 = Infinity,
        root = new Root;

    if (ox != null) {
      root._root = new Array(4);
      root._x0 = x0 = ox, root._x1 = x1 = ox + l;
      root._y0 = y0 = oy, root._y1 = y1 = oy + l;
    }

    for (i = 0; i < n; ++i) {
      xi = +x(d = data[i], i, data), yi = +y(d, i, data);
      if (!(x0 < xi && xi <= x1 && y0 < yi && yi <= y1)) continue;
      p = [xi, yi], p.data = data, p.index = i;
      root.add(p);
    }

    return root;
  }

  quadtree.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), quadtree) : x;
  };

  quadtree.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), quadtree) : y;
  };

  quadtree.extent = function(_) {
    return arguments.length ? (_ == null ? ox = oy = l = null : (ox = +_[0][0], oy = +_[0][1], l = Math.max(_[1][0] - ox, _[1][1] - oy)), quadtree) : ox == null ? null : [[ox, oy], [ox + l, oy + l]];
  };

  quadtree.size = function(_) {
    return arguments.length ? (_ == null ? ox = oy = l = null : (ox = oy = 0, l = Math.max(+_[0], +_[1])), quadtree) : ox == null ? null : [l, l];
  };

  return quadtree;
}
