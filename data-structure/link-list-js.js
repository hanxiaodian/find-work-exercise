class Node { // 创建链表的一个新元素
    constructor(element) {
        this.element = element
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.length = 0
    }

    append(element) {
        const node = new Node(element)
        let current = null

        if (this.head === null) {
            this.head = node
        } else {
            current = this.head
            while(current.next) {
                current = current.next
            }
            current.next = node
        }

        this.length++
    }

    insert(position, element) {
        if (position < 0 || position > this.length) {
            return false
        }

        const node = new Node(element)
        let current = this.head
        let previous = null
        let index = 0
        if (position === 0) { // 在原链表的头部插入新节点
            this.head = node
            node.next = current
        } else {
            while(index++ < position) { // 逐个向后查找
                previous = current
                current = current.next
            }
            node.next = current // 将原来索引位置的节点，变到新插入的节点后，剩余节点不变
            previous.next = node // 将原来索引位置前一个节点的 next 连接到新插入节点
        }
        this.length++
        return true
    }

    removeAt(position) {
        if (position < 0 || position > this.length) {
            return false
        }

        let current = this.head
        let previous = null
        let index = 0

        if (position === 0) {
            this.head = current.next
        } else {
            while (index++ < position) {
                previous = current
                current = previous.next
            }
            previous.next = current.next // 修改 next 链接
        }
        this.length--
        return true
    }

    findIndex(element) {
        let current = this.head
        let index = -1

        while(current) {
            if (current.element === element) {
                return index + 1
            }
            index++
            current = current.next
        }
        return -1
    }

    remove(element) {
        const index = this.findIndex(element)
        return this.removeAt(index)
    }

    get size() {
        return this.length
    }

    get isEmpty() {
        return !this.length
    }

    toString() {
        let current = this.head
        let slink = ''

        while(current) {
            slink += `${current.element}-`
            current = current.next
        }

        return slink
    }
}

// 初始化一个链表
let link = new LinkedList()
link.append(1)
link.append(2)
link.append(3)
link.append(4)
console.log(link)
console.log(link.isEmpty)
console.log(link.size)
console.log(link.toString())
link.insert(3, 100)
console.log(link.toString())
console.log(link.findIndex(100))