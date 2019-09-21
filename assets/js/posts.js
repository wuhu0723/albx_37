$(function(){
    var pageSize = 2,pageNum = 2
    $.ajax({
        type:'get',
        url:'/getPostList',
        data:{
            pageSize,
            pageNum
        },
        dataType:'json',
        success:function(res){
            console.log(res)
            $('tbody').html(template('postsListTemp',res))
        }
    })
})