const form = document.getElementById('registerForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    fetch('../php/auth/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `firstname=${encodeURIComponent(data.firstname)}&lastname=${encodeURIComponent(data.lastname)}&email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.error === 0 || data.error === 1) {
            window.location.href = '../login/';
            return;
        } else {
            alert(data.msg);
        }
        console.log(data);
    })
});