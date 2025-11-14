const lista = document.getElementById("menuacciones");
const contenido = document.getElementById("contenido");
let datos = [];


function cambiarMenu(opcion) {
    console.log(opcion);
    if (opcion === "productos") {
        lista.innerHTML = `<button class="menu-opc" onclick="crearFrame('crear-prod')">Crear</button>
        <button class="menu-opc" onclick="crearFrame('modif-prod')">Modificar</button>
        <button class="menu-opc" onclick="crearFrame('elim-prod')">Eliminar</button>`;
    } else if (opcion === "pedidos") {
        lista.innerHTML = `<button class="menu-opc" onclick="crearFrame('lista-pedid')">Lista</button>
        <button class="menu-opc" onclick="crearFrame('modif-pedid')">Modificar</button>`;
    } else if (opcion === "listados") {
        lista.innerHTML = `<button class="menu-opc" onclick="crearFrame('lista-pedid')">Pedidos</button>
        <button class="menu-opc" onclick="crearFrame('lista-prod')">Productos</button>`;
    } else {
        lista.innerHTML = '';
    }
}

function crearFrame(frame) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../styles/tarjetas.css';
    console.log(frame);
    switch (frame) {
        //Productos
        case 'crear-prod':
            contenido.innerHTML = `
            <div id="crearproducto" class="admin-form">
                <form id="createform">
                    <input type="text" name="name" placeholder="Nombre" required><br>
                    <textarea name="descr" placeholder="Descripcion" required></textarea><br>
                    <input type="file" name="image" placeholder="Imagen"><br>
                  <input type="number" name="stock" placeholder="Stock" required><br>
                    <input type="number" name="price" step="0.01" placeholder="Precio" required><br>
                    <button>Enviar</button>
                </form>
            </div>`;
            crearProd();
            break;
        case 'modif-prod':
            contenido.innerHTML = `
            <div class="pag" id="pag">
                <div class="modifydiv" id="modifydiv">
                    <h2>Modificar producto</h2>
                    <form id="modifyform">
                        <label for="prodid">ID:</label>
                        <input type="number" id="prodid" name="id" required><br>
                        <label for="prodname">Nombre:</label>
                        <input type="text" id="prodname" name="name"><br>
                        <label for="proddescr">Descripcion:</label>
                        <input type="text" id="proddescr" name="descr"><br>
                        <label for="prodimg">Imagen:</label>
                        <input type="file" name="image" id="prodimg"><br>
                        <label for="prodprice">Precio:</label>
                        <input type="number" step="0.01" id="prodprice" name="price"><br>
                        <label for="prodstock">Stock:</label>
                        <input type="number" id="prodstock" name="stock"><br>
                        <button type="submit">Modificar</button>
                    </form>
                </div>
            </div>
            <h2>Lista <button id="updatelist">Actualizar</button></h2>
            <div id="listaProds" class="listaProds">
            </div>`;
            document.head.appendChild(link);
            modificarProd();
            break;
        case 'elim-prod':
            contenido.innerHTML = `
            <form id="deleteform">
                <input type="number" placeholder="ID" name="id" id="id" min="1" required>
                <button>Eliminar</button>
            </form>
            </div>
                <h2>Lista <button id="updatelist">Actualizar</button></h2>
                <div id="listaProds" class="listaProds">
            </div>`;
            document.head.appendChild(link);
            getProducts();
            eliminarProd();
            break;
        //Pedidos
        case 'lista-pedid':
            contenido.innerHTML = `
            <div id="menupedidos" class="menu-lista">
                <form id="listform">
                    <input type="text" name="apellido" placeholder="Apellido">
                    <select name="state">
                        <option value="pending">Pendiente</option>
                        <option value="approved">Aprobado</option>
                        <option value="refused">Rechazado</option>
                        <option value="finished">Terminado</option>
                        <option value="delivered">Entregado</option>
                    </select>
                    <button>Obtener</button>
                </form>
                <div id="contenidolista" class="listaPedidos"></div>
            </div>`;
            
            const listform = document.getElementById('listform');
            listform.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(listform);
                const lista = document.getElementById('contenidolista');
                lista.innerHTML = '';
                console.log('Contenido de FormData:');
                const data = Object.fromEntries(formData);
                console.log(data);
                datos.forEach(pedido => {
                    if (data.apellido != '') {
                        if (pedido.user.lastname.toLowerCase().includes(data.apellido.toLowerCase()) && pedido.state == data.state) {
                            lista.appendChild(tarjetaPedido(pedido.id, pedido.user, pedido.state, pedido.created_at, pedido.items));
                        }
                    } else {
                        if (pedido.state == data.state) {
                            lista.appendChild(tarjetaPedido(pedido.id, pedido.user, pedido.state, pedido.created_at, pedido.items));
                        }
                    }
                });
            });
            document.head.appendChild(link);
            obtenerPedidos();
            break;
        case 'modif-pedid':
            contenido.innerHTML = `
            <div id="menupedidos" class="menu-lista">
                <form id="modform">
                    <input type="number" name="id" min="1" placeholder="ID del pedido">
                    <select name="state">
                        <option value="pending">Pendiente</option>
                        <option value="approved">Aprobado</option>
                        <option value="refused">Rechazado</option>
                        <option value="finished">Terminado</option>
                        <option value="delivered">Entregado</option>
                    </select>
                    <button>Modificar</button>
                </form>
                <div id="contenidolista" class="listaPedidos"></div>
            </div>`;
            const modform = document.getElementById('modform');
            modform.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(modform);
                const lista = document.getElementById('contenidolista');
                console.log('Contenido de FormData:');
                const data = Object.fromEntries(formData);
                console.log(data);
                fetch('orders/changestate.php', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al conectar con el servidor');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (!data.error) {
                            alert('Ha ocurrido un error.\nLlame a un administrador e intente mas tarde.');
                        } else {
                            alert('Pedido modificado con exito.');
                        }
                        console.log(data);
                    })
                /*.catch(error => {
                    alert('Error ');
                    console.error('Error:', error);
                });*/
            });

            document.head.appendChild(link);
            obtenerPedidos();
            break;
        //Listas
        case 'lista-usuar':

            break;
        case 'lista-prod':
            contenido.innerHTML = `
            </div>
                <h2>Lista <button id="updatelist">Actualizar</button></h2>
                <div id="listaProds" class="listaProds">
            </div>`;
            document.head.appendChild(link);
            getProducts();
            const updatelistbtn = document.getElementById('updatelist');
            updatelistbtn.addEventListener('click', getProducts);
            break;
        default:
            break;
    }
}

