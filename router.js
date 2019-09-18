const express = require('express')
const pagesController = require('./controllers/pagesController.js')

// 创建路由模块对象
const router = express.Router()
// 添加路由配置
// 添加一个路由配置
// 读取前台首页
// 回调函数:当响应一个路由请求的时候,会自动的调用传入的回调函数,并为回调函数传入两个参数
router.get('/',pagesController.getIndexPage)
      .get('/detail',pagesController.getDetailPage)
      .get('/list',pagesController.getListPage)

       // 读取后台首页：约定后台页都以/admin开头
      .get('/admin',pagesController.getAdminIndexPage)
      .get('/admin/categories',pagesController.getAdminCategoriesPage)

// router.get('/admin/categories',(req,res)=>{
//     pagesController.getAdminCategoriesPage(req,res)
// })

// 暴露
module.exports = router