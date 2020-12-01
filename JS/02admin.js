let login_user = window.localStorage.getItem('login_user');
if (login_user !== '管理员页面') {
    window.location.href = '01logoin.html'
};