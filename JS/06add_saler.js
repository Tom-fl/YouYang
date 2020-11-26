fn_name($('#name'));
fn_phone($('#phone'));
fn_weixin($('#weixin'));

$('#test2').blur(function() {
    console.log($(this).val());
});