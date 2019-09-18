// 引入express
const express = require('express')
const fs = require('fs')
const router = require('./router.js')
// 2.创建应用
const app = express()
// 3.添加端口监听
app.listen(4444,() => {
    console.log('http://127.0.0.1:4444')
})
// 静态资源托管
app.use('/assets',express.static('assets'))
app.use('/uploads',express.static('uploads'))

// 配置ejs
// 配置让当前app使用ejs做为模板引擎
app.set('view engine','ejs')
// 配置ejs资源的默认目录,后期在渲染的时候可以只需要指定相对路径就可以了
// ejs会默认查找views正面的文件做为模板文件,我们这个配置只是想告诉他它所需要的Views目录就是我们当前所设置的views目录
app.set('views','views')

// 使用路由
app.use(router)