function crearProd() {
    const form = document.getElementById('createform');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const imageInput = form.querySelector('input[name="image"]');
        if (imageInput && imageInput.files.length === 0) {
            formData.delete('image');
        }
        console.log('Contenido de FormData:');
        for (const [key, value] of formData.entries()) { //Mostrar contenido del formulario
            if (value instanceof File) {
                console.log(`${key}: ${value.name} (Archivo)`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }
        fetch('products/create.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al conectar con el servidor');
                }
                return response.json();
            })
            .then(data => {
                if (!data.error) {
                    alert('Producto creado con exito.');
                } else {
                    alert('Ha ocurrido un error.\nLlame a un administrador e intente mas tarde.');
                }
                console.log(data);
            })
        /*.catch(error => {
            alert('Error ');
            console.error('Error:', error);
        });*/
    });

}

function modificarProd() {

    const updatelistbtn = document.getElementById('updatelist');
    updatelistbtn.addEventListener('click', getProducts);
    const form = document.getElementById('modifyform');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        //verificar que se modifique almenos un dato del producto
        let inputborrados = 0;
        const imageInput = form.querySelector('input[name="image"]');
        const nameInput = form.querySelector('input[name="name"]');
        const priceInput = form.querySelector('input[name="price"]');
        const stockInput = form.querySelector('input[name="stock"]');
        const descrInput = form.querySelector('input[name="descr"]');
        if (nameInput && nameInput.value.trim() === '') {
            inputborrados++;
            formData.delete('name');
        }
        if (priceInput && priceInput.value.trim() === '') {
            inputborrados++;
            formData.delete('price');
        }
        if (stockInput && stockInput.value.trim() === '') {
            inputborrados++;
            formData.delete('stock');
        }
        if (descrInput && descrInput.value.trim() === '') {
            inputborrados++;
            formData.delete('descr');
        }
        if (imageInput && imageInput.files.length === 0) {
            inputborrados++;
            formData.delete('image');
        }
        if (inputborrados >= 5) {
            alert('Debes completar al menos un campo para modificar.');
            return;
        }
        console.log('Contenido de FormData:');
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: ${value.name} (Archivo)`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }
        fetch('products/modify.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al conectar con el servidor');
                }
                return response.json();
            })
            .then(data => {
                if (!data.error) {
                    alert('Ha ocurrido un error.\nLlame a un administrador e intente mas tarde.');
                } else {
                    alert('Producto modificado con exito.');
                }
                console.log(data);
            })
        /*.catch(error => {
            alert('Error ');
            console.error('Error:', error);
        });*/
    });
    getProducts();
}

function eliminarProd() {
    const updatelistbtn = document.getElementById('updatelist');
    updatelistbtn.addEventListener('click', getProducts);
    const form = document.getElementById('deleteform');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        
        fetch('products/delete.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al conectar con el servidor');
                }
                return response.json();
            })
            .then(data => {
                if (!data.error) {
                    alert('Producto eliminado con exito.');
                } else {
                    alert(data.error);
                }
                console.log(data);
            })
        /*.catch(error => {
            alert('Error ');
            console.error('Error:', error);
        });*/
    });
}

function getProducts() {
    document.getElementById('listaProds').innerHTML = '';
    fetch('../php/products/getproductsordened.php', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            datos = data;
            console.log(data)
            data.forEach(prod => {
                document.getElementById('listaProds').appendChild(tarjetaProducto(prod.id, prod.name, prod.descr, prod.price, prod.stock, prod.image_url));
            });
        })
}


function tarjetaProducto(id, nombre, descr, precio, stock, imagen) {
    const imgsPath = "../imgs/products/";
    const tarjeta = document.createElement("article");
    tarjeta.id = "producto-" + id;
    tarjeta.className = "card";
    tarjeta.style = "width: 25%;";

    const media = document.createElement("div");
    media.className = "card-media";
    media.innerHTML = `<img src="${imgsPath + imagen}" alt="imagen producto" class="imagen">`;

    const body = document.createElement("div");
    body.className = "card-body";

    const titulo = document.createElement("h3");
    titulo.className = "title";
    titulo.textContent = nombre+ `(ID:${id})`;
    titulo.style = "color: black;";

    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = descr;

    const footer = document.createElement("div");
    footer.className = "card-footer";
    
    const price = document.createElement("div");
    price.className = "price";
    price.textContent = `PRECIO: $${precio}`;

    const stockd = document.createElement("div");
    stockd.className = "stock";
    stockd.textContent = `STOCK: ${stock}`;


    footer.appendChild(price);
    footer.appendChild(stockd);

    body.appendChild(titulo);
    body.appendChild(desc);
    body.appendChild(footer);

    tarjeta.appendChild(media);
    tarjeta.appendChild(body);

    return tarjeta;
}

function obtenerPedidos() {
    fetch('orders/getall.php', {
        method: 'POST'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al conectar con el servidor');
            }
            return response.json();
        })
        .then(data => {
            datos = data;
            const lista = document.getElementById('contenidolista');
            lista.innerHTML = '';
            data.forEach(pedido => {
                lista.appendChild(tarjetaPedido(pedido.id, pedido.user, pedido.state, pedido.created_at, pedido.items))
            });
            console.log(data);
        })
}

function tarjetaPedido(id, user, estado, fecha, productos) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';
    tarjeta.style = "margin:5px;";

    const header = document.createElement('div');
    header.className = 'tarjeta-header';
    
    const spanIdEstado = document.createElement('span');
    spanIdEstado.textContent = `#${id} ${estado}`;
    
    const spanFecha = document.createElement('span');
    spanFecha.textContent = fecha;
    
    header.appendChild(spanIdEstado);
    header.appendChild(spanFecha);
    
    const header2 = document.createElement('div');
    header2.className = 'tarjeta-header';
    
    const spanUser = document.createElement('span');
    spanUser.textContent = `[${user.id}] ${user.firstname} ${user.lastname} (${user.email})`;

    header2.appendChild(spanUser);

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
    tarjeta.appendChild(header2);
    tarjeta.appendChild(tabla);

    return tarjeta;
}

