var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.size() returns the number of points in the quadtree", function(test) {
  test.equal(d3_quadtree.quadtree().size(), 0);
  test.equal(d3_quadtree.quadtree().add([0, 0]).add([1, 2]).size(), 2);
  test.end();
});

tape("quadtree.size() correctly counts coincident nodes", function(test) {
  test.equal(d3_quadtree.quadtree().add([0, 0]).add([0, 0]).size(), 2);
  test.end();
});
