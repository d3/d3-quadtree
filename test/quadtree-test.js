import assert from "assert";
import * as d3 from "../src/index.js";

it("d3.quadtree() creates an empty quadtree", () => {
  const q = d3.quadtree();
  assert(q instanceof d3.quadtree);
  assert.strictEqual(q.visit(function() { throw new Error; }), q);
  assert.strictEqual(q.size(), 0);
  assert.strictEqual(q.extent(), undefined);
  assert.strictEqual(q.root(), undefined);
  assert.deepStrictEqual(q.data(), []);
});

it("d3.quadtree(nodes) is equivalent to d3.quadtree().addAll(nodes)", () => {
  const q = d3.quadtree([[0, 0], [1, 1]]);
  assert(q instanceof d3.quadtree);
  assert.deepStrictEqual(q.root(), [{data: [0, 0]},,, {data: [1, 1]}]);
});

it("d3.quadtree(nodes, x, y) is equivalent to d3.quadtree().x(x).y(y).addAll(nodes)", () => {
  const q = d3.quadtree([{x: 0, y: 0}, {x: 1, y: 1}], function(d) { return d.x; }, function(d) { return d.y; });
  assert(q instanceof d3.quadtree);
  assert.deepStrictEqual(q.root(), [{data: {x: 0, y: 0}},,, {data: {x: 1, y: 1}}]);
});
