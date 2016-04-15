var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.visit(callback) visits each node in a quadtree", function(test) {
  var results = [], q = d3_quadtree.quadtree().add({x: 0, y: 0}).add({x: 1, y: 0}).add({x: 0, y: 1}).add({x: 1, y: 1});
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

tape("quadtree.visit(callback) applies pre-order traversal", function(test) {
  var results = [], q = d3_quadtree.quadtree(960, 960).add({x: 100, y: 100}).add({x: 200, y: 200}).add({x: 300, y: 300});
  test.equal(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  test.deepEqual(results, [
    [  0,   0, 960, 960],
    [  0,   0, 480, 480],
    [  0,   0, 240, 240],
    [  0,   0, 120, 120],
    [120, 120, 240, 240],
    [240, 240, 480, 480]
  ]);
  test.end();
});

tape("quadtree.visit(callback) does not recurse if the callback returns truthy", function(test) {
  var results = [], q = d3_quadtree.quadtree(960, 960).add({x: 100, y: 100}).add({x: 700, y: 700}).add({x: 800, y: 800});
  test.equal(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); return x0 > 0; }), q);
  test.deepEqual(results, [
    [  0,   0, 960, 960],
    [  0,   0, 480, 480],
    [480, 480, 960, 960]
  ]);
  test.end();
});

tape("quadtree.visit(callback) on an empty quadtree with no bounds does nothing", function(test) {
  var results = [], q = d3_quadtree.quadtree();
  test.equal(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  test.equal(results.length, 0);
  test.end();
});

tape("quadtree.visit(callback) on an empty quadtree with bounds visits the root quadrant", function(test) {
  var results = [], q = d3_quadtree.quadtree(960, 960);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  test.deepEqual(results, [[0, 0, 960, 960]]);
  test.end();
});
