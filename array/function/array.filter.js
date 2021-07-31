/**
 * @param {*} callbackFn 
 * @param {*} thisArg 
 * @returns array
 * tips:
 * 1.进行callbackFn和数组的检查
 * 2.创建新数组，和新数组长度
 * 3.对数组中的每个元素执行回调，回调结果为true的元素加到新数组当中，并且新数组长度加一
 * 4.返回新数组
 */
function ArrayFilter (callbackFn, thisArg) {
    // 处理数组类型异常
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'filter' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
        throw new TypeError(callbackfn + ' is not a function')
    }

    let O = Object(this)
    let len = O.length >>> 0
    let resLen = 0
    let res = []

    for (let i = 0; i < len; i++) {
        if (k in O) {
            let element = O[k]
            if (callbackFn.call(thisArg, O[k], k, O)) {
                res[resLen++] = element
            }
        }
    }

    return res
}