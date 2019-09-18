// 这个文件专门用于处理与users表相关的数据操作

const mysql = require('mysql')
// 创建连接对象
const conn = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'baixiu'
})

module.exports = {
    // 实现登陆验证查询:根据email查询用户数据
    login(email,callback){
        var sql = `select * from users where email = '${email}'`
        conn.query(sql,(err,results) => {
            if(err){
                callback(err)
            }else{
                // results是一个数组
                // 当前查询要么没有数据,要么就只有一条数据
                callback(null,results[0])
            }
        })
    }
}