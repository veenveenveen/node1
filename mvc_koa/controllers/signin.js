// 处理登录请求POST /signin
var fn_signin = async (ctx, next) => {
    var username = ctx.request.body.username || '';
    var password = ctx.request.body.password || '';
    console.log(`signin with name: ${username}, password: ${password}`);

    if (username === 'himin' && password === '123456') {
        // 登录成功
        ctx.render('signinOk.html',{
            title: 'Sign In Ok',
            name: 'Himin'
        });
    } else {
        // 登录失败
        ctx.render('signinFailed.html', {
            title: 'Sign In Failed'
        });
    }
};

module.exports = {
    'POST /signin' : fn_signin
};

