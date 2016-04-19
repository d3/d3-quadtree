var tape = require("tape"),
    d3_quadtree = require("../");

tape("d3.quadtree() creates an empty quadtree", function(test) {
  var q = d3_quadtree.quadtree();
  test.ok(q instanceof d3_quadtree.quadtree);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { throw new Error; }), q);
  test.equal(q.size(), 0);
  test.equal(q.extent(), undefined);
  test.equal(q.root(), undefined);
  test.deepEqual(q.points(), []);
  test.end();
});

tape("d3.quadtree(extent) creates an empty quadtree with the specified extent", function(test) {
  var q = d3_quadtree.quadtree([[1, 2], [3, 4]]);
  test.ok(q instanceof d3_quadtree.quadtree);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { throw new Error; }), q);
  test.equal(q.size(), 0);
  test.deepEqual(q.extent(), [[1, 2], [3, 4]]);
  test.equal(q.root(), undefined);
  test.deepEqual(q.points(), []);
  test.end();
});

tape("d3.quadtree(extent) squarifies and centers the specified extent", function(test) {
  test.deepEqual(d3_quadtree.quadtree([[0, 1], [2, 6]]).extent(), [[-1.5, 1], [3.5, 6]]);
  test.end();
});

tape("d3.quadtree(extent) ignores invalid extents", function(test) {
  test.equal(d3_quadtree.quadtree([[1, NaN], [NaN, 0]]).extent(), undefined);
  test.equal(d3_quadtree.quadtree([[NaN, 1], [0, NaN]]).extent(), undefined);
  test.equal(d3_quadtree.quadtree([[NaN, NaN], [NaN, NaN]]).extent(), undefined);
  test.end();
});

tape("d3.quadtree(extent) flips inverted extents", function(test) {
  test.deepEqual(d3_quadtree.quadtree([[1, 1], [0, 0]]).extent(), [[0, 0], [1, 1]]);
  test.end();
});

tape("d3.quadtree(extent) tolerates partially-valid extents", function(test) {
  test.deepEqual(d3_quadtree.quadtree([[NaN, 0], [1, 1]]).extent(), [[1, 1], [1, 1]]);
  test.deepEqual(d3_quadtree.quadtree([[0, NaN], [1, 1]]).extent(), [[1, 1], [1, 1]]);
  test.deepEqual(d3_quadtree.quadtree([[0, 0], [NaN, 1]]).extent(), [[0, 0], [0, 0]]);
  test.deepEqual(d3_quadtree.quadtree([[0, 0], [1, NaN]]).extent(), [[0, 0], [0, 0]]);
  test.end();
});

tape("d3.quadtree(extent) allows trivial extents", function(test) {
  test.deepEqual(d3_quadtree.quadtree([[0, 0], [0, 0]]).extent(), [[0, 0], [0, 0]]);
  test.deepEqual(d3_quadtree.quadtree([[1, 1], [1, 1]]).extent(), [[1, 1], [1, 1]]);
  test.end();
});
