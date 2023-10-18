const productos = [
    {id:1, nombre:"Buzo Negro", precio:16000},
    {id:2, nombre:"Buzo Marron", precio:16000},
    {id:3, nombre:"Buzo Gris", precio:13000},
    {id:4, nombre:"Buzo Violeta", precio:16000},
    {id:5, nombre:"Remera Negra", precio:11000},
    {id:6, nombre:"Remera Violeta", precio:10000},
    {id:7, nombre:"Remera Azul", precio:11000},
    {id:8, nombre:"Remera Gris", precio:9000},
    {id:9, nombre:"Pantalon Negro", precio:25000},
    {id:10, nombre:"Pantalon Gris", precio:23000},
    {id:11, nombre:"Pantalon Azul", precio:22000},
    {id:12, nombre:"Pantalon Verde", precio:25000},
    {id:13, nombre:"Zapatillas Nike", precio:80000},
    {id:14, nombre:"Zapatillas Adidas", precio:75000},
    {id:15, nombre:"Zapatillas Puma", precio:60000},
    {id:16, nombre:"Zapatillas New Balance", precio:65000}, 
];

function calcularCostoProducto(cant, precio) {
    return cant * precio;
}

function mostrarMenu(productosFiltrados) {
    productosFiltrados.forEach((producto, i) => {
      console.log(`${i + 1}-${producto.nombre} $${producto.precio}`);
    });
  }
  
  function comprarProductos() {
    let total = 0;
    while (true) {
      const precioMaximo = Number(prompt("Ingrese el precio máximo que desea filtrar o 0 para ver todos los productos:"));
      const productosFiltrados = precioMaximo > 0 ? productos.filter((producto) => producto.precio <= precioMaximo) : productos;
      productosFiltrados.forEach((producto) => {
        alert(`
        id: ${producto.id}
        nombre: ${producto.nombre}
        precio: ${producto.precio}
        `)
      })
      if (productosFiltrados.length === 0) {
        alert("No hay productos que cumplan con el filtro.");
        continue;
      }
      mostrarMenu(productosFiltrados);
      const seleccionarProductos = Number(prompt(`Ingrese la opción del producto que desea llevar de los productos filtrados:`));
      if (seleccionarProductos === 0) {
        break;
      } else if (seleccionarProductos >= 1 && seleccionarProductos <= productosFiltrados.length) {
        const productoSeleccionado = productosFiltrados[seleccionarProductos - 1];
        const seleccionarCantidad = Number(prompt(`Indique la cantidad de ${productoSeleccionado.nombre} que desea:`));
        total += calcularCostoProducto(seleccionarCantidad, productoSeleccionado.precio);
      } else {
        alert("Opción inválida. Por favor, seleccione una opción válida o 0 para salir.");
      }
    }
    return total;
}
  
  const totalCompra = comprarProductos();
  console.log("El total de la compra es de: $" + totalCompra);
  
  function calcularEnvio(total) {
    if (total >= 50000) {
      alert("El envío es gratuito.");
      return 0;
    } else {
      alert("El costo de envío es de $3000.");
      return 3000;
    }
  }
  
  const costoEnvio = calcularEnvio(totalCompra);
  console.log("El costo de envío es de $" + costoEnvio);
  
  function metodoDePago(total) {
    const metodo = prompt("Ingrese el método de pago: tarjeta o efectivo");
  
    if (metodo === "tarjeta") {
      total *= 1.1;
      alert("Su total es de: $" + total);
    } else if (metodo === "efectivo") {
      total -= 2000;
      alert("Tiene un descuento de $2000, el total es de: $" + total);
    }
  }

  metodoDePago(totalCompra + costoEnvio);



