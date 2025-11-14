const contenido = document.getElementById('contenido');
import {tarjetaPedido} from './js/tarjetas.js'

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

function recargarPedidos() {
    fetch("php/orders/getorders.php",{
    method: 'POST',
    headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (typeof data.error === 'string') {
            contenido.innerHTML = '<h2>No hay pedidos o ha ocurrido un error</h2>';
        }
        else {
            data.forEach(pedido => {
                let estado;
                switch (pedido.state) {
                    case 'pending':
                        estado = 'Pendiente';
                        break;
                        
                    case 'approved':
                        estado = 'Aprobado';
                        break;
                    
                    case 'refused':
                        estado = 'Rechazado';
                        break;
                    
                    case 'finished':
                        estado = 'Finalizado';
                        break;
                    
                    case 'delivered':
                        estado = 'Entregado';
                        break;
                    
                    default:
                        estado = 'Pendiente';
                        break;
                }
                contenido.appendChild(tarjetaPedido(pedido.id, estado, pedido.created_at, pedido.items, pedido.total))
            });
        }
    })
}
recargarPedidos();
