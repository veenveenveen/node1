var fs = require('fs');

var rs = fs.createReadStream('1.txt', 'utf-8');

// 读取流
rs.on('data', function (chunk) {
    console.log('Data:');
    console.log(chunk);
});

rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log(err);
});

// 以流的形式写入
var wrs1 = fs.createWriteStream('output1.txt', 'utf-8');
wrs1.write('qwer\n');
wrs1.write('END');
wrs1.end;

var wrs2 = fs.createWriteStream('output2.txt');
wrs2.write(new Buffer('asdfghjkl\n', 'utf-8'));
wrs2.write(new Buffer('end', 'utf-8'));
wrs2.end;

// pipe

var rs = fs.createReadStream('1.txt', 'utf-8');
var ws = fs.createWriteStream('copied.txt', 'utf-8');
rs.pipe(ws);
