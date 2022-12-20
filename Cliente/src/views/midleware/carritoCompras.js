var usuario;
var carritoUsuarioAuxiliar;
let carritoUsuario;
const URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0"
var productos = []
var totalPrecioProducto

function validarUsuario() {

    let miURL = document.location.href;

    if (miURL.indexOf('?') > 0) {

        let valorUser = miURL.split('?')[1];

        let idUsuario = valorUser.split('=')[1];

        usuario = JSON.parse(localStorage.getItem(idUsuario));

        if (!usuario) {
            window.open('../index.html', '_self');
        } else if (usuario.tipo === "Cliente") {
            let mostrarMensaje = document.getElementById("nombreCompleto");
            mostrarMensaje.innerHTML = usuario.nombre;

            var urlCarritoCompras = document.getElementById("carritoCompras");
            urlCarritoCompras.href = "carritoCompras.html?idUsuario=" + idUsuario;

            var urlProductos = document.getElementById("productos");
            urlProductos.href = "productos.html?idUsuario=" + idUsuario;

            var urlConsultarCliente = document.getElementById("consultarCliente");
            urlConsultarCliente.href = "../vistaUsuario/consultarCliente.html?idUsuario=" + idUsuario;

        }
    } else {
        window.open('../index.html', '_self');
    }
}
validarUsuario();

function cerrarSesion() {
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open('../index.html', '_self');
    }, 1000);
}

function cargarProductos() {

    var request = new XMLHttpRequest();

    request.open('GET', URL_HOST + "/carritos/" + usuario.idUsuario, true);

    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("x-access-token", usuario.token);

    request.onload = function() {
        if (request.status >= 200 && request.status < 300) {
            let respuesta = JSON.parse(this.response);
            console.log(respuesta)
            let carrito = respuesta.productos

            carritoUsuarioAuxiliar = carrito;
            carritoUsuario = JSON.parse(JSON.stringify(carrito));

            cargarTablaProductos(carrito)
        }
        let totalCantidadProducto = document.getElementById("totalCantidadProducto");
        totalCantidadProducto.innerHTML = calcularTotales(2);
        totalPrecioProducto = document.getElementById("totalCantidadPrecio");
        totalPrecioProducto.innerHTML = "$" + calcularTotales(4);

    }
    request.send();
}
cargarProductos();

function cargarTablaProductos(carritoEntrada) {
    let tbodyRef = document.getElementById('tablaCarrito').getElementsByTagName('tbody')[0];

    tbodyRef.innerHTML = "";

    let contador = 0;

    for (var key in carritoEntrada) {

        if (carritoEntrada.hasOwnProperty(key)) {
            var productoCarrito = {
                codigoBarrasP: carritoEntrada[key].codigoBarras,
                idInventarioP: carritoEntrada[key].idInventario,
                cantidadPedidoP: carritoEntrada[key].cantidadProducto
            }

            productos.push(productoCarrito)

            let nuevaFila = tbodyRef.insertRow();

            ++contador;

            let cellNumeroProducto = nuevaFila.insertCell();
            let numeroProducto = document.createTextNode(contador);
            cellNumeroProducto.appendChild(numeroProducto);

            let cellNombre = nuevaFila.insertCell();
            let nombre = document.createTextNode(carritoEntrada[key].nombreProducto);
            cellNombre.appendChild(nombre);



            let cellCantidad = nuevaFila.insertCell();
            let cantidad = document.createTextNode("" + carritoEntrada[key].cantidadProducto);
            cellCantidad.appendChild(cantidad);

            let cellPrecio = nuevaFila.insertCell();
            let precio = document.createTextNode("$" + carritoEntrada[key].precioVenta);
            cellPrecio.appendChild(precio);

            calcularPrecioProducto(carritoEntrada[key].cantidadProducto, carritoEntrada[key].precioVenta)

            let cellTotal = nuevaFila.insertCell();
            let total = document.createTextNode("$" + calcularPrecioProducto(carritoEntrada[key].cantidadProducto, carritoEntrada[key].precioVenta));
            cellTotal.appendChild(total);

        }
    }
}


