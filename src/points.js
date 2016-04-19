export default function() {
  var points = [];
  this.visit(function(node) {
    if (node.point) do points.push(node.point);
    while (node = node.next);
  });
  return points;
}
