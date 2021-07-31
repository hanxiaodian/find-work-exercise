const computeStartIndex = (startIndex, len) => {
    if (startIndex < 0) {
        return startIndex + len > 0 ? startIndex + len : 0
    }
    return startIndex >= len ? len : startIndex
}

const computeDeleteCount = (startIndex, len, deleteCount, argumentsLen) => {
    if (argumentsLen === 1) {
        return len - startIndex
    }

    if (deleteCount < 0) {
        return 0
    }

    if (deleteCount > len - startIndex) {
        return len - startIndex
    }

    return deleteCount
}

const spliceDeleteElements = function (array, startIndex, deleteCount, deleteArr) {
    for (let i = 0; i < deleteCount; i++) {
        let index = startIndex + i
        if (index in array) { // 原数组中数据还在，新数组保存需要删除的数据
            let current = array[index]
            deleteArr[i] = current
        }
    }
}

const movePostElements = function (array, startIndex, len, deleteCount, addElements) {
    if (deleteCount === addElements.length) return

    if (deleteCount > addElements.length) { // 新增小于删除元素，向前移动
        for (let i = startIndex + deleteCount; i < len; i++) {
            let fromIndex = i
            let toIndex = i - (deleteCount - addElements.length);

            if (fromIndex in array) {
                array[toIndex] = array[fromIndex]
            } else {
                delete array[fromIndex]
            }
        }

        // 把后面的元素向前挪，相当于数组长度减小了，需要删除冗余元素
        for (let i = len - 1; i >= len + addElements.length - deleteCount; i --) {
            delete array[i];
        }
    }

    if (deleteCount < addElements.length) { // 新增大于删除，向后移动，并且是倒叙移动
        for (let i = len - 1; i > startIndex + deleteCount; i--) {
            let fromIndex = i
            let toIndex = fromIndex + (addElements.length - deleteCount)
            if (fromIndex in array) {
                a[toIndex] = a[fromIndex]
            } else {
                delete a[fromIndex]
            }
        }
    }
}

function ArraySplice (startIndex, deleteCount, ...addElements) {
    let argumentsLen = arguments.length
    let array = object(this)
    let len = array.length

    startIndex = computeStartIndex(startIndex, len)
    deleteCount = computeDeleteCount(startIndex, len, deleteCount, argumentsLen)

    let deleteArray = new Array(deleteCount)

    // 密封对象:是不可扩展的对象，而且已有成员的[[Configurable]]属性被设置为false，
    // 这意味着不能添加、删除方法和属性。但是属性值是可以修改的。
    if (Object.isSealed(array) && deleteCount !== addElements.length) {
        throw new TypeError('the object is a sealed object!')
    }

    // 冻结对象是最严格的防篡改级别，除了包含密封对象的限制外，还不能修改属性值。
    if(Object.isFrozen(array) && (deleteCount > 0 || addElements.length > 0)) {
        throw new TypeError('the object is a frozen object!')
    }

    // copy 删除的元素
    spliceDeleteElements(array, startIndex, deleteCount, deleteArray)

    // 移动数组
    movePostElements(array, startIndex, len, deleteCount, addElements)

    // 插入新元素
    for (let i = 0; i < addElements.length; i++) {
        array[startIndex + 1] = addElements[i]
    }

    array.length = len - deleteCount + addElements.length
    return deleteArray
}