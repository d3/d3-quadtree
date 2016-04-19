var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.add(point) adds the specified point to the quadtree and returns this", function(test) {
  var q = d3_quadtree.quadtree();
  test.equal(q.add([0, 0]), q);
  test.equal(q.add([1, 1]), q);
  test.equal(q.add([1, 0]), q);
  test.equal(q.add([0, 1]), q);
  test.deepEqual(q, {
    _x0: 0,
    _y0: 0,
    _x1: 1,
    _y1: 1,
    _root: [
      {point: [0, 0]},
      {point: [1, 0]},
      {point: [0, 1]},
      {point: [1, 1]}
    ]
  });
  test.end();
});

tape("quadtree.add(point) handles points being on the perimeter of the quadtree bounds", function(test) {
  var results = [], q = d3_quadtree.quadtree([[0, 0], [1, 1]])
      .add([0, 0])
      .add([1, 0])
      .add([0, 1])
      .add([1, 1]);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  test.deepEqual(results, [
    [0.0, 0.0, 1.0, 1.0],
    [0.0, 0.0, 0.5, 0.5],
    [0.5, 0.0, 1.0, 0.5],
    [0.0, 0.5, 0.5, 1.0],
    [0.5, 0.5, 1.0, 1.0]
  ]);
  test.end();
});

tape("quadtree.add(point) handles points being to the top of the quadtree bounds", function(test) {
  var results = [], q = d3_quadtree.quadtree([[0, 0], [2, 2]]).add([1, -1]);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  test.deepEqual(results, [
    [0, -2, 4, 2]
  ]);
  test.end();
});

tape("quadtree.add(point) handles points being to the right of the quadtree bounds", function(test) {
  var results = [], q = d3_quadtree.quadtree([[0, 0], [2, 2]]).add([3, 1]);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  test.deepEqual(results, [
    [0, 0, 4, 4]
  ]);
  test.end();
});

tape("quadtree.add(point) handles points being to the bottom of the quadtree bounds", function(test) {
  var results = [], q = d3_quadtree.quadtree([[0, 0], [2, 2]]).add([1, 3]);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  test.deepEqual(results, [
    [0, 0, 4, 4]
  ]);
  test.end();
});

tape("quadtree.add(point) handles points being to the left of the quadtree bounds", function(test) {
  var results = [], q = d3_quadtree.quadtree([[0, 0], [2, 2]]).add([-1, 1]);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  test.deepEqual(results, [
    [-2, 0, 2, 4]
  ]);
  test.end();
});

tape("quadtree.add(point) handles coincident points by creating a linked list", function(test) {
  var q = d3_quadtree.quadtree([[0, 0], [1, 1]])
      .add([0, 0])
      .add([1, 0])
      .add([0, 1])
      .add([0, 1]);
  test.deepEqual(q, {
    _x0: 0,
    _y0: 0,
    _x1: 1,
    _y1: 1,
    _root: [
      {point: [0, 0]},
      {point: [1, 0]},
      {point: [0, 1], next: {point: [0, 1]}},
    ]
  });
  test.end();
});

tape("quadtree.add(point) implicitly defines trivial bounds for the first point", function(test) {
  var q = d3_quadtree.quadtree().add([1, 2]);
  test.deepEqual(q, {
    _x0: 1,
    _y0: 2,
    _x1: 1,
    _y1: 2,
    _root: {point: [1, 2]}
  });
  test.end();
});
