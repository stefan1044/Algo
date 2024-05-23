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

function treeToArray(root: TreeNode | null): Array<number | null> {
    if (root == null)
        return [];

    const array: Array<number | null> = new Array<number | null>();
    const queue: Array<{node: TreeNode, index: number}> = new Array<{node: TreeNode, index: number}>();
    queue.push({
        node: root,
        index: 0
    })

    while (queue.length > 0) {
        const currentElement = queue.shift()!;
        array[currentElement.index] = currentElement.node.val;

        if (currentElement.node.left == null)
            array[currentElement.index * 2 + 1] = null;
        else
            queue.push({
                node: currentElement.node.left,
                index: currentElement.index * 2 + 1
            });

        if (currentElement.node.right == null)
            array[currentElement.index * 2 + 2] = null;
        else
            queue.push({
                node: currentElement.node.right,
                index: currentElement.index * 2 + 2
            });
    }

    return array;
}