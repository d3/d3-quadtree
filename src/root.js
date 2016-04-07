import Node from "./node";
import root_each from "./each";
// import root_find from "./find";

export default function Root(x0, y0, x1, y1) {
  Node.call(this);

  // Squarify the bounds.
  var dx = x1 - x0, dy = y1 - y0;
  if (isFinite(dx) && isFinite(dy)) {
    if (dx > dy) y1 = y0 + dx;
    else x1 = x0 + dy;
  }

  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}

var rootProto = Root.prototype = Object.create(Node.prototype);
rootProto.each = root_each;
// rootProto.find = root_find;