function tarjetaProductoEditar(id, nombre, descr, precio, stock, imagen) {
    const imgsPath = "../imgs/products/";
    const tarjeta = document.createElement("article");
    tarjeta.id = "producto-" + id;
    tarjeta.className = "card";
    tarjeta.style = "width: 30%;";

    const media = document.createElement("div");
    media.className = "card-media";
    //media.innerHTML = `<img src="${imgsPath + imagen}" alt="imagen producto" class="imagen">`;
    media.innerHTML = `<input accept="image/*" type="file" class="imagen"/>`;

    const body = document.createElement("div");
    body.className = "card-body";

    /*const titulo = document.createElement("h3");
    titulo.textContent = nombre+ `(ID:${id})`;
    titulo.style = "color: gray;";*/
    const titulo = document.createElement("input");
    titulo.type = "text";
    titulo.value = nombre;
    titulo.className = "title";

    /*const desc = document.createElement("p");
    desc.textContent = descr;*/
    const desc = document.createElement("input");
    desc.type = "text";
    desc.value = descr;
    desc.className = "desc";
    
    const footer = document.createElement("div");
    footer.className = "card-footer";
    
    /*const price = document.createElement("div");
    price.className = "price";
    price.textContent = `PRECIO: $${precio}`;*/
    const price = document.createElement("input");
    price.type = "text";
    price.value = precio;
    
    /*const stockd = document.createElement("div");
    stockd.className = "stock";
    stockd.textContent = `STOCK: ${stock}`;*/
    const stockd = document.createElement("input");
    stockd.type = "text";
    stockd.value = stock;
    
    footer.appendChild(price);
    footer.appendChild(stockd);

    body.appendChild(titulo);
    body.appendChild(desc);
    body.appendChild(footer);

    tarjeta.appendChild(media);
    tarjeta.appendChild(body);

    return tarjeta;
}