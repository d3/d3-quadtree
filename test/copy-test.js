var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.copy() returns a copy of this quadtree", function(test) {
  var q0 = d3_quadtree.quadtree().add({x: 0, y: 0}).add({x: 1, y: 0}).add({x: 0, y: 1}).add({x: 1, y: 1}),
      q1 = q0.copy();
  test.deepEqual(q0, q1);
  test.end();
});

tape("quadtree.copy() isolates changes to the bounds", function(test) {
  var q0 = d3_quadtree.quadtree(1, 1),
      q1 = q0.copy();
  q0.add({x: 2, y: 2});
  test.equal(q1.x0, 0);
  test.equal(q1.y0, 0);
  test.equal(q1.x1, 1);
  test.equal(q1.y1, 1);
  q1.add({x: -1, y: -1});
  test.equal(q0.x0, 0);
  test.equal(q0.y0, 0);
  test.equal(q0.x1, 2);
  test.equal(q0.y1, 2);
  test.end();
});

tape("quadtree.copy() isolates changes to the root when a leaf", function(test) {
  var p0 = {x: 2, y: 2},
      q0 = d3_quadtree.quadtree(1, 1),
      q1 = q0.copy();
  q0.add(p0);
  test.equal(q1.root, undefined);
  q1.add(p0);
  test.deepEqual(q0.root, {point: p0});
  q1.remove(p0);
  test.deepEqual(q0.root, {point: p0});
  test.end();
});

tape("quadtree.copy() isolates changes to the root when not a leaf", function(test) {
  var p0 = {x: 1, y: 1},
      p1 = {x: 2, y: 2},
      p2 = {x: 3, y: 3},
      q0 = d3_quadtree.quadtree(4, 4).add(p0).add(p1),
      q1 = q0.copy().add(p2);
  test.deepEqual(q0, {
    x0: 0,
    y0: 0,
    x1: 4,
    y1: 4,
    root: [
      {point: p0},
      ,
      ,
      {point: p1}
    ]
  });
  q0.remove(p0);
  test.deepEqual(q1, {
    x0: 0,
    y0: 0,
    x1: 4,
    y1: 4,
    root: [
      {point: p0},
      ,
      ,
      [
        {point: p1},
        ,
        ,
        {point: p2}
      ]
    ]
  });
  test.end();
});
