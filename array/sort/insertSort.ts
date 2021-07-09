function insertSort (array) {
    const len = array.length
    let current
    let prev
    for (let i = 0; i < len; i++){
        current = array[i]
        prev = i - 1
        while (prev >= 0 && array[prev] > current) {
            array[prev + 1] = array[prev]
            prev--
        }
        array[prev+1] = current // while不执行的时候，这个就相当于 array[i] = current
    }
    return array
}

console.log(insertSort([98,93,99,24,43,2,100,28,1,5]))