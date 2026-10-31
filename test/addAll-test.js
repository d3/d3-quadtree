import assert from "assert";
import {quadtree} from "../src/index.js";

it("quadtree.addAll(data) creates new points and adds them to the quadtree", () => {
  const q = quadtree();
  assert.deepStrictEqual(q.add([0.0, 0.0]).root(), {data: [0, 0]});
  assert.deepStrictEqual(q.add([0.9, 0.9]).root(), [{data: [0, 0]},,, {data: [0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.9, 0.0]).root(), [{data: [0, 0]}, {data: [0.9, 0]},, {data: [0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.0, 0.9]).root(), [{data: [0, 0]}, {data: [0.9, 0]}, {data: [0, 0.9]}, {data: [0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.4, 0.4]).root(), [[{data: [0, 0]},,, {data: [0.4, 0.4]}], {data: [0.9, 0]}, {data: [0, 0.9]}, {data: [0.9, 0.9]}]);
});

it("quadtree.addAll(data) ignores points with NaN coordinates", () => {
  const q = quadtree();
  assert.deepStrictEqual(q.addAll([[NaN, 0], [0, NaN]]).root(), undefined);
  assert.strictEqual(q.extent(), undefined);
  assert.deepStrictEqual(q.addAll([[0, 0], [0.9, 0.9]]).root(), [{data: [0, 0]},,, {data: [0.9, 0.9]}]);
  assert.deepStrictEqual(q.addAll([[NaN, 0], [0, NaN]]).root(), [{data: [0, 0]},,, {data: [0.9, 0.9]}]);
  assert.deepStrictEqual(q.extent(), [[0, 0], [1, 1]]);
});

it("quadtree.addAll(data) ignores invalid coordinates mixed with valid points", () => {
  const a = [0, 0], b = [1, 1];
  const q = quadtree().addAll([a, [NaN, 1], b, [1, NaN]]);
  assert.strictEqual(q.size(), 2);
  assert.deepStrictEqual(q.data(), [a, b]);
});

it("quadtree.addAll(data) ignores invalid points before valid points", () => {
  const a = [0, 0];
  const q = quadtree().addAll([[NaN, 2], a]);
  assert.deepStrictEqual(q.root(), {data: a});
  assert.deepStrictEqual(q.extent(), [[0, 0], [1, 1]]);
});

it("quadtree.addAll(iterable) ignores invalid points mixed with valid points", () => {
  const a = [0, 0];
  const q = quadtree().addAll(new Set([a, [NaN, NaN]]));
  assert.deepStrictEqual(q.data(), [a]);
});

it("quadtree.addAll(data) ignores mixed invalid points when extending a tree", () => {
  const a = [0, 0], b = [1, 1];
  const q = quadtree().add(a);
  assert.strictEqual(q.addAll([b, [2, NaN]]), q);
  assert.deepStrictEqual(q.data(), [a, b]);
  assert.deepStrictEqual(q.extent(), [[0, 0], [2, 2]]);
});

it("quadtree.addAll(data) does not evaluate y for an invalid x", () => {
  const a = [0, 0], b = [NaN, 1];
  let yCalls = 0;
  const q = quadtree().y(d => {
    assert.notStrictEqual(d, b);
    ++yCalls;
    return d[1];
  }).addAll([a, b]);
  assert.deepStrictEqual(q.data(), [a]);
  assert.strictEqual(yCalls, 1);
});

it("quadtree.addAll(data) preserves coerced zero and coincident points", () => {
  const a = [null, "0"], b = [-0, -0];
  const q = quadtree().addAll([a, b]);
  assert.strictEqual(q.size(), 2);
  assert.deepStrictEqual(q.data(), [b, a]);
});

it("quadtree.addAll(data) correctly handles the empty array", () => {
  const q = quadtree();
  assert.deepStrictEqual(q.addAll([]).root(), undefined);
  assert.strictEqual(q.extent(), undefined);
  assert.deepStrictEqual(q.addAll([[0, 0], [1, 1]]).root(), [{data: [0, 0]},,, {data: [1, 1]}]);
  assert.deepStrictEqual(q.addAll([]).root(), [{data: [0, 0]},,, {data: [1, 1]}]);
  assert.deepStrictEqual(q.extent(), [[0, 0], [2, 2]]);
});

it("quadtree.addAll(data) computes the extent of the data before adding", () => {
  const q = quadtree().addAll([[0.4, 0.4], [0, 0], [0.9, 0.9]]);
  assert.deepStrictEqual(q.root(), [[{data: [0, 0]},,, {data: [0.4, 0.4]}],,, {data: [0.9, 0.9]}]);
});

it("quadtree.addAll(iterable) adds points from an iterable", () => {
  const q = quadtree().addAll(new Set([[0.4, 0.4], [0, 0], [0.9, 0.9]]));
  assert.deepStrictEqual(q.root(), [[{data: [0, 0]},,, {data: [0.4, 0.4]}],,, {data: [0.9, 0.9]}]);
});

it("quadtree(iterable) adds points from an iterable", () => {
  const q = quadtree(new Set([[0.4, 0.4], [0, 0], [0.9, 0.9]]));
  assert.deepStrictEqual(q.root(), [[{data: [0, 0]},,, {data: [0.4, 0.4]}],,, {data: [0.9, 0.9]}]);
});
