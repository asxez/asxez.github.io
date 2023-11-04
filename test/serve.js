/*
* 测试服务端
* 使用时将本文件置于根目录（即index.html目录）
* 访问端口时需带上文件名
* http://localhost:1314/index.html
* */


const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>404 Not Found</h1>');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});

const port = 1314;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
