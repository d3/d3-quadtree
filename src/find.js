
//     // Find the closest point to the specified point.
//     // TODO allow the initial search extent to be specified?
//     // TODO allow the initial minimum distance to be specified?
//     // TODO allow searching below any node?
//     root.find = function(x, y) {
//       return find(root, x, y, x1_, y1_, x2_, y2_);
//     };

// export default function() {

// }

// function find(root, x, y, x0, y0, x3, y3) {
//   var minDistance2 = Infinity,
//       closestNode;

//   (function findChild(node, x1, y1, x2, y2) {

//     // Stop searching if this cell can’t contain a closer node.
//     if (x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0) return;

//     // Visit this point.
//     if (node.x != null) {
//       var dx = x - node.x,
//           dy = y - node.y,
//           distance2 = dx * dx + dy * dy;
//       if (distance2 < minDistance2) {
//         var distance = Math.sqrt(minDistance2 = distance2);
//         x0 = x - distance, y0 = y - distance;
//         x3 = x + distance, y3 = y + distance;
//         closestNode = node;
//       }
//     }

//     // bisect the current node
//     var xm = (x1 + x2) / 2,
//         ym = (y1 + y2) / 2,
//         right = x >= xm,
//         below = y >= ym;

//     // visit closest cell first
//     for (var i = below << 1 | right, j = i + 4; i < j; ++i) {
//       if (node = children[i & 3]) switch (i & 3) {
//         case 0: findChild(node, x1, y1, xm, ym); break;
//         case 1: findChild(node, xm, y1, x2, ym); break;
//         case 2: findChild(node, x1, ym, xm, y2); break;
//         case 3: findChild(node, xm, ym, x2, y2); break;
//       }
//     }

//   })(root, x0, y0, x3, y3);

//   return closestNode && closestNode.data;
// }
