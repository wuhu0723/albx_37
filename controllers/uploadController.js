// 这个文件专门用于处理文件上传业务
const formidable = require('formidable')
module.exports = {
    uploadFile(req, res) {
        // 使用formidable实现文件上传
        let form = new formidable.IncomingForm()
        // 配置
        form.encoding = 'utf-8'
        form.keepExtensions = true
        form.uploadDir = './uploads'
        // 实现文件上传操作
        form.parse(req,(err,fields,files) => {
            if(err){
                res.json({
                    code:400,
                    msg:'文件上传失败'
                })
            }else{
                console.log(fields)
                console.log(files)
                res.json({
                    code:200,
                    msg:'文件上传成功',
                    // 将文件在服务器中的存储路径返回
                    img:files.img.path
                })
            }
        })
    }
}