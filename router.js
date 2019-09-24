const express = require('express')
const pagesController = require('./controllers/pagesController.js')
const usersController = require('./controllers/usersController.js')
const postsController = require('./controllers/postsController.js')
const cateContoller = require('./controllers/cateContoller.js')
const uploadController = require('./controllers/uploadController.js')


// 创建路由模块对象
const router = express.Router()
// 添加路由配置
// 添加一个路由配置
// 读取前台首页
// 回调函数:当响应一个路由请求的时候,会自动的调用传入的回调函数,并为回调函数传入两个参数
router.get('/',pagesController.getIndexPage)
      .get('/detail',pagesController.getDetailPage)
      .get('/list',pagesController.getListPage)

      .get('/login',pagesController.getLoginPage)
       // 读取后台首页：约定后台页都以/admin开头
      .get('/admin',pagesController.getAdminIndexPage)
      .get('/admin/categories',pagesController.getAdminCategoriesPage)
      .get('/admin/comments', pagesController.getAdminCommentsPage)
      .get('/admin/posts', pagesController.getAdminPostsPage)
      .get('/admin/nav-menus', pagesController.getAdminNavMenusPage)
      .get('/admin/password-reset', pagesController.getAdminPasswordResetPage)
      .get('/admin/post-add', pagesController.getAdminPostAddPage)
      .get('/admin/profile', pagesController.getAdminProfilePage)
      .get('/admin/slides', pagesController.getAdminSlidesPage)
      .get('/admin/settings', pagesController.getAdminSettingsPage)
      .get('/admin/users', pagesController.getAdminUsersPage)
      //正面的路由是业务处理
      .post('/login',usersController.login)
      .get('/loginOut',usersController.loginOut)


      // 下面的路由配置是业务处理
      .get('/getPostList',postsController.getPostList)
      .post('/addPost',postsController.addPost)
      .get('/getPostById',postsController.getPostById)
      .post('/editPost',postsController.editPost)
      .get('/delPostById',postsController.delPostById)


      .get('/getCateList',cateContoller.getCateList)
      .post('/editCate',cateContoller.editCate)


      // 文件上传
      .post('/uploadFile',uploadController.uploadFile)

// 暴露
module.exports = router