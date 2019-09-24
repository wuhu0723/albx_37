// 这个文件专门用于处理分类相关的数据操作
const mysql = require('mysql')
// 创建连接对象
const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'baixiu'
})

module.exports = {
    // 获取所有分类数据
    getCateList(callback) {
        var sql = `select * from categories`
        conn.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null, results)
            }
        })
    },
    // 实现分类数据的编辑提交
    editCate(obj, callback) {
        let sql = 'update categories set ? where id = ?'
        conn.query(sql, [obj, obj.id], (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    // 实现分类数据的添加
    addCate(obj, callback) {
        let sql = 'insert into categories set ?'
        conn.query(sql, obj, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    // 实现分类数据的删除
    delCateById(id, callback) { // id:1,2,3
        let sql = `delete from categories where id in (${id})`
        // let sql = 'delete from categories where id = ?'
        // let sql = 'delete from categories where id in (?)'
        conn.query(sql, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }
}