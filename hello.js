'use strict';

// console.log('Helloqq, world.');


var fs = require('fs');

fs.readFile('1.png', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + ' bytes');
        // var text = data.toString('utf-8');
        // console.log(text);
    }
});

fs.readFile('1.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

fs.writeFile('1.txt','123456444',function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok');
    }
});

fs.stat('1.png', function(err,stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});