var tape = require("tape"),
    d3_array = require("d3-array"),
    d3_quadtree = require("../");

tape("quadtree.find(x, y) returns the closest point to the given [x, y]", function(test) {
  var dx = 17,
      dy = 17,
      q = d3_quadtree.quadtree();
  d3_array.range(dx * dy).forEach(function(i) { q.add([i % dx, i / dx | 0]); });
  test.deepEqual(q.find( 0.1,  0.1), [ 0,  0]);
  test.deepEqual(q.find( 7.1,  7.1), [ 7,  7]);
  test.deepEqual(q.find( 0.1, 15.9), [ 0, 16]);
  test.deepEqual(q.find(15.9, 15.9), [16, 16]);
  test.end();
});
