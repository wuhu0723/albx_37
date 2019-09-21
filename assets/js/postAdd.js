$(function(){
    // 实现文件上传
    $('#feature').on('change',function(){
        // ajax所支持的数据的常见格式：
        // key=value&key=value
        // {}
        // FormData对象
        // 获取文件对象  files:当前用户所选择的文件列表，里面的值就是用户选择的文件对象--blob
        let myfile = $('#feature')[0].files[0]
        // 使用formdata收集数据
        let formdata = new FormData()
        // 添加数据到formdata
        // blob:二进制文件对象：binary large object
        formdata.append('img',myfile)
        formdata.append('username',"jack_37")

        // 使用ajax实现文件上传请求
        // 凡是 formdata结合ajax实现请求，一定需要设置两个属性：
        $.ajax({
            type:'post',
            url:'/uploadFile',
            data:formdata,
            processData:false, // 告诉ajax不要进行数据的处理，因为formdata已经进行处理了
            contentType:false, // 告诉ajax不要对数据进行编码处理，因为formdata已经进行处理了
            dataType:'json',
            success:function(res){
                console.log(res)
                if(res.code == 200){
                    $('.thumbnail').attr('src','/'+res.img).show()
                }
            }
        })
    })
})