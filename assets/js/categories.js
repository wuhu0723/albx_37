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
                if(res.code == 200){
                    init()
                }
                $('.alert-danger > span').text(res.msg)
                $('.alert-danger').fadeIn(500).delay(2000).fadeOut()
                $('#name').val('')
                $('#slug').val('')
            }
        })
    })
})