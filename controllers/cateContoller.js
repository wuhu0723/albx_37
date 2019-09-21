// 这个文件主要用于处理所有与categories表相关的业务
const cateModel = require('../models/cateModel.js')
module.exports = {
    // 获取所有分类数据
    getCateList(req,res){
        // 调用数据模块
        cateModel.getCateList((err,data) => {
            if(err){
                res.json({
                    code:400,
                    msg:'获取数据失败'
                })
            }else{
                res.json({
                    code:200,
                    msg:'获取数据成功',
                    data
                })
            }
        })
    }
}