fetch('../php/auth/checklogin.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
.then(response => response.json())
.then(data => {
    if (!data.success) {
        window.location.href = '../login/';
        return;
    }
    checkadmin();
})
function checkadmin() {
    fetch('../php/auth/checkadmin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (!data.success) {
            window.location.href = '../';
            return;
        }
    })
}
