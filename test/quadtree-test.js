var tape = require("tape"),
    d3_quadtree = require("../");

tape("d3.quadtree() creates an empty quadtree", function(test) {
  var q = d3_quadtree.quadtree();
  test.ok(q instanceof d3_quadtree.quadtree);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { throw new Error; }), q);
  test.equal(q.size(), 0);
  test.equal(q.extent(), undefined);
  test.equal(q.root(), undefined);
  test.deepEqual(q.data(), []);
  test.end();
});
