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
      y = defaultY;

  function quadtree(data) {
    var d, i, n = data.length, p, root = new Root;
    for (i = 0; i < n; ++i) {
      p = [+x(d = data[i], i, data), +y(d, i, data)];
      p.data = data;
      p.index = i;
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

  return quadtree;
}
