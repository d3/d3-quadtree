var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.add(point) creats a new point and adds it to the quadtree", function(test) {
  var q = d3_quadtree.quadtree();
  test.deepEqual(q.add(0, 0), [0, 0]);
  test.deepEqual(q.add(1, 1), [1, 1]);
  test.deepEqual(q.add(1, 0), [1, 0]);
  test.deepEqual(q.add(0, 1), [0, 1]);
  test.deepEqual(q.root(), [[0, 0], [1, 0], [0, 1], [1, 1]]);
  test.end();
});

tape("quadtree.add(point) handles points being on the perimeter of the quadtree bounds", function(test) {
  var results = [], q = d3_quadtree.quadtree().extent([[0, 0], [1, 1]]);
  q.add(0, 0);
  q.add(1, 0);
  q.add(0, 1);
  q.add(1, 1);
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
  var results = [], q = d3_quadtree.quadtree().extent([[0, 0], [2, 2]]);
  q.add(1, -1);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  test.deepEqual(results, [
    [0, -2, 4, 2]
  ]);
  test.end();
});

tape("quadtree.add(point) handles points being to the right of the quadtree bounds", function(test) {
  var results = [], q = d3_quadtree.quadtree().extent([[0, 0], [2, 2]]);
  q.add(3, 1);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  test.deepEqual(results, [
    [0, 0, 4, 4]
  ]);
  test.end();
});

tape("quadtree.add(point) handles points being to the bottom of the quadtree bounds", function(test) {
  var results = [], q = d3_quadtree.quadtree().extent([[0, 0], [2, 2]]);
  q.add(1, 3);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  test.deepEqual(results, [
    [0, 0, 4, 4]
  ]);
  test.end();
});

tape("quadtree.add(point) handles points being to the left of the quadtree bounds", function(test) {
  var results = [], q = d3_quadtree.quadtree().extent([[0, 0], [2, 2]]);
  q.add(-1, 1);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  test.deepEqual(results, [
    [-2, 0, 2, 4]
  ]);
  test.end();
});

tape("quadtree.add(point) handles coincident points by creating a linked list", function(test) {
  var q = d3_quadtree.quadtree().extent([[0, 0], [1, 1]]);
  q.add(0, 0);
  q.add(1, 0);
  q.add(0, 1);
  q.add(0, 1);
  test.deepEqual(q.extent(), [[0, 0], [1, 1]]);
  test.deepEqual(q.root(), [[0, 0], [1, 0], {0: 0, 1: 1, next: [0, 1]}]);
  test.end();
});

tape("quadtree.add(point) implicitly defines trivial bounds for the first point", function(test) {
  var q = d3_quadtree.quadtree();
  q.add(1, 2);
  test.deepEqual(q.extent(), [[1, 2], [1, 2]]);
  test.deepEqual(q.root(), [1, 2]);
  test.end();
});
