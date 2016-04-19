var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.remove(point) removes the only point in the quadtree and returns true", function(test) {
  var q = d3_quadtree.quadtree(),
      p0 = q.add(1, 1);
  test.equal(q.remove(p0), true);
  test.deepEqual(q.extent(), [[1, 1], [1, 1]]);
  test.deepEqual(q.root(), undefined);
  test.deepEqual(p0, [1, 1]);
  test.end();
});

tape("quadtree.remove(point) removes a first coincident point at the root in the quadtree and returns true", function(test) {
  var q = d3_quadtree.quadtree(),
      p0 = q.add(1, 1),
      p1 = q.add(1, 1);
  test.equal(q.remove(p0), true);
  test.deepEqual(q.extent(), [[1, 1], [1, 1]]);
  test.deepEqual(q.root(), [1, 1]);
  test.deepEqual(p0, [1, 1]);
  test.deepEqual(p1, [1, 1]);
  test.end();
});

tape("quadtree.remove(point) removes another coincident point at the root in the quadtree and returns true", function(test) {
  var q = d3_quadtree.quadtree(),
      p0 = q.add(1, 1),
      p1 = q.add(1, 1);
  test.equal(q.remove(p1), true);
  test.deepEqual(q.extent(), [[1, 1], [1, 1]]);
  test.deepEqual(q.root(), [1, 1]);
  test.deepEqual(p0, [1, 1]);
  test.deepEqual(p1, [1, 1]);
  test.end();
});

tape("quadtree.remove(point) removes a non-root point in the quadtree and returns true", function(test) {
  var q = d3_quadtree.quadtree(),
      p0 = q.add(0, 0),
      p1 = q.add(1, 1);
  test.equal(q.remove(p0), true);
  test.deepEqual(q.extent(), [[0, 0], [1, 1]]);
  test.deepEqual(q.root(), [1, 1]);
  test.deepEqual(p0, [0, 0]);
  test.deepEqual(p1, [1, 1]);
  test.end();
});

tape("quadtree.remove(point) removes another non-root point in the quadtree and returns true", function(test) {
  var q = d3_quadtree.quadtree(),
      p0 = q.add(0, 0),
      p1 = q.add(1, 1);
  test.equal(q.remove(p1), true);
  test.deepEqual(q.extent(), [[0, 0], [1, 1]]);
  test.deepEqual(q.root(), [0, 0]);
  test.deepEqual(p0, [0, 0]);
  test.deepEqual(p1, [1, 1]);
  test.end();
});

tape("quadtree.remove(point) ignores a point not in the quadtree and returns false", function(test) {
  var q0 = d3_quadtree.quadtree(),
      q1 = d3_quadtree.quadtree(),
      p0 = q0.add(0, 0),
      p1 = q1.add(1, 1);
  test.equal(q0.remove(p1), false);
  test.deepEqual(q0.extent(), [[0, 0], [0, 0]]);
  test.deepEqual(q0.root(), [0, 0]);
  test.end();
});

tape("quadtree.remove(point) ignores a coincident point not in the quadtree and returns false", function(test) {
  var q0 = d3_quadtree.quadtree(),
      q1 = d3_quadtree.quadtree(),
      p0 = q0.add(0, 0),
      p1 = q1.add(0, 0);
  test.equal(q0.remove(p1), false);
  test.deepEqual(q0.extent(), [[0, 0], [0, 0]]);
  test.deepEqual(q0.root(), [0, 0]);
  test.end();
});

tape("quadtree.remove(point) removes another point in the quadtree and returns true", function(test) {
  var q = d3_quadtree.quadtree().extent([[0, 0], [959, 959]]);
  q.add(630, 438);
  q.add(715, 464);
  q.add(523, 519);
  q.add(646, 318);
  q.add(434, 620);
  q.add(570, 489);
  q.add(520, 345);
  q.add(459, 443);
  q.add(346, 405);
  q.add(529, 444);
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
        [346, 405],
        [459, 443]
      ]
    ],
    [
      ,
      ,
      [
        [520, 345],
        [646, 318],
        ,
        [
          ,
          ,
          [630, 438],
          [715, 464]
        ]
      ],
    ],
    [434, 620],
    [
      [
        [
          [523, 519],
          [570, 489],
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
