const URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0"

// ?
var urlParametro = window.location.search;
var parametro = new URLSearchParams(urlParametro);
var idUsuario = parametro.get('idUsuario');
var idProducto = parametro.get('idProducto');
var usuario = "";
// ?


var productoConsultado = "";
var precioProducto = "";
var cantidadExistencia;

// ! Validación de usuario para regresar al login si no esta logeado
function validarUsuario() {

    usuario = JSON.parse(localStorage.getItem(idUsuario));

    if (!usuario) {
        window.open('../index.html', '_self');
    } else if (usuario.tipo === "Cliente") {

        let mostrarMensaje = document.getElementById("nombreCompleto");

        mostrarMensaje.innerHTML = usuario.nombre;

        var urlCarritoCompras = document.getElementById("carritoCompras");
        urlCarritoCompras.href = "carritoCompras.html?idUsuario=" + idUsuario;

        var urlCarritoCompras = document.getElementById("productos");
        urlCarritoCompras.href = "productos.html?idUsuario=" + idUsuario;

    } else {
        window.open('../index.html', '_self');
    }
}
validarUsuario();

// ! FIN de validación


// ! Cerrar sesión para borrar local storage y volver a login
function cerrarSesion() {
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open('../index.html', '_self');
    }, 1000);
}
// !

function cargarProducto() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var respuesta = JSON.parse(this.response);
            console.log(respuesta)
            productoConsultado = respuesta.resultado[0];
            precioProducto = productoConsultado.precioVenta;
            cantidadExistencia = productoConsultado.cantidad;
            mostrarProducto(productoConsultado);
        }
    };
    request.open("GET", URL_HOST + "/productos/sucursal/" + 1 + "/" + idProducto, true);
    request.setRequestHeader("Content-type", "application/json");

    request.setRequestHeader("x-access-token", usuario.token);
    request.send();
}

function mostrarProducto(productoConsultado) {
    console.log(productoConsultado)
    var imagen = productoConsultado.archivo
    document.getElementById("imgPrducto").src = "http://localhost:3001/api/abarrotes_cuevas/1.0/img/products/" + imagen;
    document.getElementById("tituloproducto").innerHTML = productoConsultado.nombreProducto;
    document.getElementById("costoproducto").innerHTML = "Precio: $" + productoConsultado.precioVenta;
    document.getElementById("categoria").innerHTML = productoConsultado.nombreCategoria;
    document.getElementById("mensajeArticulosDisponibles").innerHTML = productoConsultado.cantidad;


}

function añadirCarrito() {
    let cantidad = document.getElementById("txt_cantidad").value;
    try {
        if (cantidad) {
            if (cantidadExistencia > cantidad) {
                let agregarCarrito = {
                    "cantidad": cantidad,
                    "precio": precioProducto * cantidad
                }

                var request = new XMLHttpRequest();

                request.open('POST', URL_HOST + '/carritos/' + idUsuario + '/' + productoConsultado.idInventario, true);
                request.setRequestHeader('Content-Type', 'application/json');
                request.setRequestHeader("x-access-token", usuario.token);

                request.onload = function() {

                    if (this.readyState == 4 && this.status == 201) {
                        var respuestaRegistro = JSON.parse(this.response);
                        console.log(respuestaRegistro)

                        if (!listaProductos == "Sin registros") {
                            mostrarProductos(listaProductos);
                        }
                    }
                    if (this.response == 1) {
                        alert("Producto agregado exitosamente");

                    } else {
                        alert("No fue posible realizar el registro del producto al carrito");
                    }

                }
                request.send(JSON.stringify(agregarCarrito));
            } else {
                alert("Actualmente solo contamos con " + cantidadExistencia + " items para este producto");
            }

        } else {
            document.getElementById("txt_cantidad").style.borderColor = "red";
        }
    } catch (error) {
        alert("Ocurrió un error, intente más tarde o comuniquese con los profesionales")
    }

}

function cerrarSesion() {
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open('../index.html', '_self');
    }, 1000);
}

window.onload = function() {
    cargarProducto();
}