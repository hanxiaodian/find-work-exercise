function mergeSort (array) {
    const merge = (right, left) => {
        const result = []
        let il = 0
        let ir = 0
        while (il < left.length && ir < right.length) {
            if (left[il] < right[ir]) {
                result.push(left[il++])
            } else {
                result.push(right[ir++])
            }
        }

        while(il < left.length) {
            result.push(left[il++])
        }

        while(ir < right.length) {
            result.push(right[ir++])
        }
        return result
    }

    const merge_sort = array => {
        if (array.length < 2) return array
        const mid = Math.floor(array.length / 2)
        const left = array.slice(0, mid)
        const right = array.slice(mid, array.length)

        return merge(mergeSort(left), mergeSort(right))
    }

    return merge_sort(array)
}

console.log(mergeSort([98,93,99,24,43,2,100,28,1,5]))