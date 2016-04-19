var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.remove(point) removes the only point in the quadtree and returns true", function(test) {
  var p0 = [1, 1], q = d3_quadtree.quadtree().add(p0);
  test.equal(q.remove(p0), true);
  test.deepEqual(q, {
    _x0: 1,
    _y0: 1,
    _x1: 1,
    _y1: 1,
    _root: undefined
  });
  test.deepEqual(p0, [1, 1]);
  test.end();
});

tape("quadtree.remove(point) removes a first coincident point at the root in the quadtree and returns true", function(test) {
  var p0 = [1, 1], p1 = [1, 1], q = d3_quadtree.quadtree().add(p0).add(p1);
  test.equal(q.remove(p0), true);
  test.deepEqual(q, {
    _x0: 1,
    _y0: 1,
    _x1: 1,
    _y1: 1,
    _root: {point: [1, 1], next: undefined}
  });
  test.deepEqual(p0, [1, 1]);
  test.deepEqual(p1, [1, 1]);
  test.end();
});

tape("quadtree.remove(point) removes a first coincident point at the root in the quadtree and returns true", function(test) {
  var p0 = [1, 1], p1 = [1, 1], q = d3_quadtree.quadtree().add(p0).add(p1);
  test.equal(q.remove(p1), true);
  test.deepEqual(q, {
    _x0: 1,
    _y0: 1,
    _x1: 1,
    _y1: 1,
    _root: {point: [1, 1]}
  });
  test.deepEqual(p0, [1, 1]);
  test.deepEqual(p1, [1, 1]);
  test.end();
});

tape("quadtree.remove(point) removes a non-root point in the quadtree and returns true", function(test) {
  var p0 = [0, 0], p1 = [1, 1], q = d3_quadtree.quadtree().add(p0).add(p1);
  test.equal(q.remove(p0), true);
  test.deepEqual(q, {
    _x0: 0,
    _y0: 0,
    _x1: 1,
    _y1: 1,
    _root: {point: [1, 1]}
  });
  test.deepEqual(p0, [0, 0]);
  test.deepEqual(p1, [1, 1]);
  test.end();
});

tape("quadtree.remove(point) removes another non-root point in the quadtree and returns true", function(test) {
  var p0 = [0, 0], p1 = [1, 1], q = d3_quadtree.quadtree().add(p0).add(p1);
  test.equal(q.remove(p1), true);
  test.deepEqual(q, {
    _x0: 0,
    _y0: 0,
    _x1: 1,
    _y1: 1,
    _root: {point: [0, 0]}
  });
  test.deepEqual(p0, [0, 0]);
  test.deepEqual(p1, [1, 1]);
  test.end();
});

tape("quadtree.remove(point) ignores an point not in the quadtree and returns false", function(test) {
  var p0 = [0, 0], p1 = [1, 1], q = d3_quadtree.quadtree().add(p0);
  test.equal(q.remove(p1), false);
  test.deepEqual(q, {
    _x0: 0,
    _y0: 0,
    _x1: 0,
    _y1: 0,
    _root: {point: [0, 0]}
  });
  test.end();
});

tape("quadtree.remove(point) ignores a coincident point not in the quadtree and returns false", function(test) {
  var p0 = [0, 0], p1 = [0, 0], q = d3_quadtree.quadtree().add(p0);
  test.equal(q.remove(p1), false);
  test.deepEqual(q, {
    _x0: 0,
    _y0: 0,
    _x1: 0,
    _y1: 0,
    _root: {point: [0, 0]}
  });
  test.end();
});

tape("quadtree.remove(point) removes another point in the quadtree and returns true", function(test) {
  var q = d3_quadtree.quadtree([[0, 0], [959, 959]])
      .add([630, 438])
      .add([715, 464])
      .add([523, 519])
      .add([646, 318])
      .add([434, 620])
      .add([570, 489])
      .add([520, 345])
      .add([459, 443])
      .add([346, 405])
      .add([529, 444]);
  test.equal(q.remove(q.find(546, 440)), true);
  test.deepEqual(q, {
    _x0: 0,
    _y0: 0,
    _x1: 959,
    _y1: 959,
    _root: [
      [
        ,
        ,
        ,
        [
          ,
          ,
          {point: [346, 405]},
          {point: [459, 443]}
        ]
      ],
      [
        ,
        ,
        [
          {point: [520, 345]},
          {point: [646, 318]},
          undefined,
          [
            ,
            ,
            {point: [630, 438]},
            {point: [715, 464]}
          ]
        ],
      ],
      {point: [434, 620]},
      [
        [
          [
            {point: [523, 519]},
            {point: [570, 489]},
            ,
          ],
          ,
          ,
        ],
        ,
        ,
      ]
    ]
  });
  test.end();
});
