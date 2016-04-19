# d3-quadtree

A [quadtree](https://en.wikipedia.org/wiki/Quadtree) recursively partitions two-dimensional space into squares, dividing each square into four equally-sized squares. Each distinct point exists in a unique leaf [node](#nodes); coincident points are represented by a linked list. Quadtrees can accelerate various spatial operations, such as the [Barnes–Hut approximation](https://en.wikipedia.org/wiki/Barnes–Hut_simulation) for computing many-body forces, collision detection, and searching for nearby points.

<a href="http://bl.ocks.org/mbostock/9078690"><img src="http://bl.ocks.org/mbostock/raw/9078690/thumbnail.png" width="202"></a>
<a href="http://bl.ocks.org/mbostock/4343214"><img src="http://bl.ocks.org/mbostock/raw/4343214/thumbnail.png" width="202"></a>
<a href="http://bl.ocks.org/mbostock/6216724"><img src="http://bl.ocks.org/mbostock/raw/6216724/thumbnail.png" width="202"></a>
<a href="http://bl.ocks.org/mbostock/6224050"><img src="http://bl.ocks.org/mbostock/raw/6224050/thumbnail.png" width="202"></a>
<a href="http://bl.ocks.org/patricksurry/6478178"><img src="http://bl.ocks.org/patricksurry/raw/6478178/thumbnail.png" width="202"></a>
<a href="http://bl.ocks.org/llb4ll/8709363"><img src="http://bl.ocks.org/llb4ll/raw/8709363/thumbnail.png" width="202"></a>

## Installing

If you use NPM, `npm install d3-quadtree`. Otherwise, download the [latest release](https://github.com/d3/d3-quadtree/releases/latest). You can also load directly from [d3js.org](https://d3js.org), either as a [standalone library](https://d3js.org/d3-quadtree.v0.5.min.js) or as part of [D3 4.0 alpha](https://github.com/mbostock/d3/tree/4). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3_quadtree` global is exported:

```html
<script src="https://d3js.org/d3-quadtree.v0.5.min.js"></script>
<script>

var quadtree = d3_quadtree.quadtree();

</script>
```

[Try d3-quadtree in your browser.](https://tonicdev.com/npm/d3-quadtree)

## API Reference

<a name="quadtree" href="#quadtree">#</a> d3.<b>quadtree</b>()

Creates a new, empty quadtree with the default [*x*-accessor](#quadtree_x) and [*y*-accessor](#quadtree_y) and an empty [extent](#quadtree_extent).

<a name="quadtree_x" href="#quadtree_x">#</a> <i>quadtree</i>.<b>x</b>([<i>x</i>])

If *x* is specified, sets this quadtree’s *x*-coordinate accessor to the specified function or constant and returns this quadtree. If *x* is not specified, returns the current *x*-accessor, which defaults to:

```js
function x(d) {
  return d[0];
}
```

The accessor is passed any arguments passed to [*quadtree*.add](#quadtree_add) to compute the *x*-coordinate of the added point.

<a name="quadtree_y" href="#quadtree_y">#</a> <i>quadtree</i>.<b>y</b>([<i>y</i>])

If *y* is specified, sets this quadtree’s *y*-coordinate accessor to the specified function or constant and returns this quadtree. If *y* is not specified, returns the current *y*-accessor, which defaults to:

```js
function y(d) {
  return d[1];
}
```

The accessor is passed any arguments passed to [*quadtree*.add](#quadtree_add) to compute the *y*-coordinate of the added point.

<a name="quadtree_extent" href="#quadtree_extent">#</a> <i>quadtree</i>.<b>extent</b>([*extent*])

If *extent* is specified, this quadtree is expanded to cover the specified points [[*x0*, *y0*], [*x1*, *y1*]], and this quadtree is returned. If *extent* is not specified, returns this quadtree’s current extent [[*x0*, *y0*], [*x1*, *y1*]], where *x0* and *y0* are the inclusive lower bounds and *x1* and *y1* are the inclusive upper bounds, or undefined if this quadtree has no extent. The extent may be expanded automatically by calling [*quadtree*.cover](#quadtree_cover) or [*quadtree*.add](#quadtree_add).

<a name="quadtree_root" href="#quadtree_root">#</a> <i>quadtree</i>.<b>root</b>()

Returns the root [node](#nodes) of the quadtree.

<a name="quadtree_cover" href="#quadtree_cover">#</a> <i>quadtree</i>.<b>cover</b>(<i>x</i>, <i>y</i>)

Expands this quadtree to cover the specified point ⟨*x*,*y*⟩, and returns this quadtree. If this quadtree’s extent already covers the specified point, this method does nothing. If this quadtree has a defined and non-trivial extent, the extent is repeatedly doubled to cover the specified point, wrapping the [root node](#quadtree_root) as necessary; if this quadtree has trivial bounds, *i.e.* if the lower bound ⟨*x0*,*y0*⟩ and upper bound ⟨*x1*,*y1*⟩ are coincident, the extent is expanded to cover the specified point exactly; otherwise, if the quadtree has no extent, the extent is initialized to the trivial extent [[*x*, *y*], [*x*, *y*]].

<a name="quadtree_add" href="#quadtree_add">#</a> <i>quadtree</i>.<b>add</b>(<i>arguments…</i>)

Adds a new point ⟨*x*,*y*⟩ to this quadtree by invoking the [*x*-accessor](#quadtree_x) and [*y*-accessor](#quadtree_y) with the specified arguments. Returns the new point.

If the new point is outside the current [extent](#quadtree_extent) of this quadtree, this quadtree is automatically expanded to [cover](#quadtree_cover) the new point.

<a name="quadtree_remove" href="#quadtree_remove">#</a> <i>quadtree</i>.<b>remove</b>(<i>point</i>)

Removes the specified *point* from this quadtree, returning true if the point was removed or false if this quadtree did not contain the specified point.

<a name="quadtree_copy" href="#quadtree_copy">#</a> <i>quadtree</i>.<b>copy</b>()

Returns a copy of this quadtree. All [nodes](#nodes) in the returned quadtree are identical copies of the corresponding node in this quadtree; however, the point objects are shared between the original and the copy.

<a name="quadtree_size" href="#quadtree_size">#</a> <i>quadtree</i>.<b>size</b>()

Returns the total number of points in the quadtree.

<a name="quadtree_points" href="#quadtree_points">#</a> <i>quadtree</i>.<b>points</b>()

Returns an array of all points in the quadtree.

<a name="quadtree_find" href="#quadtree_find">#</a> <i>quadtree</i>.<b>find</b>(<i>x</i>, <i>y</i>)

Given a point ⟨*x*,*y*⟩, returns the closest point in this quadtree. If this quadtree is empty, returns undefined.

<a name="quadtree_visit" href="#quadtree_visit">#</a> <i>quadtree</i>.<b>visit</b>(<i>callback</i>)

Visits each [node](#nodes) in this quadtree in pre-order traversal, invoking the specified *callback* with arguments *node*, *x0*, *y0*, *x1*, *y1* for each node, where *node* is the node being visited, ⟨*x0*, *y0*⟩ are the lower bounds of the node, and ⟨*x1*, *y1*⟩ are the upper bounds, and returns this quadtree. (Assuming that positive *x* is right and positive *y* is down, as is typically the case in Canvas and SVG, ⟨*x0*, *y0*⟩ is the top-left corner and ⟨*x1*, *y1*⟩ is the lower-right corner; however, the coordinate system is arbitrary, so more formally *x0* <= *x1* and *y0* <= *y1*.)

If the *callback* returns true for a given node, then the children of that node are not visited; otherwise, all child nodes are visited. This can be used to quickly visit only parts of the tree, for example when using the [Barnes–Hut approximation](https://en.wikipedia.org/wiki/Barnes–Hut_simulation). Note, however, that child quadrants are always visited in sibling order: top-left, top-right, bottom-left, bottom-right. In cases such as [search](#quadtree_find), visiting siblings in a specific order may be faster.

<a name="quadtree_visitAfter" href="#quadtree_visitAfter">#</a> <i>root</i>.<b>visitAfter</b>(<i>callback</i>)

Visits each [node](#nodes) in this quadtree in post-order traversal, invoking the specified *callback* with arguments *node*, *x0*, *y0*, *x1*, *y1* for each node, where *node* is the node being visited, ⟨*x0*, *y0*⟩ are the lower bounds of the node, and ⟨*x1*, *y1*⟩ are the upper bounds, and returns this quadtree. (Assuming that positive *x* is right and positive *y* is down, as is typically the case in Canvas and SVG, ⟨*x0*, *y0*⟩ is the top-left corner and ⟨*x1*, *y1*⟩ is the lower-right corner; however, the coordinate system is arbitrary, so more formally *x0* <= *x1* and *y0* <= *y1*.) Returns *root*.

### Nodes

Internal nodes of the quadtree are represented as four-element arrays in left-to-right, top-to-bottom order:

* `0` - the top-left quadrant, if any
* `1` - the top-right quadrant, if any
* `2` - the bottom-left quadrant, if any
* `3` - the bottom-right quadrant, if any

A child quadrant may be undefined if it is empty.

Leaf nodes are represented as a linked-list of point objects with the following properties:

* `x` - the *x*-coordinate of the point, as computed by the [*x*-accessor](#quadtree_x)
* `y` - the *y*-coordinate of the point, as computed by the [*y*-accessor](#quadtree_y)
* `next` - the next point in this leaf, if any

The `length` property may be used to distinguish leaf nodes from internal nodes: it is undefined for leaf nodes, and has the value 4 for internal nodes. For example, to iterate over all points in a leaf node:

```js
if (!node.length) do console.log(node); while (node = node.next)
```

The point’s *x*- and *y*-coordinates **must not be modified** while the point is in the quadtree. To update a point’s position, [remove](#quadtree_remove) the point and then re-add it to the quadtree. Alternatively, you may discard the existing quadtree entirely and create a new one from scratch.
