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

// 配置ejs
// 配置让当前app使用ejs做为模板引擎
app.set('view engine','ejs')
// 配置ejs资源的默认目录,后期在渲染的时候可以只需要指定相对路径就可以了
app.set('views','views')

// 添加一个路由配置
// 读取前台首页
app.get('/',(req,res)=>{
    fs.readFile(__dirname+"/views/index.ejs",(err,data)=>{
        if(err){
            res.end('err')
        }else{
            res.end(data)
        }
    })
})

// 读取后台首页：约定后台页都以/admin开头
app.get('/admin',(req,res)=>{
    // fs.readFile(__dirname+"/views/admin/index.ejs",(err,data)=>{
    // fs.readFile(__dirname+'/views/admin/index.ejs',(err,data)=>{
    //     if(err){
    //         console.log(err)
    //         res.end('err')
    //     }else{
    //         res.end(data)
    //     }
    // })
    // render:读取文件，使用指定的模板引擎渲染，并返回
    res.render('admin/index.ejs')
})

app.get('/admin/categories',(req,res)=>{
    res.render('admin/categories.ejs')
})