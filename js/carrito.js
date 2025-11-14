export let carrito = sessionStorage.getItem('carrito') ? JSON.parse(sessionStorage.getItem('carrito')) : {
    items: []
};
let estaencarrito = false;

export function modoCarrito() {
    estaencarrito = true;
}

import { tarjetaProductoNormal } from './tarjetas.js';
console.log('Carrito cargado:', carrito);
const carritocount = document.getElementById("carritocount");
export function agregarAlCarrito(id) {
    document.getElementById('add-' + id).remove();
    const inputCantidad = document.createElement('input');
    inputCantidad.type = 'number';
    inputCantidad.min = '1';
    inputCantidad.value = 1;
    inputCantidad.className = 'quantity';
    inputCantidad.id = 'cantidad-' + id;
    inputCantidad.onchange = () => {agregarCantidad(id, parseInt(inputCantidad.value));}
    inputCantidad.oninput = () => {agregarCantidad(id, parseInt(inputCantidad.value));}
    document.getElementById('producto-' + id).getElementsByClassName('controls')[0].appendChild(inputCantidad);
    const minus = document.createElement("button");
    minus.className = "action";
    minus.textContent = "-";
    minus.onclick = () => {
        agregarCantidad(id, parseInt(inputCantidad.value)-1);
    };

    const add = document.createElement("button");
    add.className = "action";
    add.textContent = "+";
    add.onclick = () => {
        agregarCantidad(id, parseInt(inputCantidad.value)+1);
    };
    document.getElementById('producto-' + id).getElementsByClassName('controls')[0].prepend(minus);
    document.getElementById('producto-' + id).getElementsByClassName('controls')[0].append(add);
    carrito.items.push({ id: id, cantidad: 1 });
    console.log('Producto agregado al carrito. ID:', id);
    console.log('Carrito actual:', carrito);
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    carritocount.textContent = carrito.items.length;
}

export function agregarCantidad(id, nuevaCantidad) {
    /*console.log(nuevaCantidad);
    console.log(`<=0 : ${nuevaCantidad<=0}`);
    console.log(`null : ${nuevaCantidad==null}`);
    console.log(`undefined : ${nuevaCantidad==undefined}`);
    console.log(`es nan : ${Number.isNaN(nuevaCantidad)}`);*/
    if (Number.isNaN(nuevaCantidad)) {
        alert("Coloque solo numeros");

    }
    if (nuevaCantidad <= 0 || nuevaCantidad == null || nuevaCantidad == undefined) {
        eliminarDelCarrito(id);
        if (!estaencarrito) {
            const prod = document.getElementById('producto-' + id);
            const nombre = prod.getElementsByClassName('title')[0].innerText;
            const descr = prod.getElementsByClassName('desc')[0].innerText;
            const imagen = prod.getElementsByClassName('imagen')[0].src.split('/').pop();
            const precio = prod.getElementsByClassName('price')[0].innerText.replace('$','');
            const nuevaTarjeta = tarjetaProductoNormal(id, nombre, descr, imagen, precio);
            document.getElementById('producto-' + id).replaceWith(nuevaTarjeta);        
        } else {
            document.getElementById('producto-' + id).remove();
        }
        return false;
    }
    const item = carrito.items.find(item => item.id === id);
    if (item) {
        item.cantidad = nuevaCantidad;
        document.getElementById('cantidad-'+id).value = nuevaCantidad;
        console.log('Cantidad actualizada. ID:', id, 'Nueva cantidad:', nuevaCantidad);
        console.log('Carrito actual:', carrito);
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
        return true;
    }
}

export function eliminarDelCarrito(id) {
    carrito.items = carrito.items.filter(item => item.id !== id);
    console.log('Producto eliminado del carrito. ID:', id);
    console.log('Carrito actual:', carrito);
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    carritocount.textContent = carrito.items.length;
}