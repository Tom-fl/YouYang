$(function() {
	$.ajaxSetup({
		cache: true,
		type: 'POST',
		async: false,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		dataType: "json",
		error: function(data) {
			console.log(data)
		},
		beforeSend: function(xhr) {
			// xhr.setRequestHeader("USERNAME", "test");
		}
	});
	paging_ul = $("#paging_number");
	sum_pages = 0;
	$.ajax({
		url: 'http://39.106.26.6:8888/saler_page/',
		data: {
			page_size: 1,
			current_page: 1
		},
		success: function(data) {
			sum_pages = data['sum_pages']
		}
	}).then(function() {
		//console.log(sum_pages)
		if (sum_pages <= 5) {
			for (let i = 1; i <= sum_pages; i++) {
				//console.log(i)
				li = $("<li>" + i + "</li>")
				paging_ul.append(li)
			}
		} else {
			for (let i = 1; i <= 5; i++) {
				li = $("<li>" + i + "</li>")
				paging_ul.append(li)
			}
			li = $("<li>...</li>")
			paging_ul.append(li)
			li = $("<li>" + sum_pages + "</li>")
			paging_ul.append(li)
			li = $("<li>跳到</li>")
			paging_ul.append(li)
			li = $("<li><input type='text'/></li>")
			paging_ul.append(li)
		}
		$("#paging_number li").on("click",function(){
			var num=parseInt($(this).html())
			var lis=$("#paging_number li")
			if(num%5==0&&num+5<sum_pages){
				$(lis[0]).html(num+1)
				$(lis[1]).html(num+2)
				$(lis[2]).html(num+3)
				$(lis[3]).html(num+4)
				$(lis[4]).html(num+5)
			
			}
			if(num%5==0&&num+5>=sum_pages){
				$(lis[0]).html(sum_pages-4)
				$(lis[1]).html(sum_pages-3)
				$(lis[2]).html(sum_pages-2)
				$(lis[3]).html(sum_pages-1)
				$(lis[4]).html(sum_pages)
				$(lis[5]).html("")
				$(lis[6]).html("")
				$(lis[7]).html("")
				$(lis[8]).html("")
			}
		})

	})


})
