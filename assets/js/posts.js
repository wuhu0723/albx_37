$(function () {
    // 每页记录数     当前页码
    var pageSize = 2, pageNum = 1, total = 0

    // 初始化
    function init(obj) {
        $.ajax({
            type: 'get',
            url: '/getPostList',
            data: {
                pageSize,
                pageNum,
                // 展开运算符：它可以将对象的成员一个一个展开
                ...obj
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    total = res.data.cnt
                    // 生成文章数据列表结构
                    $('tbody').html(template('postsListTemp', res.data))
                    // // 生成分页结构
                    setPage(Math.ceil(res.data.cnt / pageSize))
                }
            }
        })
    }
    init()

    function setPage(total) {
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: pageNum,
            // 总页数
            totalPages: total,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event, originalEvent, type, page) {
                // page:这就是当前你所需要的页码数据，我们只需要让ajax以这个页码数据做为标准再次发起请求获取数据生成动态结构
                // 修改全局页码
                pageNum = page
                // 重新获取数据生成动态结构
                var obj = {
                    cate: $('.cateSelector').val(),
                    statu: $('.statuSelector').val()
                }
                init(obj)
            }
        })
    }

    // 实现分类数据的动态加载-下拉列表
    $.ajax({
        type: 'get',
        url: '/getCateList',
        dataType: 'json',
        success: function (res) {
            console.log(res)
            let html = '<option value="all">所有分类</option>'
            res.data.forEach(value => {
                html += `<option value="${value.id}">${value.name}</option>`
            })
            $('.cateSelector').html(html)
        }
    })

    // 实现筛选
    $('.btn-search').on('click', function () {
        // 获取筛选条件
        var obj = {
            cate: $('.cateSelector').val(),
            statu: $('.statuSelector').val()
        }
        // 重置当前页码
        pageNum = 1
        // 发起ajax请求
        init(obj)
    })

    // 下拉列表切换事件
    $('.userSize').on('change', function () {
        pageSize = $(this).val()
        init()
    })

    // 根据文章id删除文章数据
    $('tbody').on('click', '.btndel', function () {
        // 获取id
        // 说明为什么在dom中使用自定义属性的方式存储数据：因为自定义属性并不是存储方便，而是获取方便，因为它可以将所有的自定义属性值一并获取，生成一个对象
        // 原生方式：dom.dataset:它是一个对象
        // jq方式：$(jq).data():它也是一个对象
        // console.log($(this)[0].dataset)
        // console.log($(this).data()["id"])
        if (confirm('请问是否真的需要删除？')) {
            let id = $(this).data().id
            $.ajax({
                url: '/delPostById',
                data: { id },
                dataType: 'json',
                success: function (res) {
                    if (res.code == 200) {
                        // 刷新:不能简单的init
                        // 而是应该判断当前这一页经过这一次删除还有没有剩余的记录，如果没有，则需要刷新上一页
                        // init()
                        // if(如果当前页经过这次删除已经没有记录了){
                        //     pageNum --
                        // }
                        // if($('tbody').find('tr').length == 1){
                        //     pageNum --
                        // }
                        if (Math.ceil((total - 1) / pageSize < pageNum)) {
                            pageNum == 1 ? pageNum : --pageNum
                        }
                        init()
                    }
                    $('.alert-danger > span').text(res.msg)
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut()
                }
            })
        }
    })
})