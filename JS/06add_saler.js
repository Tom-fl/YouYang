fn_name($('#name'));
fn_phone($('#phone'));
fn_weixin($('#weixin'));


$('#save').click(function() {
    let name = $('#name');
    let phone = $('#phone');
    let weixin = $('#weixin');
    // console.log($(name).val() == '');
    if ($(name).val() == '' || $(phone).val() == '' || $(weixin).val() == '') {
        $('.alert')
            .removeClass('alert-success')
            .addClass('alert-danger')
            .text('错误')
            .fadeIn(500)
    } else {
        let formData = new FormData();
        formData.append("data", data.files[0]);
        formData.append('submit', false);
        $.ajax({
            url: "http://47.111.73.231:8080/upload_img_file/",
            method: "POST",
            cache: false, // 文件不设置缓存
            data: formData,
            processData: false, // 数据不被转换为字符串
            contentType: false, // 上传文件时使用，避免jQuery对其操作
            success: function(result) {
                let name = $('#name');
                let phone = $('#phone');
                let weixin = $('#weixin');
                console.log(result);
                console.log(name);
                $.post('http://47.111.73.231:8080/add_saler/', { p_name: `${$(name).val()}`, p_phone: `${$(phone).val()}`, p_weixin: `${$(weixin).val()}`, weixin_img_url: `http://47.111.73.231:8080/${result.full_name}` }, function(data) {
                    console.log(data);
                    $('.alert ')
                        .fadeIn(500)
                        .fadeOut(1500)
                    setTimeout(function() {
                        location.reload();
                    }, 1000)
                })
            },
        });
    };
});