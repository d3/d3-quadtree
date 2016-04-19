var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.points() returns an array of points in the quadtree", function(test) {
  var q = d3_quadtree.quadtree();
  test.deepEqual(q.points(), []);
  q.add([0, 0]);
  q.add([1, 2]);
  test.deepEqual(q.points(), [{x: 0, y: 0}, {x: 1, y: 2}]);
  test.end();
});

tape("quadtree.points() correctly handles coincident nodes", function(test) {
  var q = d3_quadtree.quadtree();
  q.add([0, 0]);
  q.add([0, 0]);
  test.deepEqual(q.points(), [{x: 0, y: 0, next: {x: 0, y: 0}}, {x: 0, y: 0}]);
  test.end();
});
