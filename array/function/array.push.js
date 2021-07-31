/**
 * @param  {...any} items 
 * @returns {number} newLength
 * tips:
 * 1.判断push完成之后，数组长度是否大于js能表示的最大正整数
 * 2.for循环，将push的元素加入到数组后边
 * 3.返回数组的新长度
 */
function ArrayPush (...items) {
    let O = Object(this)
    let len = O.length >>> 0
    let argCount = items.length >>> 0

    if (len + argCount > 2 ** 53 - 1) { // 2 ** 53 - 1 是 js 能表示的最大正整数的值
        throw new TypeError("The number of array is over the max value restricted!")
    }

    for (let i = 0; i < argCount; i++) {
        O[len + 1] = items[i]
    }

    let newLength = len + argCount
    O.length = newLength

    return newLength
}