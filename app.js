// 引入express
const express = require('express')
const fs = require('fs')
// 2.创建应用
const app = express()
// 3.添加端口监听
app.listen(4444,() => {
    console.log('http://127.0.0.1:4444')
})
// 静态资源托管
app.use('/assets',express.static('assets'))
app.use('/uploads',express.static('uploads'))

// 添加一个路由配置
// 读取前台首页
app.get('/',(req,res)=>{
    fs.readFile(__dirname+"/views/index.html",(err,data)=>{
        if(err){
            res.end('err')
        }else{
            res.end(data)
        }
    })
})

// 读取后台首页：约定后台页都以/admin开头
app.get('/admin',(req,res)=>{
    fs.readFile(__dirname+"/views/admin/index.html",(err,data)=>{
        if(err){
            res.end('err')
        }else{
            res.end(data)
        }
    })
})