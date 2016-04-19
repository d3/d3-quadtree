var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.copy() returns a copy of this quadtree", function(test) {
  var q0 = d3_quadtree.quadtree();
  q0.add([0, 0]);
  q0.add([1, 0]);
  q0.add([0, 1]);
  q0.add([1, 1]);
  test.deepEqual(q0.copy(), q0);
  test.end();
});

tape("quadtree.copy() isolates changes to the extent", function(test) {
  var q0 = d3_quadtree.quadtree().extent([[0, 0], [1, 1]]),
      q1 = q0.copy();
  q0.add([2, 2]);
  test.deepEqual(q1.extent(), [[0, 0], [1, 1]]);
  q1.add([-1, -1]);
  test.deepEqual(q0.extent(), [[0, 0], [2, 2]]);
  test.end();
});

tape("quadtree.copy() isolates changes to the root when a leaf", function(test) {
  var q0 = d3_quadtree.quadtree().extent([[0, 0], [1, 1]]),
      q1 = q0.copy(),
      p0 = q0.add([2, 2]);
  test.equal(q1.root(), undefined);
  q1 = q0.copy();
  test.deepEqual(q1.root(), {x: 2, y: 2});
  test.equal(q0.remove(p0), true);
  test.deepEqual(q1.root(), {x: 2, y: 2});
  test.end();
});

tape("quadtree.copy() isolates changes to the root when not a leaf", function(test) {
  var q0 = d3_quadtree.quadtree().extent([[0, 0], [4, 4]]),
      p0 = q0.add([1, 1]),
      p1 = q0.add([2, 2]),
      q1 = q0.copy(),
      p2 = q0.add([3, 3]);
  test.deepEqual(q0.extent(), [[0, 0], [4, 4]]);
  test.deepEqual(q0.root(), [{x: 1, y: 1},,, [{x: 2, y: 2},,, {x: 3, y: 3}]]);
  test.deepEqual(q1.extent(), [[0, 0], [4, 4]]);
  test.deepEqual(q1.root(), [{x: 1, y: 1},,, {x: 2, y: 2}]);
  q1 = q0.copy();
  q0.remove(p2);
  test.deepEqual(q1.extent(), [[0, 0], [4, 4]]);
  test.deepEqual(q1.root(), [{x: 1, y: 1},,, [{x: 2, y: 2},,, {x: 3, y: 3}]]);
  test.end();
});
