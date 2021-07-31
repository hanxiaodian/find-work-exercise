function _New () {
    var Con = [].shift.call(arguments)
    var obj = Object.create(Con.prototype)

    var ret = Con.apply(obj, arguments)

    return ret instanceof Object ? ret : obj
}

// 1.创建一个空对象
// 2.空对像继承构造函数的prototype
// 3.修改this的指向到这个对象
// 4.如果返回值是一个对象时，就直接返回，否则返回创建的对象