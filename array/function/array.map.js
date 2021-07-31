function ArrayMap (callbackFn, thisArg) {
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'map' of null or undefined")
    }

    if (Object.prototype.toString.call(callbackFn) !== '[object Function') {
        throw new TypeError(`${callbackFn} is not a function`)
    }

    let O = Object(this)
    let T = thisArg

    let len = O.length >>> 0 // 右移0位，保证数组长度是整数
    let A = new Array(len)

    for (let k = 0; k < len; k++) {
        if (k in O) { // in表示在原型链查找
            let kValue = O[k]
            // 执行callbackFn，call的第二个以及之后的参数就是map的参数，当前元素值，当前元素索引，数组
            let mappedValue = callbackFn.call(T, kValue, k, O)
            A[k] = mappedValue
        }
    }
    return A
}