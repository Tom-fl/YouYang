let loca_s = localStorage.getItem("amends_saler").split(',');

let id_old = loca_s[0];
let name_old = $('#name').val(loca_s[1]);
let phone_old = $('#phone').val(loca_s[2]);
let weixin_old = $('#weixin').val(loca_s[3]);
let file_old = $('#test2').val(loca_s[4]);
let pwd_old = $('#pwd').val(loca_s[5]);
let file_new = $(file_old).val().substr(26); // 以前传过来的图片地址值(截取后)  

$('#btn').click(function() {
    let weixin_url = '';
    let formData = new FormData();
    formData.append("data", data.files[0]);
    formData.append('submit', false);
    $.ajax({
<<<<<<< HEAD
        url: "http://47.111.73.231:8080/upload_img_file/",
=======
        url: "http://39.106.26.6:8888/upload_img_file/",
>>>>>>> 148ed91158ab24d22384edac529c9e11b221ef47
        method: "POST",
        cache: false, // 文件不设置缓存
        data: formData,
        processData: false, // 数据不被转换为字符串
        contentType: false, // 上传文件时使用，避免jQuery对其操作
        success: function(result) {
            // 如果当前图片值为空就用以前的图片地址 (也就是你没点击那个文件选择)
            // 如果你点击了 就用你点击过后的图片的地址
            if ($('#data').val() == '') {
                weixin_url = file_new
            } else {
                weixin_url = result.full_name
            }
<<<<<<< HEAD
            $.post('http://47.111.73.231:8080/update_saler_byid/', { saler_id: `${id_old}`, p_name: `${$(name_old).val()}`, p_phone: `${$(phone_old).val()}`, p_weixin: `${$(weixin_old).val()}`, p_pwd: `${$(pwd_old).val()}`, weixin_img_url: `http://47.111.73.231:8080/${weixin_url}` }, function(data) {
=======
            $.post('http://39.106.26.6:8888/update_saler_byid/', { saler_id: `${id_old}`, p_name: `${$(name_old).val()}`, p_phone: `${$(phone_old).val()}`, p_weixin: `${$(weixin_old).val()}`, p_pwd: `${$(pwd_old).val()}`, weixin_img_url: `http://39.106.26.6:8888/${weixin_url}` }, function(data) {
>>>>>>> 148ed91158ab24d22384edac529c9e11b221ef47
                window.location.href = '../view/03saler_list.html'
                localStorage.removeItem("amends_saler");
            });
        },
    });



})