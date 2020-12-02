function init() {
    fn_phone($('#phone')); //手机号正则验证
    fn_password($('#pwd')); //密码正则验证
    phoneAndpwd_verify(); //手机ajax密码登录
    reset_btn(); //重置
    revamp_btn(); //修改密码
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
        if (($('.form-control').val() == '') || ($('#phone').val() == '') || ($('#pwd').val() == '')) {
            let inpts = $('.form-control');
            $(inpts).each(function(index, item) {
                $(item).css('border', '1px solid red').val('');
            });
        } else {
            $.post('http://47.111.73.231:8080/login/', { p_phone: `${phone_value}`, p_role: `${index}`, p_pwd: `${pwd_value}` }, function(data) {
                console.log(pwd_value);
                if (index == 0 && phone_value == '13678912345' && pwd_value == 'czf2afeng') {
                    window.location.href = '02admin.html'
                } else if (index == 1 && phone_value == '13878912345' && pwd_value == 'dwewe23') {
                    window.location.href = '09saler_platform.html'
                } else if (index == 2 && phone_value == '13240034233' && pwd_value == 'efwrqreq') {
                    window.location.href = '10extension_agent_platform.html'
                } else {
                    $('#phone')
                        .val('')
                        .attr('placeholder', '手机号格式有误!(手机号11位)')
                        .css('border', '1px solid red');
                    $('#pwd').val('')
                        .attr('placeholder', '密码格式有误!(至少五位)')
                        .css('border', '1px solid red')
                }
            }, 'json');
        };
        return false
    });
};


function revamp_btn() {
    let arr = [];
    $('.login_alter_pwd').click(function() {
        arr.push($(phone_value).val(), $(pwd_value).val())
        console.log(arr);
        return false
    })

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