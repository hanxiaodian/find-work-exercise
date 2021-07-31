function _call (context) {
    context = context || window

    let fn = Symbol('fn')
    context[fn] = this

    let result = eval('context.fn(...args)')

    delete context.fn
    return result
}