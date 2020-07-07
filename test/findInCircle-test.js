var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.findInCircle(x, y, radius) returns all the points within the search radius of the given [x, y]", function(test) {
  const points = [[0, 0], [100, 0], [0, 100], [100, 100]];
  const q = d3_quadtree.quadtree(points);
  test.deepEqual(q.findInCircle(20, 20, Infinity), points);
  test.deepEqual(q.findInCircle(20, 20, 20 * Math.SQRT2 + 1e-6), [points[0]]);
  test.deepEqual(q.findInCircle(20, 20, 20 * Math.SQRT2 - 1e-6), []);
  test.deepEqual(q.findInCircle(50, 0, 51), [points[0], points[1]]);
  test.end();
});

tape("quadtree.findInCircle(x, y, radius, filter) returns all the points within the search radius of the given [x, y] and passing filter", function(test) {
  const points = [[0, 0, "a"], [0, 0, "b"], [100, 0, "a"], [0, 100, "b"], [100, 100, "a"]];
  const q = d3_quadtree.quadtree(points);
  const filter = d => d[2] === "a";
  test.deepEqual(q.findInCircle(20, 20, Infinity, filter), points.filter(filter));
  test.deepEqual(q.findInCircle(0, 0, 2, filter), [points[0]]);
  test.end();
});
