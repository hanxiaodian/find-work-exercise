function ArrayReduce (callbackFn, initialValue) {
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'reduce' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackfn) !== "[object Function]") {
        throw new TypeError(callbackfn + ' is not a function')
    }

    let O = object(this)
    let len = O.length >>> 0
    let k = 0

    let accumulator = initialValue

    // 初始值不传时的处理
    if (accumulator === undefined) { // accumulator 赋值是数组中第一个元素
        for (; k < len; k++) {
            if (k in O) {
                accumulator = O[k]
                k++
                break
            }
        }
    }

    // 当数组为空的时候的处理，此时也没有初始值
    if (k === len && accumulator === undefined) {
        throw new TypeError('Each element of the array is empty')
    }

    // 有初始值的时候，k为0；没有初始值的时候，k为1
    for (; k < len; k++) {
        if (k in O) {
            // 执行callbackFn，call的第二个以及之后的参数就是map的参数，累加器的值，当前元素值，当前元素索引，数组
            accumulator = callbackFn.call(undefined, accumulator, O[k], k, O)
        }
    }
    return accumulator
}