let productos = [];

async function cargarListaProductos() {
      const response = await fetch("./js/lista-productos.json");
      const data = await response.json();
      productos = data;
      cargarProductos(productos);
}

cargarListaProductos();

const contenedorProductos = document.getElementById("contenedor-productos");
const botonFiltrarPrecio = document.getElementById("boton-filtrar-precio");
const precioFiltrar = document.getElementById("precio-filtrar");
const botonesMenu = document.querySelectorAll(".boton-menu");
const tituloPrincipal = document.getElementById("titulo-principal");
let botonesAgregarProducto = document.querySelectorAll(".agregar-producto");
const numero = document.getElementById("numero");



function cargarProductos(productosSeleccionados, precioMin, precioMax) {
  contenedorProductos.innerHTML = "";
  productosSeleccionados.forEach(producto => {
    if ((!precioMin || producto.precio >= precioMin) && (!precioMax || producto.precio <= precioMax)) {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="imagen-producto" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="detalles-productos">
            <h3 class="titulo-prducto">${producto.titulo}</h3>
            <p class="precio-producto">$${producto.precio}</p>
            <button class="agregar-producto" id="${producto.id}">Agregar al carrito</button>
        </div>
    `;
    contenedorProductos.append(div);
    }
  })
  actualizarBotonesAgregar(); 
}
cargarProductos(productos);

botonFiltrarPrecio.addEventListener("click", () => {
  const precioMax = parseInt(precioFiltrar.value);
  const precioMin = 0;
  const productosFiltrados = productos.filter(producto => producto.precio >= precioMin && producto.precio <= precioMax);
  cargarProductos(productosFiltrados, precioMin, precioMax);
});

botonesMenu.forEach(boton => {
  boton.addEventListener("click", (e) => {
    if (e.currentTarget.id != "TodosLosPruductos") {
      const categoriaProducto = productos.find(producto => producto.categoria.id === e.currentTarget.id);
      tituloPrincipal.innerText = categoriaProducto.categoria.nombre;
      const botonProductos = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
      cargarProductos(botonProductos);
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  })
})

function actualizarBotonesAgregar() {
  botonesAgregarProducto = document.querySelectorAll(".agregar-producto");
  botonesAgregarProducto.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosCarrito = [];
const productosCarritoLocalStorage = JSON.parse(localStorage.getItem("productos-carrito"));
if (productosCarritoLocalStorage) {
  productosCarrito = productosCarritoLocalStorage;
  actualizarNumero();
}

function agregarAlCarrito(e) {
  Toastify({
    text: "Producto agregado de forma correcta",
    duration: 2000,
    close: true,
    gravity: "bottom", 
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(0deg, rgba(47,138,198,0.6278886554621849) 0%, rgba(70,117,148,1) 82%)",
      borderRadius: ".5rem",
      textTransform: "uppercase",
      fontSize: ".75rem"
    },
    onClick: function(){}
  }).showToast();

  const idBoton = e.currentTarget.id;
  const agregadoDeProducto = productos.find(producto => producto.id === idBoton);

  if (productosCarrito.some(producto => producto.id === idBoton)) {
    const index = productosCarrito.findIndex(producto => producto.id === idBoton);
    productosCarrito[index].cantidad++;
  } else {
    agregadoDeProducto.cantidad = 1;
    productosCarrito.push(agregadoDeProducto);
  }

  actualizarNumero();

  localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
}

function actualizarNumero() {
  let numeroNuevo = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
  numero.innerText = numeroNuevo;
}

cargarProductos(productos);



