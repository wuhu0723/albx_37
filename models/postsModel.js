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
    // cate:分类查询条件
    // statu：状态查询条件
    getPostList(query,callback){
        // { pageSize: '4', pageNum: '1', cate: '3', statu: 'published' }
        console.log(query)
        let sql = `select posts.*,users.nickname,categories.name
                    from posts
                    join users on posts.user_id = users.id
                    join categories on posts.category_id = categories.id
                    where 1=1 ` // 恒成立
            // 拼接筛选条件
            if(query.cate && query.cate != 'all'){ // 说明有分类条件
                sql += ` and posts.category_id = ${query.cate} `
            }
            if(query.statu && query.statu != 'all'){
                sql += ` and posts.status = '${query.statu}' `
            }

            sql += ` order by posts.id DESC
            limit ${(query.pageNum-1)*query.pageSize},${query.pageSize}`
        conn.query(sql,(err,results) => {
            if(err){
                callback(err)
            }else{
                // 再次创建sql语句 获取总记录数
                sql = 'select count(*) as cnt from posts where 1=1 '
                if(query.cate && query.cate != 'all'){ // 说明有分类条件
                    sql += ` and posts.category_id = ${query.cate} `
                }
                if(query.statu && query.statu != 'all'){
                    sql += ` and posts.status = '${query.statu}' `
                }
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
    },
    addPost(obj,callback){
        console.log(obj)
        // let sql = `insert into posts values (null,'${obj.slug}','${obj.title}','${obj.feature}','${obj.created}','${obj.content}','${obj.views}','${obj.likes}','${obj.status}','${obj.user_id}','${obj.category}')`
        // 在mysql第三方模块中，提供了参数化查询的方式，就是使用?做为参数占位符以些来简化sql语句
        // 它可以自动的生成sql语句 
        let sql = 'insert into posts set ?'
        // 如果参数是对象，就不用使用[]包含
        // 如果是单独的值或者多个参数，就需要使用[]包含
        conn.query(sql,obj,(err) => {
            if(err){
                console.log(err)
                callback(err)
            }else{
                callback(null)
            }
        })
    },
    // 根据id获取文章详情数据
    getPostById(id,callback){
        let sql = 'select * from posts where id = ' + id
        conn.query(sql,(err,results) =>{
            if(err){
                callback(err)
            }else{
                callback(null,results[0])
            }
        })
    },
    // 实现文章的编辑
    editPost(obj,callback){
        // sql：使用参数化查询
        // 它会自动的根据传入的数据对象的属性和对应的值生成sql语句
        let sql = 'update posts set ? where id = ?'
        conn.query(sql,[obj,obj.id],(err) => {
            if(err){
                console.log(err)
                callback(err)
            }else{
                callback(null)
            }
        })
    },
    // 根据文章id删除文章
    delPostById(id,callback){
        let sql = 'delete from posts where id = ' + id
        conn.query(sql,(err) => {
            if(err){
                callback(err)
            }else{
                callback(null)
            }
        })
    }
}