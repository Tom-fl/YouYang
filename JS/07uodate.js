let amends_ea = localStorage.getItem('amends_ea')
let amends_ea_new = JSON.parse(amends_ea);

let name = $('#name').val(amends_ea_new[1]);
let phone = $('#phone').val(amends_ea_new[2]);
let weixin = $('#weixin').val(amends_ea_new[3]);
let pwd = $('#pwd').val(amends_ea_new[4]);

// 点击保存修改值
$('.btn-success').click(function() {
    console.log($(name).val());
<<<<<<< HEAD
    $.post('http://47.111.73.231:8080/update_ea_byid/', { ea_id: `${amends_ea_new[0]}`, p_name: `${$(name).val()}`, p_phone: `${$(phone).val()}`, p_weixin: `${$(weixin).val()}`, p_pwd: `${$(pwd).val()}` }, function(data) {
=======
    $.post('http://39.106.26.6:8888/update_ea_byid/', { ea_id: `${amends_ea_new[0]}`, p_name: `${$(name).val()}`, p_phone: `${$(phone).val()}`, p_weixin: `${$(weixin).val()}`, p_pwd: `${$(pwd).val()}` }, function(data) {
>>>>>>> 148ed91158ab24d22384edac529c9e11b221ef47
        $('.alert').show(200)
        setTimeout(function() {
            $('.alert').hide(300)
            window.location.href = '04ea_list.html'
        }, 600);
    })
})