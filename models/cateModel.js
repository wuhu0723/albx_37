// 这个文件专门用于处理分类相关的数据操作
const mysql = require('mysql')
// 创建连接对象
const conn = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'baixiu'
})

module.exports = {
    // 获取所有分类数据
    getCateList(callback){
        var sql = `select * from categories`
        conn.query(sql,(err,results) => {
            if(err){
                callback(err)
            }else{
                callback(null,results)
            }
        })
    }
}