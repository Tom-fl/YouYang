function init() {
    fn_phone($('#phone')); //手机号正则验证
    fn_password($('#pwd')); //密码正则验证
    phoneAndpwd_verify(); //手机ajax密码登录
    reset_btn(); //重置
};
let phone_value = $('#phone');
let pwd_value = $('#pwd');

function phoneAndpwd_verify() {
    // 登录角色错误 
    $('#role').change(function() {
        if (0) {} else {
            $(this).val('');
            $(this).attr('placeholder', '角色错误请选择');
            $(this).css('border', '1px solid red');
        }
    });

    // 用来保存点击的那个人员
    let index = '';
    $('.dropdown-menu').click(function(e) {
        index = $(e.target).index();
        $('#role').val($(e.target).html());
        $('#role').css('border', '1px solid teal');
        $('#role').val()
    });

    $('#enter').click(function() {
        let phone_value = $('#phone').val().trim();
        let pwd_value = $('#pwd').val();
        let user_name = '';
        if (($('.form-control').val() == '') || ($('#phone').val() == '') || ($('#pwd').val() == '')) {
            let inpts = $('.form-control');
            $(inpts).each(function(index, item) {
                $(item).css('border', '1px solid red').val('');
            });
        } else {
            if (index == 0) {
                user_name = 'admin'
            } else if (index == 1) {
                user_name = 'saler'
            } else if (index == 2) {
                user_name = 'ea'
            }
            console.log(phone_value, pwd_value, user_name);
            $.post('http://39.106.26.6:8888/login/', { p_phone: `${phone_value}`, p_role: `${user_name}`, p_pwd: `${pwd_value}` }, function(data) {
                console.log(data);
                if (user_name == 'admin' && data.status == 'Ok') {
                    window.localStorage.setItem('login_user', $('#role').val());
                    window.localStorage.setItem('login_id', data.user.p_id)
                    window.location.href = '02admin.html'
                } else if (user_name == 'saler' && data.status == 'Ok') {
                    window.localStorage.setItem('login_user', $('#role').val());
                    window.localStorage.setItem('login_id', data.user.p_id);
                    window.location.href = '09saler_platform.html'
                } else if (user_name == 'ea' && data.status == 'Ok') {
                    window.localStorage.setItem('login_user', $('#role').val());
                    window.localStorage.setItem('login_id', data.user.p_id)
                    window.location.href = '10extension_agent_platform.html'
                }
            });
        };
        return false
    });
};



function reset_btn() {
    $('#reset').click(function() {
        let val = $('.login_form div[class*="form-group"] input:lt(3)');
        $(val).each(function(index, item) {
            $(item).val('');
        });
    });
};


init(); // 入口