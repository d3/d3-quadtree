var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.extent() can be initialized upon construction", function(test) {
  test.deepEqual(d3_quadtree.quadtree([[0, 1], [2, 6]]).extent(), [[-1.5, 1], [3.5, 6]]);
  test.end();
});

tape("quadtree.extent() can be inferred by quadtree.cover", function(test) {
  var q = d3_quadtree.quadtree();
  test.deepEqual(q.cover(0, 0).extent(), [[0, 0], [0, 0]]);
  test.deepEqual(q.cover(2, 4).extent(), [[-1, 0], [3, 4]]);
  test.end();
});

tape("quadtree.extent() can be inferred by quadtree.add", function(test) {
  var q = d3_quadtree.quadtree();
  test.deepEqual(q.add([0, 0]).extent(), [[0, 0], [0, 0]]);
  test.deepEqual(q.add([2, 4]).extent(), [[-1, 0], [3, 4]]);
  test.end();
});
