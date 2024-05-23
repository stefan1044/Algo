class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function arrayToTree(array: Array<number>, index: number): TreeNode | null {
    if (index >= array.length)
        return null;

    const leftIndex = index * 2 + 1;
    const rightIndex = index * 2 + 2;

    const leftNode = arrayToTree(array, leftIndex);
    const rightNode = arrayToTree(array, rightIndex);

    return  new TreeNode(array[index], leftNode, rightNode);
}