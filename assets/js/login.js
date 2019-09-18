$(function(){
    $('.btnlogin').on('click',function(){
        $.ajax({
            type:'post',
            url:'/login',
            // serialize:可以收集当前指定的表单中所有拥有name属性的表单元素的value值
            data:$('form').serialize(),
            dataType:'json',
            success:function(res){
                console.log(res)
            }
        })
    })
})