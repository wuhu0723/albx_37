$(function () {
    // 1.展示分类数据
    function init() {
        $.ajax({
            url: '/getCateList',
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    $('tbody').html(template('cateListTemp', res))
                }
            }
        })
    }
    init()

    // 添加编辑按钮的委托事件，实现编辑数据的动态展示
    $('tbody').on('click', '.btnEdit', function () {
        let data = $(this).data()
        $('#name').val(data.name)
        $('#slug').val(data.slug)
        $('[name="id"]').val(data.id)
        // 提示信息的设置
        $('.info').text('编辑分类数据')
        $('.btnAdd').hide()
        $('.btnEditById').show()
    })

    // 实现分类数据的编辑提交
    $('.btnEditById').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/editCate',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    $('.alert-danger > span').text(res.msg)
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut()
                    $('#name').val('')
                    $('#slug').val('')
                    $('[name="id"]').val('')

                    $('.info').text('添加新分类目录')
                    $('.btnAdd').show()
                    $('.btnEditById').hide()

                    init()
                }
            }
        })
    })

    // 实现分类的添加
    $('.btnAdd').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/addCate',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    init()
                }
                $('.alert-danger > span').text(res.msg)
                $('.alert-danger').fadeIn(500).delay(2000).fadeOut()
                $('#name').val('')
                $('#slug').val('')
            }
        })
    })

    // 实现分类数据的单个删除
    $('tbody').on('click', '.btndel', function () {
        // $(this).data().id == $(this).data()['id'] == $(this).data('id')
        if (window.confirm('请问是否真的需要删除?')) {
            let id = $(this).data('id')
            $.ajax({
                url: '/delCateById?id=' + id,
                dataType: 'json',
                success: function (res) {
                    if (res.code == 200) {
                        init()
                    }
                    $('.alert-danger > span').text(res.msg)
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut()
                }
            })
        }
    })

    // 实现全选和全不选功能
    $('.chkAll').on('click',function(){
        // 获取当前chkAll的checked状态，并将这个状态赋值给tbody中的有的checkbox
        // 如何获取复选框的checked状态
        // console.log($(this)[0].checked)
        // console.log($(this).prop('checked'))

        let statu = $(this).prop('checked')
        $('tbody .chkSingle').prop('checked',statu)
        // 判断批量删除按钮是否需要展示
        if($('tbody .chkSingle:checked').length > 1){
            $('.btndels').fadeIn(500)
        }else{
            $('.btndels').fadeOut(500)  
        }
    })

    // 通过委托的方式为tbody中所有复选框绑定事件
    $('tbody').on('click','.chkSingle',function(){
        // 1.判断当前tbody中被选中的复选框的数量如果>1,则显示批量删除按钮，否则隐藏
        if($('tbody .chkSingle:checked').length > 1){
            $('.btndels').fadeIn(500)
        }else{
            $('.btndels').fadeOut(500)  
        }
        // 2. 如果当前tbody中被选择复选框的数量和tbody中所有复选框的数量一致则让全选复选框也被选中，否则不被选中
        if($('tbody .chkSingle').length == $('tbody .chkSingle:checked').length){
            $('.chkAll').prop('checked',true)
        }else{
            $('.chkAll').prop('checked',false)
        }
    })
})