// 引入express
const express = require('express')
const querystring = require('querystring')
// 2.创建应用
const app = express()
// 3.添加端口监听
app.listen(3333,() => {
    console.log('http://127.0.0.1:3333')
})
app.get('/',(req,res) => {
    console.log(req.headers.cookie)
    var obj = querystring.parse(req.headers.cookie)
    console.log(obj)
    // 如果是后续请求，就显示welcome back -- 访问其它的后台页面
    if(obj.isLogin && obj.isLogin == 'true'){
        res.end('welcome back')
    }else{
        // 如果是第一次访问，就显示first--登陆成功
        res.writeHead(200,{
            'Set-Cookie':'isLogin=true'
        })
        res.end('first')
    }
})