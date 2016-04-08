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
<script src="https://d3js.org/d3-quadtree.v0.3.min.js"></script>
<script>

var quadtree = d3_quadtree.quadtree();

</script>
```

[Try d3-quadtree in your browser.](https://tonicdev.com/npm/d3-quadtree)

## API Reference

<a name="quadtree" href="#quadtree">#</a> d3.<b>quadtree</b>()

Creates a new quadtree generator with the default [*x*-accessor](#quadtree_x), [*y*-accessor](#quadtree_y) and [extent](#quadtree_extent). The returned generator can be used to [create](#_quadtree) any number of quadtree roots from data.

<a name="_quadtree" href="#_quadtree">#</a> <i>quadtree</i>(<i>data</i>)

Constructs a new [quadtree root](#quadtreeRoot) for the specified array of *data*, returning the [root](#quadtreeRoot). The *x*- and *y*-coordinates of each data point are determined using the current [*x*-](#quadtree_x) and [*y*-](#quadtree_y)accessors; each point in the quadtree is represented as a two-element array of numbers [*x*, *y*] with the following additional properties:

* `data` - the datum associated with this node.
* `index` - the index of the datum associated with this node.

<a name="quadtree_x" href="#quadtree_x">#</a> <i>quadtree</i>.<b>x</b>([<i>x</i>])

If *x* is specified, sets the *x*-coordinate accessor and returns this quadtree generator. If *x* is not specified, returns the current *x*-coordinate accessor, which defaults to:

```js
function x(d) {
  return d[0];
}
```

For each point added to the quadtree, the *x*-accessor is invoked, being passed the current datum `d` and index `i`. The *x*-accessor must then return a numeric value indicating the *x*-coordinate of the point corresponding to the given datum. The *x*-accessor may also be defined as a constant number rather than a function, if desired.

<a name="quadtree_y" href="#quadtree_y">#</a> <i>quadtree</i>.<b>y</b>([<i>y</i>])

If *y* is specified, sets the y-coordinate accessor and returns this quadtree generator. If *y* is not specified, returns the current *y*-coordinate accessor, which defaults to:

```js
function y(d) {
  return d[1];
}
```

For each point added to the quadtree, the *y*-accessor is invoked, being passed the current datum `d` and index `i`. The *y*-accessor must then return a numeric value indicating the *y*-coordinate of the point corresponding to the given datum. The *y*-accessor may also be defined as a constant number rather than a function, if desired.

<a name="quadtree_extent" href="#quadtree_extent">#</a> <i>quadtree</i>.<b>extent</b>([<i>extent</i>])

If *extent* is specified, sets the current extent and returns this quadtree generator. The *extent* must be specified as a two-dimensional array [​[*x0*, *y0*], [​*x1*, *y1*]​], where *x0* and *y0* are the inclusive lower bounds of the extent and *x1* and *y1* are the exclusive upper bounds, or null. If *extent* is not specified, returns the current extent, which defaults to null. When the extent is not null, any point outside the extent is ignored when [constructing the quadtree](#_quadtree).

<a name="quadtree_size" href="#quadtree_size">#</a> <i>quadtree</i>.<b>size</b>([<i>size</i>])

If *size* is specified, sets the current extent and returns this quadtree generator. The *size* must be specified as a two-element array of numbers [[​*x1*, *y1*]​], where *x1* and *y1* are the exclusive upper bounds, or null; the lower bounds of the extent are implicitly ⟨0,0⟩. If *size* is not specified, returns the current upper bounds of the extent, which defaults to null. When the extent is not null, any point outside the extent is ignored when [constructing the quadtree](#_quadtree).

This is a convenience method for setting the [extent](#quadtree_extent) when the lower bounds of the extent are ⟨0,0⟩. For example, this:

```js
quadtree.size([960, 500]);
```

Is equivalent to this:

```js
quadtree.extent([[0, 0], [960, 500]]);
```

<a name="quadtreeRoot" href="#quadtreeRoot">#</a> d3.<b>quadtreeRoot</b>()

…

<a name="root_add" href="#root_add">#</a> <i>root</i>.<b>add</b>(<i>point</i>)

Adds the specified new *point* to this quadtree and returns *root*. The point must be represented as a two-element array of numbers [*x*, *y*].

<a name="root_find" href="#root_find">#</a> <i>root</i>.<b>find</b>(<i>x</i>, <i>y</i>)

Given a point ⟨*x*,*y*⟩, returns the closest point in this quadtree.

<a name="root_each" href="#root_each">#</a> <i>root</i>.<b>each</b>(<i>callback</i>)

Visits each node in this quadtree in pre-order traversal, invoking the specified *callback* with arguments *node*, *x0*, *y0*, *x1*, *y1* for each node, where *node* is the node being visited, ⟨*x0*, *y0*⟩ are the lower bounds of the node, and ⟨*x1*, *y1*⟩ are the upper bounds. (Assuming that positive *x* is right and positive *y* is down, as is typically the case in Canvas and SVG, ⟨*x0*, *y0*⟩ is the top-left corner and ⟨*x1*, *y1*⟩ is the lower-right corner; however, the coordinate system is arbitrary, so more formally *x0* <= *x1* and *y0* <= *y1*.) Returns *root*. If the *callback* returns true for a given node, then the children of that node are not visited; otherwise, all child nodes are visited.

Internal nodes of the quadtree are represented as sparse four-element arrays in left-to-right, top-to-bottom order:

* `0` - the top-left quadrant
* `1` - the top-right quadrant
* `2` - the bottom-left quadrant
* `3` - the bottom-right quadrant

Leaf nodes of the quadtree are represent as objects with the following property:

* `point` - a two-element array of numbers [*x*, *y*]

If there are multiple coincident points in the quadtree, then *point*.next forms a linked list of coincident points.
