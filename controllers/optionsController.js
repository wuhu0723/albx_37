// 这个文件处理所有与网站设置有关的业务
const optionsModel = require('../models/optionsModel.js')
module.exports = {
    // 获取所有导航菜单列表
    getMenuList(req,res){
        optionsModel.getMenuList((err,data) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: '获取数据失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '获取数据成功',
                    data:JSON.parse(data)
                })
            }
        })
    },
    // 添加导航菜单项
    addMenu(req,res){
        let obj = req.body
        obj.icon = 'fa fa-gift'

        optionsModel.addMenu(obj,(err) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: '添加失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '添加成功'
                })
            }
        })
    }
}