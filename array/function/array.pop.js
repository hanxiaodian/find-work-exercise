/**
 * @param void
 * @returns value
 * tips:
 * 1.判断当前数组长度是否为零，若是零，数组长度等于0，返回undefined
 * 2.如果数组中有元素，数组长度减一，取出数组的最后一个元素，删除数组的最后一个元素
 * 3.数组长度等于原来长度减一，返回取出的value
 */
function ArrayPop () {
    let O = Object(this)
    let len = O.length >>> 0
    if (len === 0) {
        O.length = 0
        return undefined
    }

    len--
    let value = O[len]
    delete O[len]
    O.length = len
    return value
}