const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    fetch('../php/auth/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.error === 0 || data.error === 1) {
            window.location.href = '../';
            return;
        } else {
            alert(data.msg);
        }
    })
});