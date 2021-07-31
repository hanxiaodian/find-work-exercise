// setTimeout(() => {
//     console.log('timer1')
//     Promise.resolve().then(function() {
//       console.log('promise1')
//     })
// }, 0)
// setTimeout(() => {
//     console.log('timer2')
//     Promise.resolve().then(function() {
//       console.log('promise2')
//     })
// }, 0)
// (() => console.log(5))();
// // console.log('tongbu func')
// process.nextTick(() => console.log('process nextTick'))

// Promise.resolve().then(() => console.log('promise'))

console.log(1)
setTimeout(function() {
  //settimeout1
  console.log(2)
}, 0);
const intervalId3 = setInterval(function() {
  //setinterval1
  console.log(3)
}, 0)
setTimeout(function() {
  //settimeout2
  console.log(10)
  new Promise(function(resolve) {
    //promise1
    console.log(11)
    resolve()
  })
  .then(function() {
    console.log(12)
  })
  .then(function() {
    console.log(13)
    clearInterval(intervalId3)
  });console.log('是11还是我')
}, 0);

//promise2
Promise.resolve(console.log('我在1后边'))
  .then(function() {
    console.log(7)
  })
  .then(function() {
    console.log(8)
  })
console.log(9)