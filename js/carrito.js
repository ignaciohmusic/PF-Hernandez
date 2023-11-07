const productosCarrito = JSON.parse(localStorage.getItem("productos-carrito"));

const carritoVacio = document.getElementById("carrito-vacio");
const productosEnCarrito = document.getElementById("carrito-productos");
const accionesCarrito = document.getElementById("acciones-carrito");
const compraRealizada = document.getElementById("compra-realizada");

let eliminarCarrito = document.querySelectorAll(".eliminar-producto-carrito");

function cargarProductosCarrito() {
    if (productosCarrito && productosCarrito.length > 0) {
        carritoVacio.classList.add("disabled");
        productosEnCarrito.classList.remove("disabled");
        accionesCarrito.classList.remove("disabled");
        compraRealizada.classList.add("disabled");

        productosEnCarrito.innerHTML = "";

        productosCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto-carrito");
            div.innerHTML = `
                <div class="producto-carrito">
                    <img class="imagen-producto-carrito" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="titulo-producto-carrito">
                        <small>Titulo</small>
                        <h3>${producto.titulo}</h3>
                    </div>
                    <div class="cantidad-producto-carrito">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="precio-producto-carrito">
                        <small>Precio</small>
                        <p>$${producto.precio}</p>
                    </div>
                    <div class="subtotal-producto-carrito">
                        <small>Subtotal</small>
                        <p>$${producto.precio * producto.cantidad}</p>
                    </div>
                    <button class="eliminar-producto-carrito" id="${producto.id}"><i class="bi bi-trash"></i> Eliminar</button>
                </div> 
            `;
            productosEnCarrito.appendChild(div);
        });
    } else {
        carritoVacio.classList.remove("disabled");
        productosEnCarrito.classList.add("disabled");
        accionesCarrito.classList.add("disabled");
        compraRealizada.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    eliminarCarrito = document.querySelectorAll(".eliminar-producto-carrito");
    eliminarCarrito.forEach(boton => {
        boton.addEventListener("click", eliminarProductoCarrito);
    });
}

function eliminarProductoCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === idBoton);
    productosCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
}

function actualizarTotal() {
    const total = document.getElementById("total"); // Agregué la variable total
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    productosCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
    
    carritoVacio.classList.remove("disabled");
    productosEnCarrito.classList.add("disabled");
    accionesCarrito.classList.add("disabled");
    compraRealizada.classList.remove("disabled");
}