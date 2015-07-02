var tape = require("tape"),
    arrays = require("d3-arrays"),
    quadtree = require("../");

tape("quadtree() has the expected defaults", function(test) {
  var q = quadtree.quadtree();
  test.equal(q.x()([2.51, 1]), 2.51);
  test.equal(q.y()([1, 1.23]), 1.23);
  test.equal(q.extent(), null);
  test.equal(q.size(), null);
  test.end();
});

tape("quadtree(points) returns the root of a new quadtree of the specified points", function(test) {
  var root = quadtree.quadtree()([[0, 0], [1, 0], [0, 1], [1, 1]]);
  test.equal(root.x, null);
  test.equal(root.y, null);
  test.equal(root.leaf, false);
  test.equal(root.point, null);
  test.deepEqual(root.nodes, [
    {leaf: true, nodes: [], point: [0, 0], x: 0, y: 0},
    {leaf: true, nodes: [], point: [1, 0], x: 1, y: 0},
    {leaf: true, nodes: [], point: [0, 1], x: 0, y: 1},
    {leaf: true, nodes: [], point: [1, 1], x: 1, y: 1}
  ]);
  test.end();
});

tape("quadtree(points) handles coincident points by nesting nodes", function(test) {
  var root = quadtree.quadtree()([[0, 0], [1, 0], [0, 1], [0, 1]]);
  test.equal(root.x, null);
  test.equal(root.y, null);
  test.equal(root.leaf, false);
  test.equal(root.point, null);
  test.deepEqual(root.nodes, [
    {leaf: true, nodes: [], point: [0, 0], x: 0, y: 0},
    {leaf: true, nodes: [], point: [1, 0], x: 1, y: 0},
    {leaf: false, nodes: [,,{leaf: true, nodes: [], point: [0, 1], x: 0, y: 1},], point: [0, 1], x: 0, y: 1},
  ]);
  test.end();
});

tape("quadtree(points) allows points to contain only a single point", function(test) {
  var root = quadtree.quadtree()([[0, 0]]);
  test.equal(root.x, 0);
  test.equal(root.y, 0);
  test.equal(root.leaf, true);
  test.deepEqual(root.point, [0, 0]);
  test.deepEqual(root.nodes, []);
  test.end();
});

tape("quadtree(points) allows points to be empty", function(test) {
  var root = quadtree.quadtree()([]);
  test.equal(root.x, null);
  test.equal(root.y, null);
  test.equal(root.leaf, true);
  test.equal(root.point, null);
  test.deepEqual(root.nodes, []);
  test.end();
});

tape("quadtree.extent([[x1, y1], [x2, y2]]) squarifies the specified extent", function(test) {
  var x1 = 8,
      y1 = 10,
      x2 = 56,
      y2 = 47,
      size = Math.max(x2 - x1, y2 - y1),
      root = quadtree.quadtree().extent([[x1, y1], [x2, y2]])([]),
      results = [];
  root.visit(function() { results.push([].slice.call(arguments)); });
  test.deepEqual(results, [[root, x1, y1, size + x1, size + y1]]);
  test.end();
});

tape("quadtree.size([x, y]) is an alias for quadtree().extent([[0, 0], [x, y]])", function(test) {
  var x = 56,
      y = 47,
      size = Math.max(x, y),
      root = quadtree.quadtree().size([x, y])([]),
      results = [];
  root.visit(function() { results.push([].slice.call(arguments)); });
  test.deepEqual(results, [[root, 0, 0, size, size]]);
  test.end();
});

tape("root.visit(callback) visits each node in a quadtree", function(test) {
  var root = quadtree.quadtree()([[0, 0], [1, 0], [0, 1], [1, 1]]),
      results = [];
  root.visit(function() { results.push([].slice.call(arguments)); });
  test.deepEqual(results, [
    [         root, 0.0, 0.0, 1.0, 1.0],
    [root.nodes[0], 0.0, 0.0, 0.5, 0.5],
    [root.nodes[1], 0.5, 0.0, 1.0, 0.5],
    [root.nodes[2], 0.0, 0.5, 0.5, 1.0],
    [root.nodes[3], 0.5, 0.5, 1.0, 1.0]
  ]);
  test.end();
});

tape("root.visit(callback) applies pre-order traversal", function(test) {
  var root = quadtree.quadtree().size([960, 500])([[100, 100], [200, 200], [300, 300]]),
      results = [];
  root.visit(function(node, x1, y1, x2, y2) { results.push([node.point, x1, y1, x2, y2]); });
  test.deepEqual(results, [
    [      null,   0,   0, 960, 960],
    [      null,   0,   0, 480, 480],
    [      null,   0,   0, 240, 240],
    [[100, 100],   0,   0, 120, 120],
    [[200, 200], 120, 120, 240, 240],
    [[300, 300], 240, 240, 480, 480]
  ]);
  test.end();
});

tape("root.visit(callback) does not recurse if the callback returns truthy", function(test) {
  var root = quadtree.quadtree().size([960, 500])([[100, 100], [700, 700], [800, 800]]),
      results = [];
  root.visit(function(node, x1, y1, x2, y2) { results.push([node.point, x1, y1, x2, y2]); return x1 > 0; });
  test.deepEqual(results, [
    [      null,   0,   0, 960, 960],
    [[100, 100],   0,   0, 480, 480],
    [      null, 480, 480, 960, 960]
  ]);
  test.end();
});

tape("root.visit(callback) on an empty quadtree has degenerate bounds", function(test) {
  var root = quadtree.quadtree()([]),
      results = [];
  root.visit(function() { results.push([].slice.call(arguments)); });
  test.deepEqual(results, [
    [root, Infinity, Infinity, -Infinity, -Infinity]
  ]);
  test.end();
});

tape("root.find(x, y) returns the closest point to the given [x, y]", function(test) {
  var dx = 17,
      dy = 17,
      root = quadtree.quadtree()(arrays.range(dx * dy).map(function(i) { return [i % dx, i / dx | 0]; }));
  test.deepEqual(root.find( 0.1,  0.1), [ 0,  0]);
  test.deepEqual(root.find( 7.5,  7.5), [ 7,  7]);
  test.deepEqual(root.find( 0.1, 15.9), [ 0, 16]);
  test.deepEqual(root.find(15.9, 15.9), [16, 16]);
  test.end();
});

tape("root.find(x, y) works when the quadtre has x- and y-accessors", function(test) {
  var dx = 17,
      dy = 17,
      x = function(d) { return d.x; },
      y = function(d) { return d.y; },
      root = quadtree.quadtree().x(x).y(y)(arrays.range(dx * dy).map(function(i) { return {x: i % dx, y: i / dx | 0}; }));
  test.deepEqual(root.find( 0.1,  0.1), {x:  0, y:  0});
  test.deepEqual(root.find( 7.5,  7.5), {x:  7, y:  7});
  test.deepEqual(root.find( 0.1, 15.9), {x:  0, y: 16});
  test.deepEqual(root.find(15.9, 15.9), {x: 16, y: 16});
  test.end();
});
