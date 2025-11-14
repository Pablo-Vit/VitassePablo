import { tarjetaProductoAgregado } from './js/tarjetas.js'
import { modoCarrito } from './js/carrito.js'
modoCarrito();
const contenido = document.getElementById('contenido');
let carrito = sessionStorage.getItem('carrito') ? JSON.parse(sessionStorage.getItem('carrito')) : {
    items: []
};

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
    sessionStorage.setItem('id', data.id);
    sessionStorage.setItem('admin', data.admin);
    if (data.admin) {
        let admin = document.createElement("button");
        admin.onclick = () => {window.location.href = 'admin/'};
        admin.className = "logout";
        admin.textContent = "Admin";
        document.getElementById("actions").prepend(admin);
    }
    let carrito = sessionStorage.getItem('carrito') ? JSON.parse(sessionStorage.getItem('carrito')) : {
        items: []
    };
    const carritocount = document.getElementById("carritocount");
    carritocount.textContent = carrito.items.length;
});

async function mostrarProductosCarrito() {
    if (carrito.items.length === 0) {
        contenido.innerHTML = '<h2>Carrito vacio</h2>'
        return;
    }

    const promesas = carrito.items.map(async producto => {
        const data = await obtenerInfo(producto.id);
        console.log('prod:', data);
        return {
            id: producto.id,
            nombre: data.name,
            descr: data.descr,
            imagen: data.image_url,
            precio: data.price,
            cantidad: producto.cantidad
        };
    });
    let btn = document.createElement('button');
    btn.textContent = 'Generar pedido';
    btn.onclick = () => { enviarCarrito(); };
    document.getElementById('enviar').appendChild(btn);
    // Espero a que todas terminen
    const info = await Promise.all(promesas);
    info.forEach(producto => {
        console.log('producto:',producto)
        contenido.appendChild(tarjetaProductoAgregado(producto.id, producto.nombre, producto.descr, producto.imagen, producto.precio, producto.cantidad));
    });
}
mostrarProductosCarrito();
async function obtenerInfo(id) {
    try {
        const response = await fetch('php/products/getproductinfo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + encodeURIComponent(id)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        console.log("Respuesta del servidor:", result);
        return result;

    } catch (error) {
        console.error("Error al obtener la info:", error);
        return null;
    }
}

function enviarCarrito() {
    let items = [];
    carrito.items.forEach(prod => {
        items.push({"id": prod.id, "quantity": prod.cantidad})
    })
    
    fetch('php/orders/createorder.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'items=' + encodeURIComponent(JSON.stringify(items))
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        carrito.items.length = 0;
        sessionStorage.setItem('carrito',JSON.stringify(carrito))
        contenido.innerHTML = '<h2>Carrito vacio</h2>'
    });
}

