function heapSort(array) {
    var len = array.length
    var k = 0

    function swap (i, j) {
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

    function max_heapify (start, end) {
        var dad = start
        var son = dad * 2 + 1
        if (son >= end) {
            return
        }

        if (son + 1 < end && array[son] < array[son + 1]) {
            son++
        }

        if (array[dad] <= array[son]) {
            swap(dad, son)
            max_heapify(son, end)
        }
    }

    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        max_heapify(i, len)
    }

    for (let j = len - 1; j > k; j--) {
        swap(0, j)
        max_heapify(0, j)
    }
    return array
}

console.log(heapSort([98,93,99,24,43,2,100,28,1,5]))
