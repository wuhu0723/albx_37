// 这个文件的作用是处理所有的页面请求
const querystring = require('querystring')
module.exports = {
    // 返回前台页面
    // 1.返回前台首页
    getIndexPage(req,res){
        res.render('index.ejs')
    },
    // 2.返回详情页
    getDetailPage(req,res){
        res.render('detail.ejs')
    },
    // 3.返回列表页
    getListPage(req,res){
        res.render('list.ejs')
    },

    // 获取登陆页面
    getLoginPage(req,res){
        res.render('admin/login.ejs')
    },

    // 返回后台页面,做为约定,在后台页面请求之前添加前缀:/admin
    // 1.返回后台首页
    getAdminIndexPage(req,res){
        // var obj = querystring.parse(req.headers.cookie)
        // if(obj.isLogin && obj.isLogin == 'true'){
        //     res.render('admin/index.ejs')
        // }else{
        //     // 给我滚去登陆
        //     // res.writeHead(302,{
        //     //     'Location':'/login'
        //     // })
        //     // res.end()
        //     // 实现重定向
        //     res.redirect('/login')
        // }
        // if(req.session.isLogin && req.session.isLogin == 'true'){
        res.render('admin/index.ejs')
        // }else{
        //     res.redirect('/login')
        // }
    },
    // 2.返回分类页面
    getAdminCategoriesPage(req,res){
        res.render('admin/categories.ejs')
    },
    // ....
    getAdminCommentsPage:(req,res)=>{
        res.render('admin/comments.ejs')
    },
    getAdminPostsPage:(req,res)=>{
        res.render('admin/posts.ejs')
    },
    getNavMenusPage : (req, res) => {
        res.render('admin/nav-menus.ejs')
    },
    getAdminPasswordResetPage : (req, res) => {
        res.render('admin/password-reset.ejs')
    },
    getAdminPostAddPage: (req, res) => {
        res.render('admin/post-add.ejs')
    },
    getAdminProfilePage : (req, res) => {
        res.render('admin/profile.ejs')
    },
    getAdminSettingsPage : (req, res) => {
        res.render('admin/settings.ejs')
    },
    getAdminSlidesPage : (req, res) => {
        res.render('admin/slides.ejs')
    },
    getAdminUsersPage : (req, res) => {
        res.render('admin/users.ejs')
    },
    getAdminNavMenusPage : (req, res) => {
        res.render('admin/nav-menus.ejs')
    }
}