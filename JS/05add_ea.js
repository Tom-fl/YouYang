fn_name($('#name'));
fn_phone($('#phone'));
fn_weixin($('#weixin'));

// 添加推广员
$('#save').click(function() {
    let name = $('#name');
    let phone = $('#phone');
    let weixin = $('#weixin');

    if ($(name).val() == '' || $(phone).val() == '' || $(weixin).val() == '') {
        $('.alert')
            .removeClass('alert-success')
            .addClass('alert-danger')
            .text('错误')
            .fadeIn(500)
    } else {
        console.log($(weixin).val());
<<<<<<< HEAD
        $.post('http://47.111.73.231:8080/add_ea/', { p_name: `${$(name).val()}`, p_phone: `${$(phone).val()}`, p_weixin: `${$(weixin).val()}` }, function(data) {
=======
        $.post('http://39.106.26.6:8888/add_ea/', { p_name: `${$(name).val()}`, p_phone: `${$(phone).val()}`, p_weixin: `${$(weixin).val()}` }, function(data) {
>>>>>>> 148ed91158ab24d22384edac529c9e11b221ef47
            console.log(data);
            $('.alert ')
                .fadeIn(500)
                .fadeOut(1500)
            setTimeout(function() {
                location.reload();
            }, 1000)
        })
    };
});