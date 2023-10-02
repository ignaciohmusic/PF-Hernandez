alert("Ingrese la opcion del producto que desea llevar. Para salir ingrese: 0")
let seleccionarProductos = Number(prompt( "1-Buzo $25000 2-Remera $10000 3-Pantalon $25000 4-Zapatillas $60000 "))
let seleccionarCantidad;
let total = 0;


const cantidad = (cant, precio) => {
  return cant * precio
}


while (seleccionarProductos != 0) {
  switch (seleccionarProductos) {
    case 1:
      seleccionarCantidad= Number(prompt("el producto seleccionado es un buzo, indique la cantidad"))
            total += cantidad(seleccionarCantidad, 25000)
      break;
      case 2:
        seleccionarCantidad = Number(prompt("el producto seleccionado es una remera, indique la cantidad"))
        total += cantidad(seleccionarCantidad, 10000)
      break;
    case 3:
      seleccionarCantidad = Number(prompt("el producto seleccionado es un jean, indique la cantidad"))
      total += cantidad(seleccionarCantidad, 25000)
    break;
    case 4:
      seleccionarCantidad = Number(prompt("el producto seleccionado es un par de zapatillas, indique la cantidad"))
      total += cantidad(seleccionarCantidad, 60000)
    break;

    default:
      break;
  }
  seleccionarProductos = Number(prompt( "1-Buzo $25000 2-Remera $10000 3-Pantalon $25000 4-Zapatillas $60000  "))
}

alert("el total de la compra es de: " + total)


const envio = () => {
    if (total >= 50000) {
      alert("El envio es gratuito")
    }else{
      total += 3000
      alert("el costo de envio es de 3000, el total es: " + total)
    }
}


const metodoDePago = () => {
  let metodo = prompt("ingrese el metodo de pago, tarjeta o efectivo" )
  if (metodo == "tarjeta") {
    total *= 1.1
    alert("Su total es de:" + total)
  }else if ( metodo == "efectivo") {
    total -= 2000
    alert("tenes un descuento de 2000, el total es:" + total)
  }

  
}

metodoDePago()





