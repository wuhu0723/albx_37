// 这个文件处理所有与网站设置有关的业务
const optionsModel = require('../models/optionsModel.js')
module.exports = {
    // 获取所有导航菜单列表
    getMenuList(req, res) {
        optionsModel.getMenuList((err, data) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: '获取数据失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '获取数据成功',
                    data: JSON.parse(data)
                })
            }
        })
    },
    // 添加导航菜单项
    addMenu(req, res) {
        let obj = req.body
        obj.icon = 'fa fa-gift'

        optionsModel.addMenu(obj, (err) => {
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
    },
    // 删除导航菜单项
    delMenu(req, res) {
        let title = req.query.title

        optionsModel.delMenu(title, (err) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: '删除失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '删除成功'
                })
            }
        })
    },
    // 获取网站设置的内容
    getSiteOptions(req, res) {
        optionsModel.getSiteOptions((err, data) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: '获取数据失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '获取数据成功',
                    data
                })
            }
        })
    },
    // 更新网站设置
    updateSiteOptions(req, res) {
        let obj = req.body
        // 对复选框的数据进行处理
        obj.comment_status = obj.comment_status ? 1 : 0
        obj.comment_reviewed = obj.comment_reviewed ? 1 : 0
        optionsModel.updateSiteOptions(obj, (err) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: '更新失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '更新成功'
                })
            }
        })
    }
}