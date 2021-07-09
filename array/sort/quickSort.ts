function quickSort (array) {
    if (!Array.isArray(array)) throw new TypeError('array must be an array')
    var quick = function (arr) {
        if (arr.length < 2) return arr
        const index = Math.floor(arr.length >> 1)
        const pirvot = arr.splice(index, 1)[0]
        const left = []
        const right = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > pirvot) {
                right.push(arr[i])
            } else if (arr[i] < pirvot) {
                left.push(arr[i])
            }
        }
        return quick(left).concat([pirvot], quick(right))
    }
    const result = quick(array)
    return result
}

console.log(quickSort([98,93,99,24,43,2,100,28,1,5]))