export default function() {
  var size = 0;
  this.visit(function(node) {
    if (node.point) do ++size;
    while (node = node.next);
  });
  return size;
}
