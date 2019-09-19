$(function(){
    $('.appExit').on('click',function(){
        $.ajax({
            type:'get',
            url:'/loginOut',
            success:function(){
                location.href = '/login'
            }
        })
    })
})