var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.copy() returns a copy of this quadtree", function(test) {
  var q0 = d3_quadtree.quadtree().add([0, 0]).add([1, 0]).add([0, 1]).add([1, 1]),
      q1 = q0.copy();
  test.deepEqual(q0, q1);
  test.end();
});

tape("quadtree.copy() isolates changes to the extent", function(test) {
  var q0 = d3_quadtree.quadtree([[0, 0], [1, 1]]),
      q1 = q0.copy();
  q0.add([2, 2]);
  test.deepEqual(q1.extent(), [[0, 0], [1, 1]]);
  q1.add([-1, -1]);
  test.deepEqual(q0.extent(), [[0, 0], [2, 2]]);
  test.end();
});

tape("quadtree.copy() isolates changes to the root when a leaf", function(test) {
  var p0 = [2, 2],
      q0 = d3_quadtree.quadtree([[0, 0], [1, 1]]),
      q1 = q0.copy();
  q0.add(p0);
  test.equal(q1.root(), undefined);
  q1.add(p0);
  test.deepEqual(q0.root(), {point: p0});
  q1.remove(p0);
  test.deepEqual(q0.root(), {point: p0});
  test.end();
});

tape("quadtree.copy() isolates changes to the root when not a leaf", function(test) {
  var p0 = [1, 1],
      p1 = [2, 2],
      p2 = [3, 3],
      q0 = d3_quadtree.quadtree([[0, 0], [4, 4]]).add(p0).add(p1),
      q1 = q0.copy().add(p2);
  test.deepEqual(q0, {
    _x0: 0,
    _y0: 0,
    _x1: 4,
    _y1: 4,
    _root: [
      {point: p0},
      ,
      ,
      {point: p1}
    ]
  });
  q0.remove(p0);
  test.deepEqual(q1, {
    _x0: 0,
    _y0: 0,
    _x1: 4,
    _y1: 4,
    _root: [
      {point: p0},
      ,
      ,
      [
        {point: p1},
        ,
        ,
        {point: p2}
      ]
    ]
  });
  test.end();
});
