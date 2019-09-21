// 这个文件用于处理所有与posts相关的数据操作

const mysql = require('mysql')
// 创建连接对象
const conn = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'baixiu'
    // 会将日期值以moment.js来处理
    // dateStrings:true
})


module.exports = {
    // 获取所有文章数据
    // query是客户端传递的参数，它是一个对象
    // 现在包含两个数据：pageSize,pageNum
    // pageSize:每页显示的记录数
    // pageNum:当前页码
    getPostList(query,callback){
        let sql = `select posts.*,users.nickname,categories.name
                    from posts
                    join users on posts.user_id = users.id
                    join categories on posts.category_id = categories.id
                    limit ${(query.pageNum-1)*query.pageSize},${query.pageSize}`
        conn.query(sql,(err,results) => {
            if(err){
                callback(err)
            }else{
                callback(null,results)
            }
        })
    }
}