function compose (middlewares) {
    if (!Array.isArray(middlewares)) throw new TypeError('Middleware stack must be an array!')

    for (let fn in middlewares) {
        if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
    }

    return function (context, next) {
        let index = -1
        function dispatch (i) {
            if (i <= index) { // 保证一个中间件不能执行两次
                return Promise.reject(new Error('next() called multiple times'))
            }

            index = i
            let fn = middlewares[i]
            if (i === middlewares.length) fn = next
            if (!fn) return Promise.resolve()

            try {
                // 执行当前 fn，并且将下一个中间件，赋值给 next
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
            } catch (err) {
                return Promise.reject(err)
            }
        }
        dispatch(0)
    }
}