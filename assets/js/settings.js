$(function(){
    $.ajax({
        url:'/getSiteOptions',
        dataType:'json',
        success:function(res){
            console.log(res)
            $('form').html(template('optionsTemp',res))
        }
    })

    // 实现网站设置的保存
    $('form').on('click','.btnSave',function(){
        $.ajax({
            type:'post',
            url:'/updateSiteOptions',
            data:$('form').serialize(),
            dataType:'json',
            success:function(res){
                console.log(res)
                if(res.code == 200){
                    alert('更新成功')
                }
            }
        })
    })
})