var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.remove(point) removes the only point in the quadtree and returns true", function(test) {
  var p0 = {x: 1, y: 1}, q = d3_quadtree.quadtree().add(p0);
  test.equal(q.remove(p0), true);
  test.deepEqual(q, {
    x0: 1,
    y0: 1,
    x1: 1,
    y1: 1,
    root: undefined
  });
  test.deepEqual(p0, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) removes a first coincident point at the root in the quadtree and returns true", function(test) {
  var p0 = {x: 1, y: 1}, p1 = {x: 1, y: 1}, q = d3_quadtree.quadtree().add(p0).add(p1);
  test.equal(q.remove(p0), true);
  test.deepEqual(q, {
    x0: 1,
    y0: 1,
    x1: 1,
    y1: 1,
    root: {point: {x: 1, y: 1}, next: undefined}
  });
  test.deepEqual(p0, {x: 1, y: 1});
  test.deepEqual(p1, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) removes a first coincident point at the root in the quadtree and returns true", function(test) {
  var p0 = {x: 1, y: 1}, p1 = {x: 1, y: 1}, q = d3_quadtree.quadtree().add(p0).add(p1);
  test.equal(q.remove(p1), true);
  test.deepEqual(q, {
    x0: 1,
    y0: 1,
    x1: 1,
    y1: 1,
    root: {point: {x: 1, y: 1}}
  });
  test.deepEqual(p0, {x: 1, y: 1});
  test.deepEqual(p1, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) removes a non-root point in the quadtree and returns true", function(test) {
  var p0 = {x: 0, y: 0}, p1 = {x: 1, y: 1}, q = d3_quadtree.quadtree().add(p0).add(p1);
  test.equal(q.remove(p0), true);
  test.deepEqual(q, {
    x0: 0,
    y0: 0,
    x1: 1,
    y1: 1,
    root: {point: {x: 1, y: 1}}
  });
  test.deepEqual(p0, {x: 0, y: 0});
  test.deepEqual(p1, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) removes another non-root point in the quadtree and returns true", function(test) {
  var p0 = {x: 0, y: 0}, p1 = {x: 1, y: 1}, q = d3_quadtree.quadtree().add(p0).add(p1);
  test.equal(q.remove(p1), true);
  test.deepEqual(q, {
    x0: 0,
    y0: 0,
    x1: 1,
    y1: 1,
    root: {point: {x: 0, y: 0}}
  });
  test.deepEqual(p0, {x: 0, y: 0});
  test.deepEqual(p1, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) ignores an point not in the quadtree and returns false", function(test) {
  var p0 = {x: 0, y: 0}, p1 = {x: 1, y: 1}, q = d3_quadtree.quadtree().add(p0);
  test.equal(q.remove(p1), false);
  test.deepEqual(q, {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    root: {point: {x: 0, y: 0}}
  });
  test.end();
});

tape("quadtree.remove(point) ignores a coincident point not in the quadtree and returns false", function(test) {
  var p0 = {x: 0, y: 0}, p1 = {x: 0, y: 0}, q = d3_quadtree.quadtree().add(p0);
  test.equal(q.remove(p1), false);
  test.deepEqual(q, {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    root: {point: {x: 0, y: 0}}
  });
  test.end();
});

tape("quadtree.remove(point) removes another point in the quadtree and returns true", function(test) {
  var q = d3_quadtree.quadtree(959, 959)
      .add({x: 630, y: 438})
      .add({x: 715, y: 464})
      .add({x: 523, y: 519})
      .add({x: 646, y: 318})
      .add({x: 434, y: 620})
      .add({x: 570, y: 489})
      .add({x: 520, y: 345})
      .add({x: 459, y: 443})
      .add({x: 346, y: 405})
      .add({x: 529, y: 444});
  test.equal(q.remove(q.find(546, 440)), true);
  test.deepEqual(q, {
    x0: 0,
    y0: 0,
    x1: 959,
    y1: 959,
    root: [
      [
        ,
        ,
        ,
        [
          ,
          ,
          {point: {x: 346, y: 405}},
          {point: {x: 459, y: 443}}
        ]
      ],
      [
        ,
        ,
        [
          {point: {x: 520, y: 345}},
          {point: {x: 646, y: 318}},
          undefined,
          [
            ,
            ,
            {point: {x: 630, y: 438}},
            {point: {x: 715, y: 464}}
          ]
        ],
      ],
      {point: {x: 434, y: 620}},
      [
        [
          [
            {point: {x: 523, y: 519}},
            {point: {x: 570, y: 489}},
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
