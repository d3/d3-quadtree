export default function() {
  var points = [];
  this.visit(function(node) {
    if (node.length === 2) do points.push(node); while (node = node.next)
  });
  return points;
}
