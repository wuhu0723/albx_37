// 引入express
const express = require('express')
const querystring = require('querystring')
var session = require('express-session');
// 2.创建应用
const app = express()
// 3.添加端口监听
app.listen(3333, () => {
    console.log('http://127.0.0.1:3333')
})

// 添加session的配置
app.use(session({
    secret: '随便加字符串内容', // 加盐：加密，添加一个你自己知道的字符串
    //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
    resave: false,
    //强制“未初始化”的会话保存到存储。 
    saveUninitialized: false,
}))

app.get('/', (req, res) => {
    // session的操作都是使用req.session来进行处理，req.session是一个对象
    // session默认是存储在服务器且大小没有限制，意味着它不会默认以Session的方式实现状态的保持，意味着如果你想使用session来实现状态保持你得告诉它，这个时候我们就需要使用到一个中间件了
    console.log(req.session)
    if(req.session.isLogin && req.session.isLogin == 'true'){
        res.end('welcome back')
    }
    // 如果是后续请求，就显示welcome back -- 访问其它的后台页面
    // 如果是第一次访问，就显示first--登陆成功
    else{
        req.session.isLogin = 'true'
        req.session.currentUser = {name:'jack',age:20}
        res.end('first')
    }
})