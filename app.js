// 引入express
const express = require('express')
const fs = require('fs')
const router = require('./router.js')
var bodyParser = require('body-parser')
var session = require('express-session');
// 2.创建应用
const app = express()
// 3.添加端口监听
app.listen(4444, () => {
    console.log('http://127.0.0.1:4444')
})

// 添加session的配置
app.use(session({
    secret: '随便加字符串内容123', // 加盐：加密，添加一个你自己知道的字符串
    //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
    resave: false,
    //强制“未初始化”的会话保存到存储。 
    saveUninitialized: false,
}))

// 静态资源托管
app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('uploads'))

// 配置Body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置ejs
// 配置让当前app使用ejs做为模板引擎
app.set('view engine', 'ejs')
// 配置ejs资源的默认目录,后期在渲染的时候可以只需要指定相对路径就可以了
// ejs会默认查找views正面的文件做为模板文件,我们这个配置只是想告诉他它所需要的Views目录就是我们当前所设置的views目录
app.set('views', 'views')


// 添加全局路由中间件，当app每次接收到请求的时候都会触发这个中间件
app.use(function (req, res, next) {
    console.log(req.url)
    // 1.有登陆状态
    // 2.去访问登陆页
    // 3.访问前台页面
    if (req.session.isLogin && req.session.isLogin == 'true' || req.url == '/login' || req.url.indexOf('/admin') == -1) {
        // 执行下一个操作
        next()
    }else{
        res.redirect('/login')
    }
})

// 使用路由
app.use(router)

