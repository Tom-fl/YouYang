$('.dropdown-menu').click((e) => {
    let val = $(e.target).text();
    $('.dropdown-toggle').text(val)
})