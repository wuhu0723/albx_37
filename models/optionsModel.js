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
    },
    delMenu(title,callback){
        // 查询
        let sql = 'select value from `options` where id = 9'
        conn.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                // 转换
                let arr = JSON.parse(results[0].value)
                // 操作
                for(let i =0;i<arr.length;i++){
                    if(arr[i].title == title){ // 找到了
                        arr.splice(i,1)
                    }
                }
                // 转换
                // 更新
                sql = 'update `options` set value = ? where id = 9'
                conn.query(sql,[JSON.stringify(arr)],(err) => {
                    if (err) {
                        callback(err)
                    }else{
                        callback(null)
                    }
                })
            }
        })
    },
    // 获取网站设置
    getSiteOptions(callback) {
        let sql = 'select `key`,value from OPTIONS where id < 9'
        conn.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                console.log(results)
                callback(null,results)
            }
        })
    },
    // 更新网站设置
    updateSiteOptions(obj, callback) {
        // { site_logo: '/assets/img/logo.png',
        // site_name: '阿里百秀 - 发现生活，发现美！',
        // site_description: '阿里百秀同阿里巴巴有咩关系，答案当然系一啲都冇',
        // site_keywords: '生活, 旅行, 自由, 诗歌, 科技',
        // comment_reviewed: 1,
        // comment_status: 0 }
        // 循环生成多条sql语句执行
        let sql = ''
        let cnt = 0
        for(let key in obj){
            // update OPTIONs set value = obj['site_logo'] where `key` = 'site_logo'
             sql = "update options set value = ? where `key` = ?"  
             conn.query(sql,[obj[key],key],(err) => {
                if (err) {
                    callback(err)
                }else{
                    cnt ++
                    // Object.keys(obj).length
                    if(cnt == 6){
                        callback(null)
                    }
                }
            })  
        }
        
    }
}