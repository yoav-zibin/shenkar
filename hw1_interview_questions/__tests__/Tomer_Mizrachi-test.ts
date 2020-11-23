import {TreeNode, findMaxPathSum} from '../Tomer_Mizrachi';

// natural numbers max path sum is 5+10+4+2= 21
const natural = new TreeNode(5);
natural.left = new TreeNode(10);
natural.left.left = new TreeNode(4);
natural.right = new TreeNode(2);
console.log(natural);
// rational numbers - 7
const rational = new TreeNode(3);
rational.left = new TreeNode(2);
rational.left.left = new TreeNode(-10);
rational.left.left.left = new TreeNode(4);
rational.right = new TreeNode(2);
// negative only - (-3) using one node value -> the closest to 0 is the max
const negative = new TreeNode(-4);
negative.left = new TreeNode(-6);
negative.right = new TreeNode(-3);

test('path of a one node -> zero root tree', () => {
  expect(findMaxPathSum(new TreeNode(0))).toEqual(0);
});

test('path of a null tree node', () => {
  expect(findMaxPathSum(null)).toEqual(null);
});

test('path of a natural numbers tree', () => {
  expect(findMaxPathSum(natural)).toEqual(21);
});

test('path of a rational numbers tree', () => {
  expect(findMaxPathSum(rational)).toEqual(7);
});

test('path of a negative numbers tree', () => {
  expect(findMaxPathSum(negative)).toEqual(-3);
});
