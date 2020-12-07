// 初始化分页的销售员分页函数
window.onload = function() {
    saler_page(1, 1);
};

let tbody = $('.table-bordered>tbody');
let phone_dim = $('#phone');
let page = 0;

// 点击1234按钮切换分页
$('.pagination').on('click', '.page-item', function() {
    page = $(this).text();
    // 如果模糊查询里
    // 填值了就掉模糊查询的方法
    // 没值就直接分页展示(分页的方法 saler_page)
    if ($(phone_dim).val() == '') {
        saler_page(1, page);
    } else {
        dim_page(1, page)
    }
})


// 点击跳到按钮
$('.pagination').on('click', '#jump_page', function() {

    page = $('#page_id').val(); // 跳到指定数据的值
    console.log(page);
    if (parseInt(page) > parseInt($('.page-item').last().text()) || parseInt(page) > parseInt($('.page-item').last().text())) {
        $('.card')
            .css({
                'visibility': 'revert',
                'color': 'red'
            })
            .text('填写或操作错误')
    } else {
        $('.card')
            .css({
                'visibility': 'hidden',
                'color': 'red'
            })
            .text('填写或操作错误')
    }

    if ($(phone_dim).val() == '') {
        saler_page(1, page);
    } else {
        dim_page(1, page)
    }
});


// 处理分页的函数
function saler_page(number, index) {
    $.post('http://39.106.26.6:8888/saler_page/', { page_size: `${number}`, current_page: `${index}` }, function(data) {
        let li = ''
            // 判断下面的小按钮
        if (data.sum_pages <= 5) {
            for (let i = 1; i <= data.sum_pages; i++) {
                li += `<li class="page-link page-item">${i}</li>`
            }
            $('.pagination').html(li);
        } else {
            for (let i = 1; i < 5; i++) {
                li += `<li class="page-link page-item">${i}</li>`
            }
            $('.pagination').html(li);
            $('.pagination').append(`<li class="page-link">...</li><li class="page-link page-item">${data.sum_pages}</li><li class="page-link" id='jump_page'>跳到</li><li class="page-link"><input type='text' id='page_id'></li>`)
        }
        // 显示多少条数据
        $('.hint-body').text(data.counts + '条数据');


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
                <a href="09saler_platform.html">
                   <button type="button" class="btn btn-info amend" value='${item.p_id}' id='examine'>查看</button>
                </a>
            </td>
        </tr>`
        });
        $(tbody).html(list_gather)
    });
};


// 根据手机号，查找销售员 (模糊查询)
$('#find').click(function() {
    dim_page(1, 1)
});

// 模糊查询的分页
function dim_page(number, index) {
    let phone_val = $('#phone').val();
    if (phone_val == '') {
        console.log('请输入手机号');
    } else {
        $.post('http://39.106.26.6:8888/get_saler_by_phone/', { phone: `${phone_val}`, page_size: `${number}`, current_page: `${index}` }, function(data) {
            let li = ''
                // 判断下面的小按钮
            if (data.sum_pages <= 5) {
                for (let i = 1; i <= data.sum_pages; i++) {
                    li += `<li class="page-link page-item">${i}</li>`
                }
                $('.pagination').html(li);
            } else {
                for (let i = 1; i < 5; i++) {
                    li += `<li class="page-link page-item">${i}</li>`
                }
                $('.pagination').html(li);
                $('.pagination').append(`<li class="page-link">...</li><li class="page-link page-item">${data.sum_pages}</li><li class="page-link" id='jump_page'>跳到</li><li class="page-link"><input type='text' id='page_id'></li>`)
            }
            // 显示多少条数据
            $('.hint-body').text(data.counts + '条数据');


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
    window.location.href = '../view/08update_saler.html'
    return false
});



// 点击删除销售员
$(tbody).delegate('#del', 'click', function(e) {
    $.post('http://39.106.26.6:8888/delete_saler_byid/', { saler_id: `${$(this).val()}` }, function(data) {
        location.reload();
    });
    return false
});



// 点击查看所有按钮
$("#to_see_all").click(function(e) {
    // e.preventDefault();
})