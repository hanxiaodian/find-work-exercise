function _apply (context, args) {
    context = context || window
    let fn = Symbol('fn')
    context[fn] = this

    let result = eval('context.fn(args)') // 可以不使用eval

    delete context[fn]
    return result
}