function comprarProductos() {

    document.getElementById("confirmacionBody").innerHTML = 'Comprara todos los productos del carrito <br>' +
        '<strong> ¿Comfirma que realizara la compra de los productos?</strong>';
    document.getElementById("btnConfirmarCompra").innerHTML = 'Comprar';


    var btnSolicitarConfirmacion = document.getElementById("btnSolicitarConfirmacion");
    btnSolicitarConfirmacion.click();

    console.log(productos)

    var btnConfirmarCompra = document.getElementById("btnConfirmarCompra");

    btnConfirmarCompra.addEventListener("click", function() {

        var request = new XMLHttpRequest();

        request.open('POST', URL_HOST + "/carritos/" + usuario.idUsuario, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 300) {

                let mostrarMensaje = document.getElementById("mostrarMensaje");

                if (this.response == 1) {

                    mostrarMensaje.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                        '<strong id="mensajeAlerta"> Se realizo la compra de los productos y guardo en pedidos </strong>' +
                        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                        '</div>';
                    cargarProductos()

                } else {
                    mostrarMensaje.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                        '<strong id="mensajeAlerta"> No se pudo completar la compra de los productos </strong>' +
                        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                        '</div>';
                }
            }
        }

        var metodoPago = document.getElementById("metodoPago");
        var direcciones = document.getElementById("metodoPago");
        var fechaPedido = new Date().toJSON().slice(0, 19).replace('T', ' ');

        let bodyPedido = JSON.stringify({
            metodoPagoP: metodoPago.value,
            estatusP: 0,
            fechaHoraP: fechaPedido,
            idDireccionP: direcciones.value,
            costoPedidoP: totalPrecioProducto,
            productos: productos
        })

        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader("x-access-token", usuario.token);
        console.log(bodyPedido)

        request.send(bodyPedido);
        var btnCerrarModalConfirmacion = document.getElementById("btnCerrarModalConfirmacion");
        btnCerrarModalConfirmacion.click();

    });
}

function calcularPrecioProducto(cantidadProducto, precioProducto) {
    return cantidadProducto * precioProducto;
}

function calcularTotales(numeroColumna) {

    let total = 0;

    let numeroFilas = document.getElementById('tablaCarrito').getElementsByTagName('tbody')[0].getElementsByTagName("tr").length;

    for (let index = 0; index < numeroFilas; index++) {
        if (numeroColumna == 2) {
            total += parseFloat(document.getElementById('tablaCarrito').getElementsByTagName('tbody')[0].getElementsByTagName("tr")[index].getElementsByTagName("td")[numeroColumna].firstChild.value);
        } else {
            total += parseFloat(document.getElementById('tablaCarrito').getElementsByTagName('tbody')[0].getElementsByTagName("tr")[index].getElementsByTagName("td")[numeroColumna].firstChild.nodeValue.slice(1));
        }
    }
    totalPrecioProducto = total
    return total;
}

function cargarDirecciones() {

    var request = new XMLHttpRequest();
    request.open("GET", URL_HOST + "/direcciones/" + usuario.idUsuario, true);

    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.setRequestHeader("x-access-token", usuario.token);

    let direcciones;

    request.onload = function() {
        slt_Direcciones = document.getElementById("direcciones");
        if (request.status >= 200 && request.status < 300) {
            var respuesta = JSON.parse(this.response);
            direcciones = respuesta.respuesta

            console.log(respuesta)


            if (direcciones.length === 0) {
                alert("No hay sucursales registradas");
            } else {
                for (var key in direcciones) {
                    var direccionCompleta =
                        direcciones[key].calle + " #" + direcciones[key].noExterior + ", " + direcciones[key].colonia +
                        ", " + direcciones[key].municipio + ", " + direcciones[key].entidadFederativa

                    var direccionOpcion = new Option(

                        direccionCompleta,
                        direcciones[key].idDireccion
                    );
                    slt_Direcciones.options.add(direccionOpcion);
                }
            }
        } else {
            alert("No se puede conectar al servidor...");
        }
    };

    request.send();

    return false;
}

window.onload = function() {
    cargarDirecciones();
};


function cerrarSesion() {
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open('../index.html', '_self');
    }, 1000);
}

function seguirComprando() {
    window.open('./productos.html?idUsuario=' + usuario.idUsuario, '_self');
}