// 初始化分页的销售员分页函数
window.onload = function() {
    if (login_name == '推广员页面') {
        saler_page_sell(ea_id, 1, 1);
    } else if (login_name == '管理员页面') {
        saler_page(1, 1);
    }
};


let login_name = window.localStorage.getItem('login_user'); // 登录的什么角色
let ea_id = JSON.parse(window.localStorage.getItem('login_id')); // 登录的id
let tbody = $('tbody');
let weixin_dim = $('#weixin');
let if_add_none = $('#if_add_none');
let page = 0;
let whether = null;


if (login_name == '推广员页面') {
    console.log('推广员');

    // 点击1234按钮切换分页(管理员)
    $('.pagination').on('click', '.page-item', function() {
        page = $(this).text();
        if ($(if_add_none).val() == '') {
            saler_page_sell(ea_id, 1, page);
        } else {
            ea_is_add_fn($('#if_add_none').val(), 1, page)
        }
    });


    // 点击跳到按钮(管理员)
    $('.pagination').on('click', '#jump_page', function() {
        page = $('#page_id').val(); // 点击跳到获取指定的值
        let page_item = $('.page-item').last().text();

        if (parseInt(page) > parseInt(page_item)) {
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
        saler_page_sell(1, page);
    });


    // 获取某个推广员的相关信息(推广员)
    function saler_page_sell(eaid, number, index) {
        $.get('http://39.106.26.6:8888/get_all_by_eaid/', { ea_id: `${eaid}`, page_size: `${number}`, current_page: `${index}` }, function(data) {
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
            if (data.counts == 0) {
                $('.card')
                    .text('没得数据')
                    .css({
                        'visibility': 'revert',
                        'color': 'red'
                    })
            } else {
                $('.card').css('visibility', 'hidden')
            }

            let tr = '';
            $(data.list).each(function(index, item) {
                if (item.whether_add == true) {
                    item.whether_add = '已添加'
                } else {
                    item.whether_add = '未添加'
                }
                tr += `
                <tr>
                       <td>${item.add_date}</td>
                      <td>${item.ea_name}</td>
                      <td>
                            <p>${item.weixin}</p>
                            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" value='${item.saler_id}'>修改微信</button>
                      </td>
                      <td>${item.channel}</td>
                      <td>${item.saler_name}</td>
                      <td>${item.saler_weixin}</td>
                      <td>${item.whether_add}</td>
                      <td>
                            <img src='${item.saler_weixin_url}' class='ajax_03saler_img'>
                      </td>
                </tr>
                `;
            });
            $(tbody).html(tr);
        });
    };

    // 点击导出(推广员)
    $('#export').click(function(e) {
        let start_time = $('#start_time').val(); // 开始时间
        let end_time = $('#end_time').val(); // 结束时间
        if (start_time == '' && end_time == '') {
            e.preventDefault()
            $('.work_terrace')
                .show('fast', function() {
                    $(this)
                        .css('visibility', 'inherit')
                        .addClass('alert-danger')
                        .text('请选择开始和结束时间')
                })
        } else {
            $(this).attr('href', `http://39.106.26.6:8888/export_all_by_start_end_time_ea_id?ea_id=${ea_id}&start_time=${start_time}&end_time=${end_time}`);
            $('.work_terrace ')
                .hide('fast', function() {
                    $('.alert ')
                        .css('visibility', 'inherit')
                        .addClass('alert-success ')
                        .text('请选择开始和结束时间')
                })
        }
    });

    // 点击是否添加按钮(推广员)
    $('.dropdown-item').click(function() {
        $('#if_add_none').val($(this).text());
        ea_is_add_fn($(this).text(), 1, 1, this);
    });

    // 点击是否添加调用的函数
    function ea_is_add_fn(whether_add, number, index) {
        let whether = 0;
        if (whether_add == '是') {
            whether = 1
        } else if (whether_add == '否') {
            whether = 0
        }

        $.post('http://39.106.26.6:8888/get_all_by_eaid_whether_add/', { ea_id: `${ea_id}`, whether_add: `${whether}`, page_size: `${number}`, current_page: `${index}` }, function(data) {
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
            if (data.counts == 0) {
                $('.card')
                    .text('没得数据')
                    .css({
                        'visibility': 'revert',
                        'color': 'red'
                    })
            } else {
                $('.card').css('visibility', 'hidden')
            }

            let tr = '';
            $(data.list).each(function(index, item) {
                if (item.whether_add == true) {
                    item.whether_add = '已添加'
                } else {
                    item.whether_add = '未添加'
                }
                tr += `
                <tr>
                       <td>${item.add_date}</td>
                      <td>${item.ea_name}</td>
                      <td>
                            <p>${item.weixin}</p>
                            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" value='${item.saler_id}'>修改微信</button>
                      </td>
                      <td>${item.channel}</td>
                      <td>${item.saler_name}</td>
                      <td>${item.saler_weixin}</td>
                      <td>${item.whether_add}</td>
                      <td>
                            <img src='${item.saler_weixin_url}' class='ajax_03saler_img'>
                      </td>
                </tr>
                `;
            });
            $(tbody).html(tr);
        })
    };

    // 点击qq渠道里的保存按钮
    $('#qq_save').click(function() {
        qq_add($('#qq_value').val());
    });

    // 点击qq渠道添加 调用的函数(推广员)
    function qq_add(qq_add_weixin) {
        let new_qq = $('#qq_value').val();
        if (new_qq == '') {} else {
            $.post('http://39.106.26.6:8888/check_weixin/', { weixin: `${new_qq}` }, function(data) {
                if (data.info == '该微信号可用！') {
                    $.post('http://39.106.26.6:8888/add_stu/', { weixin: `${qq_add_weixin}`, ea_id: `${ea_id}` }, function(data) {
                        console.log(data);
                        $('.alert-success')
                            .removeClass('alert-warning')
                            .css('visibility', 'revert')
                            .text('添加成功成功')
                        setTimeout(() => {
                            window.location.reload()
                        }, 800)
                    });
                } else {
                    $('.alert-success')
                        .addClass('alert-warning')
                        .css('visibility', 'revert')
                        .text('此号已被占用!')
                }
            });

        }
    };


} else if (login_name == '管理员页面') {
    console.log('管理员');

    // 点击1234按钮切换分页(管理员)
    $('.pagination').on('click', '.page-item', function() {
        page = $(this).text();
        if ($(if_add_none).val() == '') {
            saler_page(1, page);
        } else {
            is_add_fn($('#if_add_none').val(), 1, page)
        }

    });


    // 点击跳到按钮(管理员)
    $('.pagination').on('click', '#jump_page', function() {
        page = $('#page_id').val(); // 点击跳到获取指定的值
        let page_item = $('.page-item').last().text();

        if (parseInt(page) > parseInt(page_item)) {
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
        saler_page(1, page);
    });


    // 获取所有推广员的相关信息(管理员)
    function saler_page(number, index) {
        $.post('http://39.106.26.6:8888/get_all_clients_ea/', { page_size: `${number}`, current_page: `${index}` }, function(data) {
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

            let tr = '';
            $(data.list).each(function(index, item) {
                if (item.whether_add == true) {
                    item.whether_add = '已添加'
                } else {
                    item.whether_add = '未添加'
                }
                tr += `
                <tr>
                       <td>${item.add_date}</td>
                      <td>${item.ea_name}</td>
                      <td>
                            <p>${item.weixin}</p>
                            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" value='${item.saler_id}' id='alter_weixin'>修改微信</button>
                      </td>
                      <td>${item.channel}</td>
                      <td>${item.saler_name}</td>
                      <td>${item.saler_weixin}</td>
                      <td>${item.whether_add}</td>
                      <td>
                            <img src='${item.saler_weixin_url}' class='ajax_03saler_img'>
                      </td>
                </tr>
                `;
            });
            $(tbody).html(tr);

            // 点击修改微信按钮
            let weixin_btn = ''
            $('#alter_weixin').click(function() {
                $('.old_weixin').val($(this).siblings().text())
                weixin_btn = $(this).siblings().text()
            });

            // 点击修改微信里的保存按钮
            $('.btn-secondary').click(function() {
                let old_weixin = $('.old_weixin').val();
                let new_weixin = $('#import_weixin').val();
                if (new_weixin == '') {} else {
                    $.post('http://39.106.26.6:8888/check_weixin/', { weixin: `${new_weixin}` }, function(data) {
                        if (data.info == '该微信号可用！') {
                            $.post('http://39.106.26.6:8888/update_stu_weixin/', { new_weixin: `${new_weixin}`, old_weixin: `${old_weixin}` }, function(data) {
                                $('.alert-success')
                                    .removeClass('alert-warning')
                                    .css('visibility', 'revert')
                                    .text('修改成功')
                                setTimeout(() => {
                                    window.location.reload()
                                }, 600)
                            });
                        } else {
                            $('.alert-success')
                                .addClass('alert-warning')
                                .css('visibility', 'revert')
                                .text('微信号已被占用!')
                        }
                    });

                }
            });

        });
    };


    // 点击导出(管理员)
    $('#export').click(function(e) {
        let start_time = $('#start_time').val(); // 开始时间
        let end_time = $('#end_time').val(); // 结束时间
        if (start_time == '' && end_time == '') {
            e.preventDefault()
            $('.work_terrace')
                .show('fast', function() {
                    $(this)
                        .css('visibility', 'inherit')
                        .addClass('alert-danger')
                        .text('请选择开始和结束时间')
                })

        } else {
            $(this).attr('href', `http://39.106.26.6:8888/export_all_by_start_end_time?start_time=${start_time}&end_time=${end_time}`);
            $('.hint')
                .hide('fast', function() {
                    $('.alert ')
                        .css('visibility', 'inherit')
                        .addClass('alert-success ')
                        .text('请选择开始和结束时间')
                })
        }
    });


    // 点击是否添加按钮(管理员)
    $('.dropdown-item').click(function() {
        $('#if_add_none').val($(this).text());
        is_add_fn($(this).text(), 1, 1, this);
    });


    // 点击是否添加调用的函数(管理员)
    function is_add_fn(whether_add, number, index) {
        if (whether_add == '是') {
            whether = 1
        } else if (whether_add == '否') {
            whether = 0
        }
        $.post('http://39.106.26.6:8888/get_stus_bywhether_add/', { whether_add: `${whether}`, page_size: `${number}`, current_page: `${index}` }, function(data) {
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

            let tr = '';
            $(data.list).each(function(index, item) {
                if (item.whether_add == true) {
                    item.whether_add = '已添加'
                } else {
                    item.whether_add = '未添加'
                }
                tr += `
                <tr>
                       <td>${item.add_date}</td>
                      <td>${item.extensionagent_name}</td>
                      <td>
                            <p>${item.weixin}</p>
                            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" value='${item.saler_id}'>修改微信</button>
                      </td>
                      <td>${item.channel}</td>
                      <td>${item.saler_name}</td>
                      <td>${item.saler_weixin}</td>
                      <td>${item.whether_add}</td>
                      <td>
                            <img src='${item.saler_weixin_url}' class='ajax_03saler_img'>
                      </td>
                </tr>
                `;
            });
            $(tbody).html(tr);

            // 判断是否要添加到我的客户
            $($('.add_client')).each(function(key, value) {
                let is_add = $(value).parent().siblings().last().text();
                if (is_add == '已添加') {
                    $(this).css('display', 'none')
                }
            });
        })
    };

};