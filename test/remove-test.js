var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.remove(point) removes the only point in the quadtree and returns true", function(test) {
  var q = d3_quadtree.quadtree(),
      p0 = q.add([1, 1]);
  test.equal(q.remove(p0), true);
  test.deepEqual(q.extent(), [[1, 1], [1, 1]]);
  test.deepEqual(q.root(), undefined);
  test.deepEqual(p0, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) removes a first coincident point at the root in the quadtree and returns true", function(test) {
  var q = d3_quadtree.quadtree(),
      p0 = q.add([1, 1]),
      p1 = q.add([1, 1]);
  test.equal(q.remove(p0), true);
  test.deepEqual(q.extent(), [[1, 1], [1, 1]]);
  test.deepEqual(q.root(), {x: 1, y: 1});
  test.deepEqual(p0, {x: 1, y: 1});
  test.deepEqual(p1, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) removes another coincident point at the root in the quadtree and returns true", function(test) {
  var q = d3_quadtree.quadtree(),
      p0 = q.add([1, 1]),
      p1 = q.add([1, 1]);
  test.equal(q.remove(p1), true);
  test.deepEqual(q.extent(), [[1, 1], [1, 1]]);
  test.deepEqual(q.root(), {x: 1, y: 1});
  test.deepEqual(p0, {x: 1, y: 1});
  test.deepEqual(p1, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) removes a non-root point in the quadtree and returns true", function(test) {
  var q = d3_quadtree.quadtree(),
      p0 = q.add([0, 0]),
      p1 = q.add([1, 1]);
  test.equal(q.remove(p0), true);
  test.deepEqual(q.extent(), [[0, 0], [1, 1]]);
  test.deepEqual(q.root(), {x: 1, y: 1});
  test.deepEqual(p0, {x: 0, y: 0});
  test.deepEqual(p1, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) removes another non-root point in the quadtree and returns true", function(test) {
  var q = d3_quadtree.quadtree(),
      p0 = q.add([0, 0]),
      p1 = q.add([1, 1]);
  test.equal(q.remove(p1), true);
  test.deepEqual(q.extent(), [[0, 0], [1, 1]]);
  test.deepEqual(q.root(), {x: 0, y: 0});
  test.deepEqual(p0, {x: 0, y: 0});
  test.deepEqual(p1, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) ignores a point not in the quadtree and returns false", function(test) {
  var q0 = d3_quadtree.quadtree(),
      q1 = d3_quadtree.quadtree(),
      p0 = q0.add([0, 0]),
      p1 = q1.add([1, 1]);
  test.equal(q0.remove(p1), false);
  test.deepEqual(q0.extent(), [[0, 0], [0, 0]]);
  test.deepEqual(q0.root(), {x: 0, y: 0});
  test.end();
});

tape("quadtree.remove(point) ignores a coincident point not in the quadtree and returns false", function(test) {
  var q0 = d3_quadtree.quadtree(),
      q1 = d3_quadtree.quadtree(),
      p0 = q0.add([0, 0]),
      p1 = q1.add([0, 0]);
  test.equal(q0.remove(p1), false);
  test.deepEqual(q0.extent(), [[0, 0], [0, 0]]);
  test.deepEqual(q0.root(), {x: 0, y: 0});
  test.end();
});

tape("quadtree.remove(point) removes another point in the quadtree and returns true", function(test) {
  var q = d3_quadtree.quadtree().extent([[0, 0], [959, 959]]);
  q.add([630, 438]);
  q.add([715, 464]);
  q.add([523, 519]);
  q.add([646, 318]);
  q.add([434, 620]);
  q.add([570, 489]);
  q.add([520, 345]);
  q.add([459, 443]);
  q.add([346, 405]);
  q.add([529, 444]);
  test.equal(q.remove(q.find(546, 440)), true);
  test.deepEqual(q.extent(), [[0, 0], [959, 959]]);
  test.deepEqual(q.root(), [
    [
      ,
      ,
      ,
      [
        ,
        ,
        {x: 346, y: 405},
        {x: 459, y: 443}
      ]
    ],
    [
      ,
      ,
      [
        {x: 520, y: 345},
        {x: 646, y: 318},
        ,
        [
          ,
          ,
          {x: 630, y: 438},
          {x: 715, y: 464}
        ]
      ],
    ],
    {x: 434, y: 620},
    [
      [
        [
          {x: 523, y: 519},
          {x: 570, y: 489},
          ,
        ],
        ,
        ,
      ],
      ,
      ,
    ]
  ]);
  test.end();
});
