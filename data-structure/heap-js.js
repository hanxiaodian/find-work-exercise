class Heap {
    constructor () {
        this.items = []
    }

    sink (i) { // 下沉；
        let j = 0
        let temp = this.items[i]
        let len = this.items.length

        while ((j = (i << 1) + 1) < len) {
            if (j < len - 1 && this.items[j] < this.items[j + 1]) {
                j++
            }

            if (this.items[j] > temp) {
                this.items[i] = this.items[j]
                i = j
            } else {
                break
            }
        }
        this.items[i] = temp
    }

    swim (i) { // 上浮
        let temp = this.items[i]
        let par = 0
        while (i > 0) {
            par = (i - 1) >> 1
            if (this.items[par] < temp) {
                this.items[i] = this.items[par]
                i = par
            } else {
                break
            }
        }
        this.items[i] = temp
    }

    push (element) {
        this.items.push(element)
        this.swim(this.items.length - 1)
    }

    shift () {
        const result = this.items.shift()
        this.sink(0)
        return result
    }

    get size() {
        return this.items.length
    }

    print() {
        console.log(this.items.toString())
    }
}

// 初始化一个堆
var heap = new Heap()
heap.push(1)
console.log(heap)
heap.push(3)
console.log(heap)
heap.push(4)
console.log(heap)
heap.push(5)
console.log(heap)
heap.push(6)
console.log(heap)
heap.push(9)
console.log(heap)
// heap.push(4)
// console.log(heap)
// heap.push(1)
// console.log(heap)
// heap.push(3)
// console.log(heap)
// console.log(heap.shift())
// console.log(heap)
// console.log(heap.size)