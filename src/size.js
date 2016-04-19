export default function() {
  var size = 0;
  this.visit(function(node) {
    if (node.length === 2) do ++size; while (node = node.next)
  });
  return size;
}
