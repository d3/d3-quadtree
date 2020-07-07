export default function(x, y, radius, filter) {
  const quadtree = this,
    result = [],
    radius2 = radius * radius,
    accept = filter
      ? d => filter(d) && result.push(d)
      : d => result.push(d);

  quadtree.visit(function(node, x1, y1, x2, y2) {
    if (node.length) {
      return x1 >= x + radius || y1 >= y + radius || x2 < x - radius || y2 < y - radius;
    }

    const dx = +quadtree._x.call(null, node.data) - x,
          dy = +quadtree._y.call(null, node.data) - y;
    if (dx * dx + dy * dy < radius2) {
      do { accept(node.data); } while (node = node.next);
    }
  });
  
  return result;
}
