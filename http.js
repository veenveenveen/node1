var http = require('http');
var url = require('url');
var path = require('path');

console.log(url.parse('http://127.0.0.1:8080/path/to/file?query=string#hash')); 

// 解析当前目录:
var workDir = path.resolve('.'); // '/Users/michael'
console.log('current path :' + workDir);
// 组合完整的文件路径:当前目录+'pub'+'index.html':
var filePath = path.join(workDir, 'pub', 'index.html');
console.log('filePath :' + filePath);

var server = http.createServer(function (request, response) {
    console.log(request.method+':'+request.url);
    response.writeHead(200,{'Content-Type': 'text/html'});
    response.end('<h1>Hello world!</h1>');
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');