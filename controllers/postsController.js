// 所有与posts表相关的业务处理都在这个文件中实现
const postsModel = require('../models/postsModel.js')
// 引入处理日期格式的第三方模块
var moment = require('moment');
module.exports = {
    // 获取所有文章列表数据
    getPostList(req,res){
        // 接收用户参数
        let query = req.query
        // 调用数据模块进行数据的获取
        postsModel.getPostList(query,(err,data) => {
            if(err){
                res.json({
                    code:400,
                    msg:'数据查询失败'
                })
            }else{
                // 遍历data，将其中的每一个元素对象的created进行合理的日期格式转换
                // moment().format('日期格式') // 将当前日期进行转换
                // moment(你想转换的源格式).format('目标格式')
                // data.forEach((value) => {
                //     value.created = moment(value.created).format('YYYY-MM-DD HH-mm-ss')
                // })
                res.json({
                    code:200,
                    msg:'数据查询成功',
                    data
                })
            }
        })
    },
    // 新增文章
    addPost(req,res){
        var obj = req.body
        obj.id = null
        obj.views = 0
        obj.likes = 0
        obj.user_id = req.session.currentUser.id
        // 调用数据模块
        postsModel.addPost(obj,(err) => {
            if(err){
                res.json({
                    code:400,
                    msg:'新增失败'
                })
            }else{
                res.json({
                    code:200,
                    msg:'新增成功'
                })
            }
        })
    },
    // 根据id获取文章详情
    getPostById(req,res){
        // 接收参数
        let id = req.query.id
        // 调用数据模块获取数据
        postsModel.getPostById(id,(err,data) => {
            if(err){
                res.json({
                    code:400,
                    msg:'数据查询失败'
                })
            }else{
                // 为了配合浏览器端的日期显示，这里需要将日期格式转换为：yyyy-MM-ddThh:mm
                data.created = moment(data.created).format('YYYY-MM-DDTHH:mm')
                res.json({
                    code:200,
                    msg:'数据查询成功',
                    data
                })
            }
        })
    },
    // 实现文章的编辑
    editPost(req,res){
        // 接收参数
        let obj = req.body
        console.log(obj)
        postsModel.editPost(obj,(err) => {
            if(err){
                res.json({
                    code:400,
                    msg:'编辑失败'
                })
            }else{
                res.json({
                    code:200,
                    msg:'编辑成功'
                })
            }
        })
    },
    // 根据文章id删除文章
    delPostById(req,res){
        // 接收参数id
        let id = req.query.id
        postsModel.delPostById(id,(err) =>　{
            if(err){
                res.json({
                    code:400,
                    msg:'删除失败'
                })
            }else{
                res.json({
                    code:200,
                    msg:'删除成功'
                })
            }
        })
    }
}