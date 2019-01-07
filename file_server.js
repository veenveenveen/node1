var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');

// 获取当前目录:
var workDir = path.resolve('.'); // '/Users/michael'
console.log('current path :' + workDir + '\n');

// 创建服务器
var server = http.createServer(function (request, response) {
    // 获取请求文件路径
    var pathName = url.parse(request.url).pathname;
    // 获取本地文件路径
    var filePath = path.join(workDir,pathName);
    console.log('filePath :' + filePath + '\n');

    fs.stat(filePath, function(err,stat) {
        if (!err && stat.isFile())  {
            console.log('200 ' + request.url + '\n');
            response.writeHead(200);

            // 将文件流导向response
            fs.createReadStream(filePath).pipe(response);

            if (stat.isFile()) {
                // 文件大小:
                console.log('size: ' + stat.size);
                // 创建时间, Date对象:
                console.log('birth time: ' + stat.birthtime);
                // 修改时间, Date对象:
                console.log('modified time: ' + stat.mtime);
            }
        } else if (!err && stat.isDirectory()) {
            console.log('200 目录\n');
            var indexPath = path.join(filePath,'index.html');
            
            //检查文件是否存在
            fs.exists(indexPath, function (exists) {
                if (exists) {
                    console.log('index.html 存在');
                    // 将文件流导向response
                    fs.createReadStream(indexPath).pipe(response);
                } else {
                    console.log('index.html 不存在');

                    var defaultPath = path.join(filePath,'default.html');
                    fs.exists(defaultPath, function (exists) {
                        if (exists) {
                            console.log('default.html 存在');
                            // 将文件流导向response
                            fs.createReadStream(defaultPath).pipe(response);
                        }  else {
                            console.log('default.html 不存在');
                        }
                    });
                }
            });
        } else {
            // 出错了或者文件不存在:
            console.log('404 ' + request.url + '\n');
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');