// 初始化分页的销售员
window.onload = function() {
    saler_page(2, 1);
};

let tbody = $('.table-bordered>tbody');
let phone_dim = $('#phone');
let page = 0;

// 点击1234按钮切换分页
$('.page-link').click(function() {
    page = $(this).text();

    // 如果模糊查询里
    // 填值了就掉模糊查询的方法
    // 没值就直接分页展示(分页的方法 saler_page)
    if ($(phone_dim).val() == '') {
        saler_page(2, page);
    } else {
        dim_page(2, page)
    }
});
// 还差判断点击的时候 重复值


// 处理分页的函数
function saler_page(number, index) {
    $.post('http://47.111.73.231:8080/saler_page/', { page_size: `${number}`, current_page: `${index}` }, function(data) {
        let list_gather = '';
        $(data.list).each(function(index, item) {
            list_gather += `<tr>
            <td class='amend'>${item.add_date}</td>
            <td class='amend'>${item.p_name}</td>
            <td class='amend'>${item.p_phone}</td>
            <td class='amend'>${item.weixin}</td>
            <td>
                 <img src='${item.weixin_img_url}' alt='' class='ajax_03saler_img amend'>
            </td>
            <td>
                <span class='span amend'>${item.p_pwd}</span>
                <a href="08update_saler.html">
                    <button type="button" class="btn btn-info update" value='${item.p_id}' id='update'>修改</button>
                </a>
                <button type="button" class="btn btn-info amend" value='${item.p_id}' id='del'>删除</button>
                <button type="button" class="btn btn-info amend" value='${item.p_id}' id='examine'>查看</button>
            </td>
        </tr>`
        });
        $(tbody).html(list_gather)
    });
};


// 根据手机号，查找销售员 (模糊查询)
$('#find').click(function() {
    dim_page(2, 1)
});

// 模糊查询的分页
function dim_page(number, index) {
    let phone_val = $('#phone').val();
    if (phone_val == '') {
        console.log('请输入手机号');
    } else {
        $.post('http://47.111.73.231:8080/get_saler_by_phone/', { phone: `${phone_val}`, page_size: `${number}`, current_page: `${index}` }, function(data) {
            let list_gather = '';
            $(data.list).each(function(index, item) {
                list_gather += `<tr>
            <td class='amend'>${item.add_date}</td>
            <td class='amend'>${item.p_name}</td>
            <td class='amend'>${item.p_phone}</td>
            <td class='amend'>${item.weixin}</td>
            <td>
                 <img src='${item.weixin_img_url}' alt='' class='ajax_03saler_img amend'>
            </td>
            <td>
                <span class='span amend'>${item.p_pwd}</span>
                <a href="08update_saler.html">
                    <button type="button" class="btn btn-info" value='${item.p_id}' id='update'>修改</button>
                </a>
                <button type="button" class="btn btn-info amend" value='${item.p_id}' id='del'>删除</button>
                <button type="button" class="btn btn-info amend" value='${item.p_id}' id='examine'>查看</button>
            </td>
        </tr>`
            });
            $(tbody).html(list_gather)
        });
    };
};



// 点击修改按钮
let amends = [];
$(tbody).delegate('#update', 'click', function(e) {
    let amend_id = $(this).parents('tr').find('.amend').eq(6).val()
    let amend_name = $(this).parents('tr').find('.amend').eq(1).text()
    let amend_phone = $(this).parents('tr').find('.amend').eq(2).text()
    let amend_weixin = $(this).parents('tr').find('.amend').eq(3).text()
    let amend_file = $(this).parents('tr').find('.amend').eq(4).attr('src')
    let amend_pwd = $(this).parents('tr').find('.amend').eq(5).text()
    amends.push(amend_id, amend_name, amend_phone, amend_weixin, amend_file, amend_pwd);

    localStorage.setItem("amends_saler", amends);
    // window.location.href = '../view/08update_saler.html'
    return false
});



// 点击删除销售员
$(tbody).delegate('#del', 'click', function(e) {
    $.post('http://47.111.73.231:8080/delete_saler_byid/', { saler_id: `${$(this).val()}` }, function(data) {
        location.reload();
    });
    return false
});


// 点击查看和查看所有按钮
$('body').on('click', '#to_see_all,#examine', function(e) {
    // 条件成立 是点击查看所有的按钮
    if (isNaN($(this).val())) {
        window.localStorage.removeItem('saler_platform_one');
        $.post('http://47.111.73.231:8080/get_all_stus_saler/', { page_size: `3`, current_page: `1` }, function(data) {
            localStorage.setItem('saler_platform_all', JSON.stringify(data.list));
            // window.location.href = '09saler_platform.html'
            console.log(data);
        });
    } else { // 不成立是点击查看的按钮
        window.localStorage.removeItem('saler_platform_all');
        $.post('http://47.111.73.231:8080/get_all_stus_bysaler/', { saler_id: `${$(this).attr('value')}`, page_size: `3`, current_page: `1` }, function(data) {
            localStorage.setItem('saler_platform_one', JSON.stringify(data.list));
            // window.location.href = '09saler_platform.html'
            console.log(data);
        });
    }
});