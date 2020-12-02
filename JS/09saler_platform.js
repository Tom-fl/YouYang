function saler_init() {
    estimate(); // 点击查看或查看所有的 传过来的值  03saler_list
    if_add(); // 点击是否添加
    add_client(); // 点击添加到我的客户,添加到某个客户到销售员
}

let tbody = $('tbody');

function estimate() {
    let saler_platform_all = localStorage.getItem('saler_platform_all');
    let saler_platform_all_parse = JSON.parse(saler_platform_all);

    let saler_platform_one = localStorage.getItem('saler_platform_one');
    let saler_platform_one_parse = JSON.parse(saler_platform_one);

    if (saler_platform_one_parse == null) {
        estimate_value(saler_platform_all_parse)
    } else {
        estimate_value(saler_platform_one_parse);
    }

    function estimate_value(datum) {
        if (JSON.stringify(datum) == '[]') {
            let tr = `
            <tr>
                <td colspan='5'>没有数据</td>
             </tr>
            `
            $(tbody).html(tr);
        } else {
            let tr = '';
            $(datum).each(function(index, item) {
                if (item.whether_add == true) {
                    item.whether_add = '已添加'
                } else {
                    item.whether_add = '未添加'
                }
                tr += `
                <tr>
                      <td>${item.add_date}</td>
                      <td>${item.weixin}</td>
                      <td>${item.saler_name}</td>
                      <td>${item.whether_add}</td>
                      <td>
                          <button type="button" class="btn btn-info" value='${item.s_id}' id='add_client'>添加到我的客户</button>
                      </td>
                </tr>
                `;
                tbody.html(tr);
            });
        }
    };
};


function if_add() {

    /*
     * 点击是否添加
     *      如果选择的是，就渲染已添加的数据
     *      如果选择的否，就渲染未添加的数据
     */
    $('.dropdown-item').click(function() {
        let whether = 0;
        if ($(this).text() == '是') {
            whether = 1
        } else {
            whether = 0
        }
        $.post('http://47.111.73.231:8080/get_stus_bywhether_add/', { whether_add: `${whether}`, page_size: `5`, current_page: `1` }, function(data) {
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
                      <td>${item.weixin}</td>
                      <td>${item.saler_name}</td>
                      <td>${item.whether_add}</td>
                      <td>
                          <button type="button" class="btn btn-info" value='${item.s_id}'>添加到我的客户</button>
                      </td>
                </tr>
                `;
            });
            $(tbody).html(tr);
        })
    })
};


function add_client() {
    $(tbody).on('click', '#add_client', function() {
        let $this = this;
        $.post('http://47.111.73.231:8080/add_stu_to_saler/', { stu_id: `${$(this).val()}` }, function(data) {
            console.log(data);
            if (data.info == '已经添加！') {
                console.log($($this).val());
                let add_user_all = JSON.parse(window.localStorage.getItem('saler_platform_all'));
                $(add_user_all).each(function(index, item) {
                    // if ($($this).val() == item) {}
                })


                // $($this).parent().siblings().eq(3).text('已添加');
            } else {

            }

        })
    })
};



saler_init(); // 入口