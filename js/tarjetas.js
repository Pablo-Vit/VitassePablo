/* PRODUCTOS
    <div id="producto" class="producto">
        <img src="imgs/products/68cddefee3e20.png" class="producto-img">
        <div class="producto-info">
            <p class="producto-nombre">Alfajor</p>
            <p class="producto-descr">descripcion del alfajor</p>
            <div class="producto-bot">
                <button class="producto-add">+</button>
                <p class="producto-price">300.25</p>
            </div>
        </div>
    </div>
*/
/* PEDIDOS
<div class="tarjeta">
    <div class="tarjeta-header">
      <span>#1 Pendiente</span>
      <span>2025-09-25 12:48</span>
    </div>

    <table class="tabla">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Zapallo</td>
          <td>$300</td>
          <td>2</td>
        </tr>
      </tbody>
    </table>
  </div>
*/
import { agregarAlCarrito, agregarCantidad, eliminarDelCarrito, carrito } from './carrito.js';
const imgsPath = 'imgs/products/';

export function tarjetaProductoNormal(id, nombre, descr, imagen, precio) {
    if (carrito.items.map(item => item.id).includes(id)) {
        console.log('Producto ya en carrito. ID:', id);
        let item = carrito.items.find(item => item.id === id);
        return tarjetaProductoAgregado(id, nombre, descr, imagen, precio, item.cantidad);
    }
    /*<article class="card">
          <div class="card-media">
            <img src="image.png" alt="imagen producto">
          </div>
          <div class="card-body">
            <h3 class="title">Zapallo</h3>
            <p class="desc">Es un zapallo mi rey</p>
            <div class="card-footer">
              <div class="price">$1,351.00</div>
              <div class="controls">
                <button class="qty">+</button>
              </div>
            </div>
          </div>
        </article> */
    const tarjeta = document.createElement("article");
    tarjeta.id = "producto-" + id;
    tarjeta.className = "card";

    const media = document.createElement("div");
    media.className = "card-media";
    media.innerHTML = `<img src="${imgsPath + imagen}" alt="imagen producto" class="imagen">`;

    const body = document.createElement("div");
    body.className = "card-body";

    const titulo = document.createElement("h3");
    titulo.className = "title";
    titulo.textContent = nombre;

    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = descr;

    const footer = document.createElement("div");
    footer.className = "card-footer";
    
    const price = document.createElement("div");
    price.className = "price";
    price.textContent = `$${precio}`;
    
    const controls = document.createElement("div");
    controls.className = "controls";

    const boton = document.createElement("button");
    boton.className = "qty";
    boton.textContent = "+";
    boton.id = 'add-' + id;
    boton.onclick = () => {
    agregarAlCarrito(id);

  };

    controls.appendChild(boton);

    footer.appendChild(price);
    footer.appendChild(controls);

    body.appendChild(titulo);
    body.appendChild(desc);
    body.appendChild(footer);

    tarjeta.appendChild(media);
    tarjeta.appendChild(body);

    return tarjeta;
}

export function tarjetaProductoAgregado(id, nombre, descr, imagen, precio, cantidad) {
    if (cantidad == null) {
      eliminarDelCarrito(id);
      alert(`Un producto que tenias en el carrito no se guardo correctamente y se eliminó (${nombre})`);
      return tarjetaProductoNormal(id, nombre, descr, imagen, precio);
    }
    const tarjeta = document.createElement("article");
    tarjeta.id = "producto-" + id;
    tarjeta.className = "card";

    const media = document.createElement("div");
    media.className = "card-media";
    media.innerHTML = `<img src="${imgsPath + imagen}" alt="imagen producto" class="imagen">`;

    const body = document.createElement("div");
    body.className = "card-body";

    const titulo = document.createElement("h3");
    titulo.className = "title";
    titulo.textContent = nombre;

    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = descr;

    const footer = document.createElement("div");
    footer.className = "card-footer";

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = `$${precio}`;
    
    const controls = document.createElement("div");
    controls.className = "controls";

    

    const inputCantidad = document.createElement('input');
    inputCantidad.type = 'number';
    inputCantidad.min = '1';
    inputCantidad.value = cantidad;
    inputCantidad.className = 'quantity';
    inputCantidad.id = 'cantidad-' + id;
    inputCantidad.onchange = () => {
        agregarCantidad(id, parseInt(inputCantidad.value));
    };
    inputCantidad.oninput = () => {
        agregarCantidad(id, parseInt(inputCantidad.value));
    };
    
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

    const btnDel = document.createElement('button');
    btnDel.className = 'qty';
    btnDel.textContent = 'x';
    btnDel.id = 'del-' + id;
    btnDel.onclick = () => {
        eliminarDelCarrito(id);
        const nuevaTarjeta = tarjetaProductoNormal(id, nombre, descr, imagen, precio);
        document.getElementById('producto-' + id).replaceWith(nuevaTarjeta);
    };
    
    controls.appendChild(minus);
    controls.appendChild(inputCantidad);
    controls.appendChild(add);

    footer.appendChild(price);
    footer.appendChild(controls);

    body.appendChild(titulo);
    body.appendChild(desc);
    body.appendChild(footer);

    tarjeta.appendChild(media);
    tarjeta.appendChild(body);

    return tarjeta;
}

export function tarjetaPedido(id, estado, fecha, productos, total) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';
    tarjeta.id = 'pedido-'+id;

    const header = document.createElement('div');
    header.className = 'tarjeta-header';

    const spanIdEstado = document.createElement('span');
    spanIdEstado.textContent = `${estado}`; //#${id}

    const spanFecha = document.createElement('span');
    spanFecha.textContent = fecha;
    
    const totalt = document.createElement("div");
    totalt.textContent = 'Total: '+total;
    header.appendChild(spanIdEstado);
    header.appendChild(spanFecha);

    const tabla = document.createElement('table');
    tabla.className = 'tabla';

    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    ['Nombre', 'Precio', 'Cantidad'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        trHead.appendChild(th);
    });
  
    thead.appendChild(trHead);

    const tbody = document.createElement('tbody');
    productos.forEach(prod => {
        const tr = document.createElement('tr');
        const tdNombre = document.createElement('td');
        tdNombre.textContent = prod.name;
        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = `$${prod.price}`;
        const tdCantidad = document.createElement('td');
        tdCantidad.textContent = `${prod.real_quant}(de: ${prod.cant})`;
        tr.appendChild(tdNombre);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdCantidad);
        tbody.appendChild(tr);
    });

    tabla.appendChild(thead);
    tabla.appendChild(tbody);

    tarjeta.appendChild(header);
    tarjeta.appendChild(totalt);
    tarjeta.appendChild(tabla);

    return tarjeta;
}


