class Stack {
    constructor () {
        this.items = []
    }

    push(element) {
        this.items.push(element)
    }

    pop() {
        this.items.pop() // array尾部弹出
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

var stack = new Stack()
stack.push(1)
stack.print()
stack.push(2)
stack.print()
stack.push(3)
stack.print()
stack.push(4)
stack.print()
