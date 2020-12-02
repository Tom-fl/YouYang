function ea_init() {
    if_user(); // 判断哪个用户登录进来，并渲染值(比如是管理员登录进来的，就渲染管理员对应的值)
};
let login_name = window.localStorage.getItem('login_user'); // 登录的什么角色
let ea_id = JSON.parse(window.localStorage.getItem('login_id')); // 推广员的id
let tbody = $('tbody');


function if_user() {
    if (login_name == '推广员页面') {
        console.log('推广员');

        // 获取某个推广员的相关信息(推广员)
        $.get('http://39.106.26.6:8888/get_all_by_eaid/', { ea_id: `${ea_id}`, page_size: `1`, current_page: `1` }, function(data) {
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
        });

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
                e.preventDefault()
                $(this).attr('href', `http://39.106.26.6:8888/export_all_by_start_end_time_ea_id?ea_id=${ea_id}start_time=${start_time}&end_time=${end_time}`);
                $('.hint')
                    .hide('fast', function() {
                        $('.alert ')
                            .css('visibility', 'inherit')
                            .addClass('alert-success ')
                            .text('请选择开始和结束时间')
                    })
            }
        });


        // 点击添加按钮(推广员)
        $('.dropdown-item').click(function() {
            let whether = 0;
            if ($(this).text() == '是') {
                whether = 1
            } else {
                whether = 0
            }
            $.post('http://39.106.26.6:8888/get_all_by_eaid_whether_add/', { ea_id: `${ea_id}`, whether_add: `${whether}`, page_size: `5`, current_page: `1` }, function(data) {
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
            })
        });

    } else {
        console.log('管理员');
        // 获取所有推广员的相关信息(管理员)
        $.post('http://39.106.26.6:8888/get_all_clients_ea/', { page_size: `10`, current_page: `2` }, function(data) {
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
        });


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
                console.log('a');
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


        // 点击添加(管理员)
        $('.dropdown-item').click(function() {
            let whether = 0;
            if ($(this).text() == '是') {
                whether = 1
            } else {
                whether = 0
            }
            $.post('http://39.106.26.6:8888/get_all_by_whether_add/', { whether_add: `${whether}`, page_size: `5`, current_page: `1` }, function(data) {
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
            })
        });
    };
};


ea_init();