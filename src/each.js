function Node(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}

export default function(callback) {
  var queue = [], q, node, x0, y0, x1, y1;
  if (this._root) queue.push(new Node(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = queue.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1)) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (node[3]) queue.push(new Node(node[3], xm, ym, x1, y1));
      if (node[2]) queue.push(new Node(node[2], x0, ym, xm, y1));
      if (node[1]) queue.push(new Node(node[1], xm, y0, x1, ym));
      if (node[0]) queue.push(new Node(node[0], x0, y0, xm, ym));
    }
  }
  return this;
}
