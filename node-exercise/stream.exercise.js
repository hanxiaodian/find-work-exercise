const fs = require('fs')

const readableStream = fs.createReadStream('./test1.txt')
const writeableStream = fs.createWriteStream('./test2.txt')

readableStream.pipe(writeableStream) // 第二个参数默认为true，即读取结束时终止写入流

// 手动监听读取流结束，读取结束后，写入事件终止
// readableStream.pipe(writeableStream, {
//     end: false
// })

// readableStream.on('end', function () {
//     writeableStream.end('结束')
// })

// 如果可读流期间发生错误，那么可写流将永远不会关闭，因此要监听可读流的错误事件
readableStream.on('error', function (err) {
    console.error('error:   ', err.toString())
    writeableStream.end() // 手动关闭可写流，防止内存泄漏
})