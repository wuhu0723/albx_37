// 这个文件用于处理所有与posts相关的数据操作

const mysql = require('mysql')
// 创建连接对象
const conn = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'baixiu',
    // 会将日期值以moment.js来处理
    dateStrings:true
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
                // 再次创建sql语句 获取总记录数
                sql = 'select count(*) as cnt from posts'
                conn.query(sql,(err2,results2) =>{
                    if(err2){
                        callback(err2)
                    }else{
                        // 客户端需要的有：数据和记录数两个值
                        callback(null,{data:results,cnt:results2[0].cnt})
                    }
                })
                // callback(null,results)
            }
        })
    }
}