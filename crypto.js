var crypto = require('crypto');
var fs = require('fs');

// MD5和SHA1
var hash = crypto.createHash('md5');

hash.update('hello js');
hash.update('study11');

console.log(hash.digest('hex'));

// Hmac
var hmac = crypto.createHmac('md5', 'key1');
hmac.update('hello js');
hmac.update('study11');
console.log(hmac.digest('hex'));

// AES

function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);

// Diffie-Hellman DH算法是一种密钥交换协议

// RSA

// 从文件加载key

function loadKey(file) {
    return fs.readFileSync(file, 'utf8');
}

var prvKey = loadKey('./rsa/rsa-prv.pem');
var pubKey = loadKey('./rsa/rsa-pub.pem');
var message = 'hello js';

// 使用私钥加密
var enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, 'utf8'));
console.log('私钥加密: ' + enc_by_prv.toString('hex'));

var dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv);
console.log('公钥解密: ' + dec_by_pub.toString('utf8') + '\n');

// 使用公钥加密
var enc_by_pub = crypto.publicEncrypt(pubKey, Buffer.from(message, 'utf8'));
console.log('公钥加密: ' + enc_by_pub.toString('hex'));

var dec_by_prv = crypto.publicDecrypt(prvKey, enc_by_prv);
console.log('私钥解密: ' + dec_by_prv.toString('utf8'));