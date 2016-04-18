var tape = require("tape"),
    d3_quadtree = require("../");

tape("d3.quadtree() creates an empty quadtree", function(test) {
  var count = 0, q = d3_quadtree.quadtree();
  test.ok(q instanceof d3_quadtree.quadtree);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { ++count; }), q);
  test.equal(count, 0);
  test.ok(isNaN(q._x0));
  test.ok(isNaN(q._y0));
  test.ok(isNaN(q._x1));
  test.ok(isNaN(q._y1));
  test.equal(q._root, undefined);
  test.end();
});

tape("d3.quadtree(x, y) is an alias for d3.quadtree(0, 0, x, y)", function(test) {
  var count = 0, q = d3_quadtree.quadtree(56, 47);
  test.ok(q instanceof d3_quadtree.quadtree);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { ++count; }), q);
  test.equal(count, 0);
  test.equal(q._x0, 0);
  test.equal(q._y0, -4.5);
  test.equal(q._x1, 56);
  test.equal(q._y1, 51.5);
  test.equal(q._root, undefined);
  test.end();
});

tape("d3.quadtree(x0, y0, x1, y1) creates a quadtree with the specified bounds", function(test) {
  var count = 0, q = d3_quadtree.quadtree(1, 2, 3, 4);
  test.ok(q instanceof d3_quadtree.quadtree);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { ++count; }), q);
  test.equal(count, 0);
  test.equal(q._x0, 1);
  test.equal(q._y0, 2);
  test.equal(q._x1, 3);
  test.equal(q._y1, 4);
  test.equal(q._root, undefined);
  test.end();
});

tape("d3.quadtree(x0, y0, x1, y1) squarifies and centers the specified bounds", function(test) {
  var count = 0, q = d3_quadtree.quadtree(1, 2, 3, 6);
  test.ok(q instanceof d3_quadtree.quadtree);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { ++count; }), q);
  test.equal(count, 0);
  test.equal(q._x0, 0);
  test.equal(q._y0, 2);
  test.equal(q._x1, 4);
  test.equal(q._y1, 6);
  test.equal(q._root, undefined);
  test.end();
});
