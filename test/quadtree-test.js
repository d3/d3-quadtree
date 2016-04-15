var tape = require("tape"),
    d3_array = require("d3-array"),
    d3_quadtree = require("../");

tape("quadtree() creates an empty quadtree", function(test) {
  var q = d3_quadtree.quadtree(), count = 0;
  test.ok(q instanceof d3_quadtree.quadtree);
  test.equal(q.visit(function(node, x0, y0, x1, y1) { ++count; }), q);
  test.equal(count, 0);
  test.end();
});

// tape("quadtree(points) returns the root of a new quadtree of the specified points", function(test) {
//   var root = d3_quadtree.quadtree()([[0, 0], [1, 0], [0, 1], [1, 1]]);
//   test.deepEqual(root, {
//     _x0: 0,
//     _y0: 0,
//     _x1: 1,
//     _y1: 1,
//     _root: [
//       leaf(point([0, 0], 0)),
//       leaf(point([1, 0], 1)),
//       leaf(point([0, 1], 2)),
//       leaf(point([1, 1], 3))
//     ]
//   });
//   test.end();
// });

// tape("quadtree(points) handles coincident points by nesting nodes", function(test) {
//   var root = d3_quadtree.quadtree()([[0, 0], [1, 0], [0, 1], [0, 1]]);
//   test.deepEqual(root, {
//     _x0: 0,
//     _y0: 0,
//     _x1: 1,
//     _y1: 1,
//     _root: [
//       leaf(point([0, 0], 0)),
//       leaf(point([1, 0], 1)),
//       leaf(point([0, 1], 2), point([0, 1], 3)),
//     ]
//   });
//   test.end();
// });

// tape("quadtree(points) allows points to contain only a single point", function(test) {
//   var root = d3_quadtree.quadtree()([[0, 0]]);
//   test.deepEqual(root, {
//     _x0: 0,
//     _y0: 0,
//     _x1: 0,
//     _y1: 0,
//     _root: leaf(point([0, 0], 0))
//   });
//   test.end();
// });

// tape("quadtree(points) allows points to be empty", function(test) {
//   var root = d3_quadtree.quadtree()([]);
//   test.ok(isNaN(root._x0));
//   test.ok(isNaN(root._x1));
//   test.ok(isNaN(root._y0));
//   test.ok(isNaN(root._y1));
//   test.strictEqual(root._root, null);
//   test.end();
// });

// tape("d3_quadtree.extent([[x1, y1], [x2, y2]]) squarifies the specified extent", function(test) {
//   var q = d3_quadtree.quadtree();
//   test.equal(q.extent([[8, 10], [56, 47]]), q);
//   test.deepEqual(q.extent(), [[8, 10], [56, 58]]);
//   test.equal(q.extent([[8, 10], [47, 56]]), q);
//   test.deepEqual(q.extent(), [[8, 10], [54, 56]]);
//   test.end();
// });

// tape("d3_quadtree.size([x, y]) is an alias for quadtree().extent([[0, 0], [x, y]])", function(test) {
//   var q = d3_quadtree.quadtree();
//   test.equal(q.size([56, 47]), q);
//   test.deepEqual(q.size(), [56, 56]);
//   test.deepEqual(q.extent(), [[0, 0], [56, 56]]);
//   test.equal(q.size([47, 55]), q);
//   test.deepEqual(q.size(), [55, 55]);
//   test.deepEqual(q.extent(), [[0, 0], [55, 55]]);
//   test.end();
// });

// // tape("root.add(point) adds the specified point to the quadtree", function(test) {
// //   var root = d3_quadtree.quadtree().size([1, 1])().add([0, 0]).add([1, 0]).add([0, 1]).add([1, 1]),
// //       results = [];
// //   root.visit(function() { results.push([].slice.call(arguments)); });
// //   test.deepEqual(results, [
// //     [         root, 0.0, 0.0, 1.0, 1.0],
// //     [root.nodes[0], 0.0, 0.0, 0.5, 0.5],
// //     [root.nodes[1], 0.5, 0.0, 1.0, 0.5],
// //     [root.nodes[2], 0.0, 0.5, 0.5, 1.0],
// //     [root.nodes[3], 0.5, 0.5, 1.0, 1.0]
// //   ]);
// //   test.end();
// // });

// // tape("root.add(point) applies the quadtree’s x- and y-accessors", function(test) {
// //   var x = function(d) { return d.x; },
// //       y = function(d) { return d.y; },
// //       root = d3_quadtree.quadtree().x(x).y(y).size([1, 1])(),
// //       results = [];
// //   [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}].forEach(function(p) { root.add(p); });
// //   root.visit(function() { results.push([].slice.call(arguments)); });
// //   test.deepEqual(results, [
// //     [         root, 0.0, 0.0, 1.0, 1.0],
// //     [root.nodes[0], 0.0, 0.0, 0.5, 0.5],
// //     [root.nodes[1], 0.5, 0.0, 1.0, 0.5],
// //     [root.nodes[2], 0.0, 0.5, 0.5, 1.0],
// //     [root.nodes[3], 0.5, 0.5, 1.0, 1.0]
// //   ]);
// //   test.end();
// // });

