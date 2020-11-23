export class TreeNode {
  // Property to hold the value of a node
  private _value: number;
  public get value(): number {
    return this._value;
  }
  public set value(v: number) {
    this._value = v;
  }

  // Property to hold reference to the left child node
  private _left: TreeNode | null;
  public get left(): TreeNode | null {
    return this._left;
  }
  public set left(node: TreeNode | null) {
    this._left = node;
  }

  // Property to hold reference to the right child node
  private _right: TreeNode | null;
  public get right(): TreeNode | null {
    return this._right;
  }
  public set right(v: TreeNode | null) {
    this._right = v;
  }

  // Initialize a new node
  constructor(value: number) {
    this._value = value;
    this._left = null;
    this._right = null;
  }
}

export function findMaxPathSum(rootNode: TreeNode | null) {
  if (rootNode === null) return null;

  let maxSum: number = Number.MIN_SAFE_INTEGER;
  recursePathMaxSearch(rootNode);

  return maxSum;
  function recursePathMaxSearch(node: TreeNode | null): number {
    if (node == null) {
      return 0;
    }
    const left: number = Math.max(0, recursePathMaxSearch(node.left));
    const right: number = Math.max(0, recursePathMaxSearch(node.right));
    maxSum = Math.max(maxSum, left + node.value + right);
    return Math.max(left, right) + node.value;
  }
}
