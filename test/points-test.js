var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.points() returns an array of points in the quadtree", function(test) {
  test.deepEqual(d3_quadtree.quadtree().points(), []);
  test.deepEqual(d3_quadtree.quadtree().add([0, 0]).add([1, 2]).points(), [[0, 0], [1, 2]]);
  test.end();
});

tape("quadtree.points() correctly handles coincident nodes", function(test) {
  test.deepEqual(d3_quadtree.quadtree().add([0, 0]).add([0, 0]).points(), [[0, 0], [0, 0]]);
  test.end();
});
