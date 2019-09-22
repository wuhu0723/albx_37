$(function(){
    // 实现文件上传
    $('#feature').on('change',function(){
        // 获取用户所选择的文件
        // files:用户所选择文件列表,它是一个伪数组
        let myfile = $('#feature')[0].files[0]
        var formdata = new FormData()
        // blob:二进制的大文件--文件
        formdata.append('img',myfile)
        formdata.append('myvalue','什么值都可以，只要是字符串')

        // 发起ajax请求
        // 支持的data的常见格式
        // key=value&key=value:$('form').serialize()
        // 对象
        // formdata
        $.ajax({
            type:'post',
            url:'/uploadFile',
            data:formdata,
            dataType:'json',
            processData:false,
            contentType:false,
            success:function(res){
                console.log(res)
                if(res.code == 200){
                    // 1.预览
                    $('.thumbnail').attr('src','/'+res.img).show()
                    // 2.将当前图片路径存储到隐藏域，方便后期的参数获取
                    $('[name="feature"]').val(res.img.substring(res.img.lastIndexOf('\\')+1))
                }
            }
        })
    })

    // 初始化富文本框
    // 下面这句代码的作用是：创建一个富文本框控件(实例对象)来覆盖你所指定的id号为content的文本域
    CKEDITOR.replace('content')

    // 实现文件新增
    $('.btnAdd').on('click',function(){
        // CKEDITOR.instances:可以获取当前页面中所有的富文本框对象集合
        // CKEDITOR.instances.content：获取id号为content的富文本框对象
        // console.log(CKEDITOR.instances.content.getData())
        // 实现富文本框和文本域的数据同步
        CKEDITOR.instances.content.updateElement()
        $.ajax({
            type:'post',
            url:'/addPost',
            data:$('form').serialize(),
            dataType:'json',
            success:function(res){
                if(res.code == 200){
                    $('.alert-danger > span').text(res.msg)
                    $('.alert-danger').show()
                    setTimeout(() => {
                        location.href = '/admin/posts'
                    }, 2000);
                }
            }
        })
    })

     // 实现分类数据的动态加载-下拉列表
     $.ajax({
        type:'get',
        url:'/getCateList',
        dataType:'json',
        success:function(res){
            console.log(res)
            let html = ''
            res.data.forEach(value =>{
                html += `<option value="${value.id}">${value.name}</option>`
            })
            $('#category').html(html)
        }
    })
})