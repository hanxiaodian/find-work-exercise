function bubbleSort (array) {
    if (!Array.isArray(array)) throw new TypeError('array must be an array')
    const len = array.length
    if (len < 2) return array
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (array[j] > array [i]) {
                const temp = array[i]
                array[i] = array[j]
                array[j] = temp
            }
        }
    }
    return array
}

const testArr = [98,93,99,24,43,2,100,28,1,5]

console.log(bubbleSort(testArr))