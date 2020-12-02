// 初始化分页的销售员分页函数
window.onload = function() {
    if (login_name == '销售员页面') {
        saler_page_sell(1, 1);
    } else {
        saler_page(1, 1);
    }
};


let login_name = window.localStorage.getItem('login_user'); // 登录的什么角色
let ea_id = JSON.parse(window.localStorage.getItem('login_id')); // 登录的id
let tbody = $('tbody');
let weixin_dim = $('#weixin');
let if_add_none = $('#if_add_none');
let page = 0;



if (login_name == '销售员页面') {
    console.log('销售员');

    // 点击1234按钮切换分页
    $('.pagination').on('click', '.page-item', function() {
        page = $(this).text();
        // 如果模糊查询里
        // 填值了就掉模糊查询的方法
        // 没值就直接分页展示(分页的方法 saler_page)
        if ($(weixin_dim).val() == '' && $(if_add_none).val() == '') {
            saler_page(1, page);
        } else if ($(if_add_none).val() == '') {
            dim_page(1, page)
        } else {
            is_add_fn(1, page);
        }
    });


    // 点击跳到按钮
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

        if ($(weixin_dim).val() == '') {
            saler_page(1, page);
        } else {
            dim_page(1, page)
        }
    });


    // 处理分页的函数(销售员)
    function saler_page_sell(number, index) {
        // 获取所有销售员的相关信息(管理员)
        $.post('http://39.106.26.6:8888/get_all_stus_bysaler/', { saler_id: `${ea_id}`, page_size: `${number}`, current_page: `${index}` }, function(data) {
            let li = ''
                // 判断下面的小按钮
            if (data.sum_pages <= 5) {
                for (let i = 1; i <= data.sum_pages; i++) {
                    li += `<li class="page-link page-item">${i}</li>`
                }
                $('.pagination').html(li);
            } else {
                for (let i = 1; i <= 5; i++) {
                    li += `<li class="page-link page-item">${i}</li>`
                }
                $('.pagination').html(li);
                $('.pagination').append(`<li class="page-link">...</li><li class="page-link page-item">${data.sum_pages}</li><li class="page-link" id='jump_page'>跳到</li><li class="page-link"><input type='text' id='page_id'></li>`)
            }
            // 显示多少条数据
            $('.hint-body').text(data.counts + '条数据');

            let tr = '';
            $(data.list).each(function(index, item) {
                $('.add_client').css('display', 'none')
                if (item.whether_add == true) {
                    item.whether_add = '已添加'
                } else {
                    item.whether_add = '未添加'
                }
                tr += `
                <tr>
                    <td>${item.add_date}</td>
                    <td>${item.weixin}</td>
                    <td>${item.extensionagent_name}</td>
                    <td>${item.whether_add}</td>
                    <td>
                        <button type="button" class="btn btn-info add_client"data-toggle="modal" data-target="#myModal" id=''>添加到我的客户</button>
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
        });
    };


    // 根据手机号，查找销售员 模糊查询  (销售员)
    $('.find').click(function() {
        dim_page(1, 1)
    });

    // 模糊查询的分页(销售员)
    function dim_page(number, index) {
        let weixin_val = $('#weixin').val();
        if (weixin_val == '') {
            console.log('请输入微信');
        } else {
            $.post('http://39.106.26.6:8888/get_stus_like_byweixin_saler_id/', { saler_id: `${ea_id}`, weixin: `${weixin_val}`, page_size: `${number}`, current_page: `${index}` }, function(data) {
                if (data.counts == 0) {
                    $('.card')
                        .css({
                            'visibility': 'revert',
                            'color': 'red'
                        })
                        .text('没得数据')
                } else {
                    $('.card')
                        .css({
                            'visibility': 'hidden',
                            'color': 'red'
                        })
                        .text('填写或操作错误')
                }


                let li = ''
                    // 判断下面的小按钮
                if (data.sum_pages <= 5) {
                    for (let i = 1; i <= data.sum_pages; i++) {
                        li += `<li class="page-link page-item">${i}</li>`
                    }
                    $('.pagination').html(li);
                } else {
                    for (let i = 1; i <= 5; i++) {
                        li += `<li class="page-link page-item">${i}</li>`
                    }
                    $('.pagination').html(li);
                    $('.pagination').append(`<li class="page-link">...</li><li class="page-link page-item">${data.sum_pages}</li><li class="page-link" id='jump_page'>跳到</li><li class="page-link"><input type='text' id='page_id'></li>`)
                }
                // 显示多少条数据
                $('.hint-body').text(data.counts + '条数据');

                let tr = '';
                $(data.list).each(function(index, item) {
                    $('.add_client').css('display', 'none')
                    if (item.whether_add == true) {
                        item.whether_add = '已添加'
                    } else {
                        item.whether_add = '未添加'
                    }
                    tr += `
                <tr>
                    <td>${item.add_date}</td>
                    <td>${item.weixin}</td>
                    <td>${item.extensionagent_name}</td>
                    <td>${item.whether_add}</td>
                    <td>
                        <button type="button" class="btn btn-info add_client"data-toggle="modal" data-target="#myModal" id=''>添加到我的客户</button>
                    </td>
                </tr>
                `;
                });
                $(tbody).html(tr)
            });
        };
    };


    // 点击是否添加(销售员)
    $('.dropdown-item').click(function() {
        is_add_fn(1, 1, this);
        $('#if_add_none').val($(this).text())
    });

    // 点击是否添加调用的函数(销售员)
    function is_add_fn(number, index, element) {
        // element 判断点击的是 哪个按钮
        let whether = 0;
        if ($(element).text() == '是') {
            whether = 1
        } else {
            whether = 0
        }
        $.post('http://39.106.26.6:8888/get_stus_bywhether_add_saler_id/', { saler_id: `${ea_id}`, whether_add: `${whether}`, page_size: `${number}`, current_page: `${index}` }, function(data) {
            let li = ''
                // 判断下面的小按钮
            if (data.sum_pages <= 5) {
                for (let i = 1; i <= data.sum_pages; i++) {
                    li += `<li class="page-link page-item">${i}</li>`
                }
                $('.pagination').html(li);
            } else {
                for (let i = 1; i <= 5; i++) {
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

                // 显示多少条数据
                $('.hint-body').text(data.counts + '条数据');

                tr += `
                  <tr>
                       <td>${item.add_date}</td>
                      <td>${item.weixin}</td>
                      <td>
                            <p>${item.ea_name}</p>
                            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" value='${item.saler_id}'>修改微信</button>
                      </td>
                      <td>${item.whether_add}</td>
                      <td>
                        <button type="button" class="btn btn-info add_client"data-toggle="modal" data-target="#myModal" id=''>添加到我的客户</button>
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

} else {
    console.log('管理员');

    // 点击1234按钮切换分页
    $('.paginabtion').on('click', '.page-item', function() {
        page = $(this).text();
        // 如果模糊查询里
        // 填值了就掉模糊查询的方法
        // 没值就直接分页展示(分页的方法 saler_page)
        if ($(weixin_dim).val() == '' && $(if_add_none).val() == '') {
            saler_page(1, page);
        } else if ($(if_add_none).val() == '') {
            dim_page(1, page)
        } else {
            is_add_fn(1, page);
        }
    });


    // 点击跳到按钮
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

        if ($(weixin_dim).val() == '') {
            saler_page(1, page);
        } else {
            dim_page(1, page)
        }
    });



    // 处理分页的函数(管理员)
    function saler_page(number, index) {
        // 获取所有推广员的相关信息(管理员)
        $.post('http://39.106.26.6:8888/get_all_stus_saler/', { page_size: `${number}`, current_page: `${index}` }, function(data) {
            let li = ''
                // 判断下面的小按钮
            if (data.sum_pages <= 5) {
                for (let i = 1; i <= data.sum_pages; i++) {
                    li += `<li class="page-link page-item">${i}</li>`
                }
                $('.pagination').html(li);
            } else {
                for (let i = 1; i <= 5; i++) {
                    li += `<li class="page-link page-item">${i}</li>`
                }
                $('.pagination').html(li);
                $('.pagination').append(`<li class="page-link">...</li><li class="page-link page-item">${data.sum_pages}</li><li class="page-link" id='jump_page'>跳到</li><li class="page-link"><input type='text' id='page_id'></li>`)
            }
            // 显示多少条数据
            $('.hint-body').text(data.counts + '条数据');

            let tr = '';
            $(data.list).each(function(index, item) {
                $('.add_client').css('display', 'none')
                if (item.whether_add == true) {
                    item.whether_add = '已添加'
                } else {
                    item.whether_add = '未添加'
                }
                tr += `
                <tr>
                    <td>${item.add_date}</td>
                    <td>${item.weixin}</td>
                    <td>${item.extensionagent_name}</td>
                    <td>${item.whether_add}</td>
                    <td>
                        <button type="button" class="btn btn-info add_client"data-toggle="modal" data-target="#myModal" id=''>添加到我的客户</button>
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
        });
    };


    // 根据手机号，查找销售员 模糊查询  (管理员)
    $('.find').click(function() {
        dim_page(1, 1)
    });

    // 模糊查询的分页(管理员)
    function dim_page(number, index) {
        let weixin_val = $('#weixin').val();
        if (weixin_val == '') {
            console.log('请输入微信');
        } else {
            $.post('http://39.106.26.6:8888/get_stus_like_byweixin/', { weixin: `${weixin_val}`, page_size: `${number}`, current_page: `${index}` }, function(data) {
                if (data.counts == 0) {
                    $('.card')
                        .css({
                            'visibility': 'revert',
                            'color': 'red'
                        })
                        .text('没得数据')
                } else {
                    $('.card')
                        .css({
                            'visibility': 'hidden',
                            'color': 'red'
                        })
                        .text('填写或操作错误')
                }


                let li = ''
                    // 判断下面的小按钮
                if (data.sum_pages <= 5) {
                    for (let i = 1; i <= data.sum_pages; i++) {
                        li += `<li class="page-link page-item">${i}</li>`
                    }
                    $('.pagination').html(li);
                } else {
                    for (let i = 1; i <= 5; i++) {
                        li += `<li class="page-link page-item">${i}</li>`
                    }
                    $('.pagination').html(li);
                    $('.pagination').append(`<li class="page-link">...</li><li class="page-link page-item">${data.sum_pages}</li><li class="page-link" id='jump_page'>跳到</li><li class="page-link"><input type='text' id='page_id'></li>`)
                }
                // 显示多少条数据
                $('.hint-body').text(data.counts + '条数据');

                let tr = '';
                $(data.list).each(function(index, item) {
                    $('.add_client').css('display', 'none')
                    if (item.whether_add == true) {
                        item.whether_add = '已添加'
                    } else {
                        item.whether_add = '未添加'
                    }
                    tr += `
                <tr>
                    <td>${item.add_date}</td>
                    <td>${item.weixin}</td>
                    <td>${item.extensionagent_name}</td>
                    <td>${item.whether_add}</td>
                    <td>
                        <button type="button" class="btn btn-info add_client"data-toggle="modal" data-target="#myModal" id=''>添加到我的客户</button>
                    </td>
                </tr>
                `;
                });
                $(tbody).html(tr)
            });
        };
    };


    // 点击是否添加(管理员)
    $('.dropdown-item').click(function() {
        is_add_fn(1, 1, this);
        $('#if_add_none').val($(this).text())
    });

    // 点击是否添加调用的函数(管理员)
    function is_add_fn(number, index, element) {
        // element 判断点击的是 哪个按钮
        let whether = 0;
        if ($(element).text() == '是') {
            whether = 1
        } else {
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
                for (let i = 1; i <= 5; i++) {
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

                // 显示多少条数据
                $('.hint-body').text(data.counts + '条数据');

                tr += `
                  <tr>
                       <td>${item.add_date}</td>
                      <td>${item.weixin}</td>
                      <td>
                            <p>${item.ea_name}</p>
                            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" value='${item.saler_id}'>修改微信</button>
                      </td>
                      <td>${item.whether_add}</td>
                      <td>
                        <button type="button" class="btn btn-info add_client"data-toggle="modal" data-target="#myModal" id=''>添加到我的客户</button>
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