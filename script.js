
import { tarjetaProductoNormal } from './js/tarjetas.js';


fetch('php/auth/getinfo.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);
    sessionStorage.setItem('username', data.username);
    //<button>Admin</button>
    sessionStorage.setItem('id', data.id);
    sessionStorage.setItem('admin', data.admin);
    if (data.admin) {
        let admin = document.createElement("button");
        admin.onclick = () => {window.location.href = 'admin/'};
        admin.className = "logout";
        admin.textContent = "Admin";
        document.getElementById("actions").prepend(admin);
    }
    getProducts();
    let carrito = sessionStorage.getItem('carrito') ? JSON.parse(sessionStorage.getItem('carrito')) : {
        items: []
    };
    const carritocount = document.getElementById("carritocount");
    carritocount.textContent = carrito.items.length;
});

let productos = [];

function getProducts() {
    fetch('php/products/getproducts.php', {method: 'POST'})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.results.forEach(prod => {
            productos = data;
            document.getElementById('contenido').appendChild(tarjetaProductoNormal(prod.id, prod.name, prod.descr, prod.image_url, prod.price));
        });
    })
}

const search = document.getElementById("search");
search.oninput = () => {
    document.getElementById('contenido').innerHTML = '';
    productos.forEach(prod => {
        if (prod.name.includes(search.value)) {
            document.getElementById('contenido').appendChild(tarjetaProductoNormal(prod.id, prod.name, prod.descr, prod.image_url, prod.price));
        }
    });
}