// // tape("root.visit(callback) visits each node in a quadtree", function(test) {
// //   var root = d3_quadtree.quadtree()([[0, 0], [1, 0], [0, 1], [1, 1]]),
// //       results = [];
// //   test.equal(root.visit(function() { results.push([].slice.call(arguments)); }), root);
// //   test.deepEqual(results, [
// //     [         root, 0.0, 0.0, 1.0, 1.0],
// //     [root.nodes[0], 0.0, 0.0, 0.5, 0.5],
// //     [root.nodes[1], 0.5, 0.0, 1.0, 0.5],
// //     [root.nodes[2], 0.0, 0.5, 0.5, 1.0],
// //     [root.nodes[3], 0.5, 0.5, 1.0, 1.0]
// //   ]);
// //   test.end();
// // });

// // tape("root.visit(callback) applies pre-order traversal", function(test) {
// //   var root = d3_quadtree.quadtree().size([960, 500])([[100, 100], [200, 200], [300, 300]]),
// //       results = [];
// //   root.visit(function(node, x1, y1, x2, y2) { results.push([node.data, x1, y1, x2, y2]); });
// //   test.deepEqual(results, [
// //     [      null,   0,   0, 960, 960],
// //     [      null,   0,   0, 480, 480],
// //     [      null,   0,   0, 240, 240],
// //     [[100, 100],   0,   0, 120, 120],
// //     [[200, 200], 120, 120, 240, 240],
// //     [[300, 300], 240, 240, 480, 480]
// //   ]);
// //   test.end();
// // });

// // tape("root.visit(callback) does not recurse if the callback returns truthy", function(test) {
// //   var root = d3_quadtree.quadtree().size([960, 500])([[100, 100], [700, 700], [800, 800]]),
// //       results = [];
// //   root.visit(function(node, x1, y1, x2, y2) { results.push([node.data, x1, y1, x2, y2]); return x1 > 0; });
// //   test.deepEqual(results, [
// //     [      null,   0,   0, 960, 960],
// //     [[100, 100],   0,   0, 480, 480],
// //     [      null, 480, 480, 960, 960]
// //   ]);
// //   test.end();
// // });

// // tape("root.visit(callback) on an empty quadtree has degenerate bounds", function(test) {
// //   var root = d3_quadtree.quadtree()([]),
// //       results = [];
// //   root.visit(function() { results.push([].slice.call(arguments)); });
// //   test.deepEqual(results, [
// //     [root, Infinity, Infinity, -Infinity, -Infinity]
// //   ]);
// //   test.end();
// // });

// // tape("root.find(x, y) returns the closest point to the given [x, y]", function(test) {
// //   var dx = 17,
// //       dy = 17,
// //       root = d3_quadtree.quadtree()(d3_array.range(dx * dy).map(function(i) { return [i % dx, i / dx | 0]; }));
// //   test.deepEqual(root.find( 0.1,  0.1), [ 0,  0]);
// //   test.deepEqual(root.find( 7.5,  7.5), [ 7,  7]);
// //   test.deepEqual(root.find( 0.1, 15.9), [ 0, 16]);
// //   test.deepEqual(root.find(15.9, 15.9), [16, 16]);
// //   test.end();
// // });

// // tape("root.find(x, y) works when the quadtre has x- and y-accessors", function(test) {
// //   var dx = 17,
// //       dy = 17,
// //       x = function(d) { return d.x; },
// //       y = function(d) { return d.y; },
// //       root = d3_quadtree.quadtree().x(x).y(y)(d3_array.range(dx * dy).map(function(i) { return {x: i % dx, y: i / dx | 0}; }));
// //   test.deepEqual(root.find( 0.1,  0.1), {x:  0, y:  0});
// //   test.deepEqual(root.find( 7.5,  7.5), {x:  7, y:  7});
// //   test.deepEqual(root.find( 0.1, 15.9), {x:  0, y: 16});
// //   test.deepEqual(root.find(15.9, 15.9), {x: 16, y: 16});
// //   test.end();
// // });

// function point(data, index) {
//   var point = [data[0], data[1]];
//   point.data = data;
//   point.index = index;
//   return point;
// }

// function leaf() {
//   var leaf = {}, point;
//   for (var i = 0, n = arguments.length; i < n; ++i) {
//     point = arguments[i];
//     if (leaf.point) point.next = leaf.point;
//     leaf.point = point;
//   }
//   return leaf;
// }
