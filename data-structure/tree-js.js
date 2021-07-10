class Node {
    constructor(element) {
        this.element = element
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(element) {
        const temp = new Node(element)
        const insertNode = function (root, node) {
            if (node.element > root.element) { // 右插入
                if (root.right === null) {
                    root.right = node
                } else {
                    insertNode(root.right, node)
                }
            } else { // 左插入
                if (root.left === null) {
                    root.left = node
                } else {
                    insertNode(root.left, node)
                }
            }
        }
        if (!this.root) {
            this.root = temp
        } else {
            insertNode(this.root, temp)
        }
    }

    // 中序遍历
    inOrderTraverse(callback) {
        const inOrderTraverseNode = (node, callback) => {
            if (node !== null) {
                inOrderTraverseNode(node.left, callback)
                callback(node.element)
                inOrderTraverseNode(node.right, callback)
            }
        }
        inOrderTraverseNode(this.root, callback)
    }

    // 前序遍历
    preOrderTraverse(callback) {
        const preOrderTraverseNode = function(node, callback) {
            if(node !== null) {
                callback(node.element)
                preOrderTraverseNode(node.left, callback)
                preOrderTraverseNode(node.right, callback)
            }
        }
        preOrderTraverseNode(this.root, callback)
    }

    // 后序遍历
    afterOrderTraverse(callback) {
        const afterOrderTraverseNode = (node, callback) => {
            console.log('node:       ', node)
            // console.log('element:       ', node.element)
            if (node !== null) {
                console.log('if   node:       ', node)
                afterOrderTraverseNode(node.left, callback)
                afterOrderTraverseNode(node.right, callback)
                afterOrderTraverseNode(node.element, callback)
            }
        }
        afterOrderTraverseNode(this.root, callback)
    }

    min() {
        const minNode = node => {
            return node ? (node.left ? minNode(node.left) : node) : null
        }
        return minNode(this.root)
    }

    max() {
        const maxNode = node => {
            return node ? (node.right ? maxNode(node.right) : node) : null
        }
        return maxNode(this.root)
    }

    search(key) {
        const searchNode = (node, key) => {
            if (node === null) return
            if (node.element === key) {
                console.log(node)
                return node
            } else {
                return searchNode((key < node.element) ? node.left : node.right, key)
            }
        }
        searchNode(this.root, key)
    }
}


// 初始化一个BST
const tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
console.log(tree)
// 调用二叉树对应地获取最大最小，以及搜索的方法
// var m = tree.min()
// console.log(m.element)
// var max = tree.max()
// console.log(max)
// var r = tree.search(12)
// console.log(r)
// tree.inOrderTraverse(console.log)
// console.log('--------------------')
// tree.preOrderTraverse(console.log)
// console.log('++++++++++++++++++++')
tree.afterOrderTraverse(console.log)