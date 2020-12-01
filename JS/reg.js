function fn_phone(element) {
    element.change(function() {
        let phone_reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}(\s*$)/;
        if (phone_reg.test($(this).val())) {
            $(this).attr('placeholder', '手机号码')
                .css('border', '1px solid teal')
        } else {
            $(this).val('')
                .attr('placeholder', '手机号格式有误!(手机号11位)')
                .css('border', '1px solid red')
        }
    })
};


// 至少5个字符 不能包含特殊字符（非数字字母）
function fn_password(element) {
    element.change(function() {
        let password_reg = /^[A-Za-z0-9]{6,20}$/;
        if (password_reg.test($(this).val())) {
            $(this).attr('placeholder', '密码')
                .css('border', '1px solid teal')
        } else {
            $(this).val('')
                .attr('placeholder', '密码格式有误!(至少五位)')
                .css('border', '1px solid red')
        }
    })
};


// 1.可以是中文 2.可以是英文，允许输入点  4.长度在 4-10 个字符以内
function fn_name(element) {
    element.change(function() {
        let name_reg = /[\u4e00-\u9fa5_a-zA-Z0-9_]{2,10}/;
        if (name_reg.test($(this).val())) {
            $(this).attr('placeholder', '姓名')
                .css('border', '1px solid teal')
        } else {
            $(this).val('')
                .attr('placeholder', '姓名格式有误(至少2-10个字符)')
                .css('border', '1px solid red');
        }
    })
};


function fn_weixin(element) {
    // 1、可使用6 - 20 个字母、 数字、 下划线和减号；  2、 必须以字母开头（ 字母不区分大小写）； 3、 不支持设置中文。
    // /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/
    element.change(function() {
        let weixin_reg = /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/;
        if (weixin_reg.test($(this).val())) {
            $(this).attr('placeholder', '微信')
                .css('border', '1px solid teal')
        } else {
            $(this).val('')
                .attr('placeholder', '微信格式有误(至少6-20个字符,不支持中文)')
                .css('border', '1px solid red');
        }
    })
};