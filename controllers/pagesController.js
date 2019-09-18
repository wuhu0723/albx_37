// 这个文件的作用是处理所有的页面请求
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

    // 返回后台页面,做为约定,在后台页面请求之前添加前缀:/admin
    // 1.返回后台首页
    getAdminIndexPage(req,res){
        res.render('admin/index.ejs')
    },
    // 2.返回分类页面
    getAdminCategoriesPage(req,res){
        res.render('admin/categories.ejs')
    }
    // ....
}