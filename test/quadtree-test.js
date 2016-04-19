var tape = require("tape"),
    d3_quadtree = require("../");

tape("d3.quadtree() creates an empty quadtree", function(test) {
  var count = 0, q = d3_quadtree.quadtree();
  test.ok(q instanceof d3_quadtree.quadtree);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { ++count; }), q);
  test.equal(count, 0);
  test.ok(isNaN(q.x0));
  test.ok(isNaN(q.y0));
  test.ok(isNaN(q.x1));
  test.ok(isNaN(q.y1));
  test.equal(q.root, undefined);
  test.end();
});

tape("d3.quadtree(x, y) is an alias for d3.quadtree(0, 0, x, y)", function(test) {
  var count = 0, q = d3_quadtree.quadtree(56, 47);
  test.ok(q instanceof d3_quadtree.quadtree);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { ++count; }), q);
  test.equal(count, 0);
  test.equal(q.x0, 0);
  test.equal(q.y0, -4.5);
  test.equal(q.x1, 56);
  test.equal(q.y1, 51.5);
  test.equal(q.root, undefined);
  test.end();
});

tape("d3.quadtree(x0, y0, x1, y1) creates a quadtree with the specified bounds", function(test) {
  var count = 0, q = d3_quadtree.quadtree(1, 2, 3, 4);
  test.ok(q instanceof d3_quadtree.quadtree);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { ++count; }), q);
  test.equal(count, 0);
  test.equal(q.x0, 1);
  test.equal(q.y0, 2);
  test.equal(q.x1, 3);
  test.equal(q.y1, 4);
  test.equal(q.root, undefined);
  test.end();
});

tape("d3.quadtree(x0, y0, x1, y1) squarifies and centers the specified bounds", function(test) {
  var count = 0, q = d3_quadtree.quadtree(1, 2, 3, 6);
  test.ok(q instanceof d3_quadtree.quadtree);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { ++count; }), q);
  test.equal(count, 0);
  test.equal(q.x0, 0);
  test.equal(q.y0, 2);
  test.equal(q.x1, 4);
  test.equal(q.y1, 6);
  test.equal(q.root, undefined);
  test.end();
});

tape("d3.quadtree(x0, y0, x1, y1) has undefined bounds if any value is NaN", function(test) {
  var q;
  test.ok((q = d3_quadtree.quadtree(NaN, 2, 3, 6), isNaN(q.x0) && isNaN(q.y0) && isNaN(q.x1) && isNaN(q.y1)));
  test.ok((q = d3_quadtree.quadtree(1, NaN, 3, 6), isNaN(q.x0) && isNaN(q.y0) && isNaN(q.x1) && isNaN(q.y1)));
  test.ok((q = d3_quadtree.quadtree(1, 2, NaN, 6), isNaN(q.x0) && isNaN(q.y0) && isNaN(q.x1) && isNaN(q.y1)));
  test.ok((q = d3_quadtree.quadtree(1, 2, 3, NaN), isNaN(q.x0) && isNaN(q.y0) && isNaN(q.x1) && isNaN(q.y1)));
  test.end();
});

tape("d3.quadtree(x0, y0, x1, y1) has undefined bounds if y0 > y1 or x0 > x1", function(test) {
  var q;
  test.ok((q = d3_quadtree.quadtree(3, 2, 1, 6), isNaN(q.x0) && isNaN(q.y0) && isNaN(q.x1) && isNaN(q.y1)));
  test.ok((q = d3_quadtree.quadtree(1, 6, 3, 2), isNaN(q.x0) && isNaN(q.y0) && isNaN(q.x1) && isNaN(q.y1)));
  test.end();
});

tape("d3.quadtree(x0, y0, x1, y1) has empty bounds if y0 === y1 and x0 === x1", function(test) {
  var q;
  test.deepEqual((q = d3_quadtree.quadtree(1, 2, 1, 2), [q.x0, q.y0, q.x1, q.y1]), [1, 2, 1, 2]);
  test.end();
});
