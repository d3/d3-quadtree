# d3-quadtree

A [quadtree](https://en.wikipedia.org/wiki/Quadtree) is a two-dimensional recursive spatial subdivision. This implementation uses square partitions, dividing each square into four equally-sized squares. Each point exists in a unique node; if multiple points are in the same position, some points may be stored on internal nodes rather than leaf nodes. Quadtrees can be used to accelerate various spatial operations, such as the Barnes-Hut approximation for computing n-body forces, or collision detection.

<a href="http://bl.ocks.org/mbostock/9078690"><img src="http://bl.ocks.org/mbostock/raw/9078690/thumbnail.png" width="202"></a>
<a href="http://bl.ocks.org/mbostock/4343214"><img src="http://bl.ocks.org/mbostock/raw/4343214/thumbnail.png" width="202"></a>
<a href="http://bl.ocks.org/mbostock/6216724"><img src="http://bl.ocks.org/mbostock/raw/6216724/thumbnail.png" width="202"></a>
<a href="http://bl.ocks.org/mbostock/6224050"><img src="http://bl.ocks.org/mbostock/raw/6224050/thumbnail.png" width="202"></a>
<a href="http://bl.ocks.org/patricksurry/6478178"><img src="http://bl.ocks.org/patricksurry/raw/6478178/thumbnail.png" width="202"></a>
<a href="http://bl.ocks.org/llb4ll/8709363"><img src="http://bl.ocks.org/llb4ll/raw/8709363/thumbnail.png" width="202"></a>

## Installing

If you use NPM, `npm install d3-quadtree`. Otherwise, download the [latest release](https://github.com/d3/d3-quadtree/releases/latest). You can also load directly from [d3js.org](https://d3js.org), either as a [standalone library](https://d3js.org/d3-quadtree.v0.2.min.js) or as part of [D3 4.0 alpha](https://github.com/mbostock/d3/tree/4). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3_quadtree` global is exported:

```html
<script src="https://d3js.org/d3-quadtree.v0.2.min.js"></script>
<script>

var quadtree = d3_quadtree.quadtree();

</script>
```

[Try d3-quadtree in your browser.](https://tonicdev.com/npm/d3-quadtree)

## API Reference

<a name="quadtree" href="#quadtree">#</a> d3.<b>quadtree</b>()

Creates a new [quadtree factory](#_quadtree) with the default [*x*-accessor](#quadtree_x), [*y*-accessor](#quadtree_y) and [extent](#quadtree_extent). The returned factory function can be used to create any number of quadtrees from data.

<a name="_quadtree" href="#_quadtree">#</a> <i>quadtree</i>([<i>data</i>])

Constructs a new quadtree for the specified array of *data*, returning the root node of a new quadtree. The *x*- and *y*-coordinates of each data point are determined using the current [*x*-](#quadtree_x) and [*y*-](#quadtree_y)accessor functions. To build a quadtree by adding points incrementally, the specified *data* array can be empty or omitted and then points can be later [added](#root_add) to the returned root node; in this case, you must explicitly specify the [extent](#quadtree_extent) of the quadtree.

Each node in the quadtree has several properties:

* `nodes` - a sparse array of four child nodes: top-left, top-right, bottom-left, bottom-right.
* `leaf` - a boolean indicating whether this is an internal node or a leaf node.
* `data` - the datum associated with this node, if any; may apply to either internal or leaf nodes.
* `index` - the index of the datum associated with this node, if any; may apply to either internal or leaf nodes.
* `x` - the *x*-coordinate of the associated point, if any.
* `y` - the *y*-coordinate of the associated point, if any.

The returned root node also defines [add](#root_add) and [visit](#root_visit) methods.

<a name="root_find" href="#root_find">#</a> <i>root</i>.<b>find</b>(<i>x</i>, <i>y</i>)

Given a point ⟨*x*,*y*⟩, returns the closest datum in this quadtree.

<a name="root_each" href="#root_each">#</a> <i>root</i>.<b>each</b>(<i>callback</i>)

Visits each node in this quadtree, invoking the specified *callback* with arguments *node*, *x0*, *y0*, *x1*, *y1* for each node, where *node* is the node being visited, ⟨*x0*, *y0*⟩ is the top-left corner, and ⟨*x1*, *y1*⟩ is the bottom-right corner, assuming that positive *x* is right and positive *y* is down. (The coordinate system is arbitrary, so a more precise definition is that *x0* <= *x1* and *y0* <= *y1*. In the typical coordinate system used by SVG and Canvas, the origin ⟨0,0⟩ is in the top-left corner, and thus ⟨*x0*, *y0*⟩ is the top-left corner of the current node.) Returns *root*. Nodes are traversed in pre-order. If the *callback* returns true for a given node, then the children of that node are not visited; otherwise, all child nodes are visited.

<a name="quadtree_x" href="#quadtree_x">#</a> <i>quadtree</i>.<b>x</b>([<i>x</i>])

If *x* is specified, sets the *x*-coordinate accessor and returns this quadtree factory. If *x* is not specified, returns the current *x*-coordinate accessor, which defaults to:

```js
function x(d) {
  return d[0];
}
```

For each point added to the quadtree, the *x*-accessor is invoked, being passed the current datum `d` and index `i`. The *x*-accessor must then return a numeric value indicating the *x*-coordinate of the point corresponding to the given datum. The *x*-accessor may also be defined as a constant number rather than a function, if desired.

<a name="quadtree_y" href="#quadtree_y">#</a> <i>quadtree</i>.<b>y</b>([<i>y</i>])

If *y* is specified, sets the y-coordinate accessor and returns this quadtree factory. If *y* is not specified, returns the current *y*-coordinate accessor, which defaults to:

```js
function y(d) {
  return d[1];
}
```

For each point added to the quadtree, the *y*-accessor is invoked, being passed the current datum `d` and index `i`. The *y*-accessor must then return a numeric value indicating the *y*-coordinate of the point corresponding to the given datum. The *y*-accessor may also be defined as a constant number rather than a function, if desired.

<a name="quadtree_extent" href="#quadtree_extent">#</a> <i>quadtree</i>.<b>extent</b>([<i>extent</i>])

If *extent* is specified, sets the current extent and returns this quadtree factory. If *extent* is not specified, returns the current extent, which defaults to null. When the extent is null, an extent will be computed automatically by scanning the array of input data points passed to the [quadtree constructor](#_quadtree). Otherwise, the *extent* must be specified as a two-dimensional array [​[*x0*, *y0*], [​*x1*, *y1*]​], where *x0* and *y0* are the lower bounds of the extent, and *x1* and *y1* are the upper bounds of the extent. Setting an extent is required when constructing a quadtree lazily from an initially-empty set of nodes.

<a name="quadtree_size" href="#quadtree_size">#</a> <i>quadtree</i>.<b>size</b>([<i>size</i>])

An alias for [*quadtree*.extent](#quadtree_extent) where the minimum *x* and *y* of the extent are ⟨0,0⟩. Given a quadtree factory `q`, this is equivalent to `q.extent([[0, 0], size])`.
