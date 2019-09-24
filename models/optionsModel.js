// // 这个文件处理所有与网站设置有关数据操作
const conn = require('./myconn.js')

module.exports = {
    getMenuList(callback) {
        let sql = 'select value from `options` where id = 9'
        conn.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                //    console.log(data[0].value)
                //    console.log(typeof data[0].value)  //Array
                callback(null, results[0].value)
            }
        })
    },
    // 添加导航菜单 ：查询 + 更新
    addMenu(obj, callback) {
        // 1.查询出你需要操作的导航菜单数据--字符串
        let sql = 'select value from `options` where id = 9'
        conn.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                // 2.将字符串转换为js数组或对象
                let arr = JSON.parse(results[0].value)
                // 3.操作
                arr.push(obj)
                // 4.将数组重新转换为json格式字符串
                let jsonStr = JSON.stringify(arr)
                // 5.更新
                sql = 'update `options` set value = ? where id = 9'
                conn.query(sql,[jsonStr],(err1) => {
                    if (err1) {
                        callback(err1)
                    }else{
                        callback(null)
                    }
                })
            }
        })
    }
}