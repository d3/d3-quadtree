var tape = require("tape"),
    d3_quadtree = require("../");

tape("quadtree.remove(point) removes the only point in the quadtree and returns true", function(test) {
  var p0 = {x: 1, y: 1}, q = d3_quadtree.quadtree().add(p0);
  test.equal(q.remove(p0), true);
  test.deepEqual(q, {
    _x0: 1,
    _y0: 1,
    _x1: 1,
    _y1: 1,
    _root: undefined
  });
  test.deepEqual(p0, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) removes a first coincident point at the root in the quadtree and returns true", function(test) {
  var p0 = {x: 1, y: 1}, p1 = {x: 1, y: 1}, q = d3_quadtree.quadtree().add(p0).add(p1);
  test.equal(q.remove(p0), true);
  test.deepEqual(q, {
    _x0: 1,
    _y0: 1,
    _x1: 1,
    _y1: 1,
    _root: {point: {x: 1, y: 1}, next: undefined}
  });
  test.deepEqual(p0, {x: 1, y: 1});
  test.deepEqual(p1, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) removes a first coincident point at the root in the quadtree and returns true", function(test) {
  var p0 = {x: 1, y: 1}, p1 = {x: 1, y: 1}, q = d3_quadtree.quadtree().add(p0).add(p1);
  test.equal(q.remove(p1), true);
  test.deepEqual(q, {
    _x0: 1,
    _y0: 1,
    _x1: 1,
    _y1: 1,
    _root: {point: {x: 1, y: 1}}
  });
  test.deepEqual(p0, {x: 1, y: 1});
  test.deepEqual(p1, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) removes a non-root point in the quadtree and returns true", function(test) {
  var p0 = {x: 0, y: 0}, p1 = {x: 1, y: 1}, q = d3_quadtree.quadtree().add(p0).add(p1);
  test.equal(q.remove(p0), true);
  test.deepEqual(q, {
    _x0: 0,
    _y0: 0,
    _x1: 1,
    _y1: 1,
    _root: [
      undefined,
      ,
      ,
      {point: {x: 1, y: 1}}
    ]
  });
  test.deepEqual(p0, {x: 0, y: 0});
  test.deepEqual(p1, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) removes another non-root point in the quadtree and returns true", function(test) {
  var p0 = {x: 0, y: 0}, p1 = {x: 1, y: 1}, q = d3_quadtree.quadtree().add(p0).add(p1);
  test.equal(q.remove(p1), true);
  test.deepEqual(q, {
    _x0: 0,
    _y0: 0,
    _x1: 1,
    _y1: 1,
    _root: [
      {point: {x: 0, y: 0}},
      ,
      ,
      undefined
    ]
  });
  test.deepEqual(p0, {x: 0, y: 0});
  test.deepEqual(p1, {x: 1, y: 1});
  test.end();
});

tape("quadtree.remove(point) ignores an point not in the quadtree and returns false", function(test) {
  var p0 = {x: 0, y: 0}, p1 = {x: 1, y: 1}, q = d3_quadtree.quadtree().add(p0);
  test.equal(q.remove(p1), false);
  test.deepEqual(q, {
    _x0: 0,
    _y0: 0,
    _x1: 0,
    _y1: 0,
    _root: {point: {x: 0, y: 0}}
  });
  test.end();
});

tape("quadtree.remove(point) ignores a coincident point not in the quadtree and returns false", function(test) {
  var p0 = {x: 0, y: 0}, p1 = {x: 0, y: 0}, q = d3_quadtree.quadtree().add(p0);
  test.equal(q.remove(p1), false);
  test.deepEqual(q, {
    _x0: 0,
    _y0: 0,
    _x1: 0,
    _y1: 0,
    _root: {point: {x: 0, y: 0}}
  });
  test.end();
});
