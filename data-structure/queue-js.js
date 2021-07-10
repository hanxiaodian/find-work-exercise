class Queue {
    constructor() {
        this.items = []
    }

    enqueue(element) {
        this.items.push(element)
    }

    shift() {
        return this.items.shift() // array头部弹出
    }

    getSize() {
        return this.items.length
    }

    clear() {
        this.items = []
    }

    print() {
        console.log(this.items.toString())
    }
}

// 初始化一个队列
var queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
console.log(queue)
console.log(queue.isEmpty)
console.log(queue.size)