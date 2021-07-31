function bind (context, ...args) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this
    var fbound = function () {
        return self.apply(this instanceof self ? this : context, args.concat(Array.prototype.splice.call(arguments)))
    }
    fbound.prototype = Object.create(self.prototype)

    return fbound
}