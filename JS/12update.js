fn_name($('#name'));
fn_phone($('#phone'));
fn_weixin($('#weixin'));
fn_password($('#pwd'));

let user_name = '';

// 用来保存点击的那个人员
let index = '';
$('.dropdown-menu').click(function(e) {
    index = $(e.target).index();
    $('#role').val($(e.target).html());
    $('#role').css('border', '1px solid teal');
    $('#role').val()
});

$('#update').click(function() {
    let phone = $('#phone').val();
    let old_pwd = $('#old_pwd').val();
    let new_pwd = $('#new_pwd').val();
    let again_pwd = $('#again_pwd').val(); // 再次确认密码
    if (new_pwd !== again_pwd) {
        $('.card')
            .css('visibility', 'revert')
        $('.card-body')
            .text('密码格式错误!!!')
    } else {
        if (index == 0) {
            user_name = 'saler'
        } else if (index == 1) {
            user_name = 'ea'
        }
        $.post('http://39.106.26.6:8888/update_pwd/', { p_phone: `${phone}`, p_role: `${user_name}`, p_new_pwd: `${new_pwd}`, p_old_pwd: `${old_pwd}` }, function(data) {
            if (data.status == 'Ok') {
                $('.card')
                    .css('visibility', 'revert')
                $('.card-body')
                    .removeClass('bg-danger')
                    .addClass('bg-success')
                    .text('修改密码成功!')
                setTimeout(() => {
                    window.location.href = '01logoin.html'
                }, 1000)
            } else {
                $('.card')
                    .css('visibility', 'revert')
            }
        })
    }
})