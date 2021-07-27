function myPromise (constructor) {
    let self = this;
    self.status = "pending" //定义状态改变前的初始状态
    self.value = undefined; //定义状态为resolved的时候的状态
    self.reason = undefined; //定义状态为rejected的时候的状态
    function resolve (value) {
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status === "pending"){
          self.value = value;
          self.status = "resolved";
       }
    }
    function reject (reason) {
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status === "pending"){
          self.reason = reason;
          self.status = "rejected";
       }
    }
    //捕获构造异常
    try {
       constructor(resolve, reject);
    } catch (e) {
       reject(e);
    }
}
// 定义链式调用的then方法
myPromise.prototype.then = function (onFullfilled, onRejected) {
   let self = this;
   switch (self.status) {
      case "resolved":
        onFullfilled(self.value);
        break;
      case "rejected":
        onRejected(self.reason);
        break;
      default:       
   }
}

class Promise {
    constructor (executor) {
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined

        this.onResolvePromises = []
        this.onRejectPromises = []

        let resolve = (value) => {
            if (this.status === 'pending') {
                this.status = 'fulfilled'
                this.value = value
                this.onResolvePromises.forEach(fn => fn())
            }
        }

        let reject = (reason) => {
            if (this.status === 'pending') {
                this.status = 'rejected'
                this.reason = reason
                this.onRejectPromises.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then (onFulfilled, onRejected) {
        typeof onFulfilled === 'function' ? onFulfilled : v => v
        typeof onRejected === 'function' ? onRejected : err => { throw err }

        let promise2 = new Promise((resolve, reject) => {
            if (this.status === 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            }

            if (this.status === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            }

            if (this.status === 'pending') {
                this.onResolvePromises.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0)
                })

                this.onRejectPromises.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0)
                })
            }
        })
    }
}

const resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))

    let called

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(x, y, resolve, reject)
                }, reason => {
                    if (called) return
                    called = true
                    reject(reason)
                })
            } else {
                resolve(x)
            }
        } catch (err) {
            if (called) return
            called = true
            reject(err)
        }
    } else {
        resolve(x)
    }
}
