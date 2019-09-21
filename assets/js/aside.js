$(function(){
    // 1.获取当前的路由名称
    let str = location.href
    let routername = '' // 路由名称

    let index = str.indexOf('?')
    // 1.1 如果有参数
    if(index != -1){
        routername = str.substring(str.lastIndexOf('/')+1,index)
    }else{
        // 1.2 如果没有参数
        routername = str.substring(str.lastIndexOf('/')+1)
    }

    let menuPosts = $('#menu-posts')
    // 2.实现菜单项的展开
    if(routername == 'posts' || routername == 'post-add' || routername == 'categories'){
        menuPosts.addClass('in')
        menuPosts.attr('aria-expanded',true)
        // - 让箭头合理的旋转
        menuPosts.siblings('a').removeClass('collapsed')
    }

    let menuSettings = $('#menu-settings')
    // 2.实现菜单项的展开
    if(routername == 'slides' || routername == 'nav-menus' || routername == 'settings'){
        menuSettings.addClass('in')
        menuSettings.attr('aria-expanded',true)
        menuSettings.siblings('a').removeClass('collapsed')
    }
    // - 添加active样式
    $('#'+routername).addClass('active')
})