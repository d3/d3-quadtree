import assert from "assert";
import * as d3 from "../src/index.js";

it("quadtree.y(y) sets the y-accessor used by quadtree.add", () => {
  const q = d3.quadtree().y(y).add({0: 1, y: 2});
  assert.deepStrictEqual(q.extent(), [[1, 2], [2, 3]]);
  assert.deepStrictEqual(q.root(), {data: {0: 1, y: 2}});
});

it("quadtree.y(y) sets the y-accessor used by quadtree.addAll", () => {
  const q = d3.quadtree().y(y).addAll([{0: 1, y: 2}]);
  assert.deepStrictEqual(q.extent(), [[1, 2], [2, 3]]);
  assert.deepStrictEqual(q.root(), {data: {0: 1, y: 2}});
});

it("quadtree.y(y) sets the y-accessor used by quadtree.remove", () => {
  const p0 = {0: 0, y: 1},
      p1 = {0: 1, y: 2},
      q = d3.quadtree().y(y);
  assert.deepStrictEqual(q.add(p0).root(), {data: {0: 0, y: 1}});
  assert.deepStrictEqual(q.add(p1).root(), [{data: {0: 0, y: 1}},,, {data: {0: 1, y: 2}}]);
  assert.deepStrictEqual(q.remove(p1).root(), {data: {0: 0, y: 1}});
  assert.strictEqual(q.remove(p0).root(), undefined);
});

function y(d) {
  return d.y;
}
