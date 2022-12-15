var usuario; 
var carritoUsuarioAuxiliar;
let carritoUsuario;
var URL_HOST = "https://9f0f-2806-2f0-7080-c9c8-c1b4-9c34-e39b-24ff.ngrok.io/";
// var URL_HOST = "http://localhost:4000/"

function validarUsuario() {

    let miURL = document.location.href;
    
    if(miURL.indexOf('?') > 0) {
        
        let valorUser = miURL.split('?')[1];

        let idUsuario = valorUser.split('=')[1];

        usuario =  JSON.parse(localStorage.getItem(idUsuario));

        if (!usuario) {
            window.open('../index.html','_self');
        }else if(usuario.tipo === "Cliente"){
            let mostrarMensaje = document.getElementById("nombreCompleto");
                mostrarMensaje.innerHTML = usuario.nombreCompleto;

            var urlCarritoCompras = document.getElementById("productos");
            urlCarritoCompras.href = "productos.html?idUsuario="+idUsuario;
        }
    }else{
        window.open('../index.html','_self');
    }
}
validarUsuario();

function cerrarSesion(){
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open('../index.html','_self');
    }, 1000);
}

function cargarProductos() {

    var request = new XMLHttpRequest();

    request.open('GET', URL_HOST+"obtenerCarrito/" + usuario.idUsuario, true);

    request.onload = function(){
        if (request.status >= 200 && request.status < 300) {
            let carrito = JSON.parse(this.response);
            
            carritoUsuarioAuxiliar = carrito;
            carritoUsuario = JSON.parse( JSON.stringify(carrito));

            cargarTablaProductos(carrito)

                   
        }
        let totalCantidadProducto = document.getElementById("totalCantidadProducto");
        totalCantidadProducto.innerHTML = calcularTotales(2);
        let totalPrecioProducto = document.getElementById("totalCantidadPrecio");
        totalPrecioProducto.innerHTML = "$" + calcularTotales(4);
        
    }
    request.send();
}
cargarProductos();

function cargarTablaProductos(carritoEntrada) {
    let tbodyRef = document.getElementById('tablaCarrito').getElementsByTagName('tbody')[0];
            
            tbodyRef.innerHTML= "";

            let contador = 0;

            for (var key in carritoEntrada) {

                if(carritoEntrada.hasOwnProperty(key)){

                    let nuevaFila = tbodyRef.insertRow();

                    ++contador;

                    let cellNumeroProducto = nuevaFila.insertCell();
                    let numeroProducto = document.createTextNode(contador);
                    cellNumeroProducto.appendChild(numeroProducto);
                    
                    let cellNombre = nuevaFila.insertCell();
                    let nombre = document.createTextNode(carritoEntrada[key].nombre);
                    cellNombre.appendChild(nombre);

                    let cellCantidad = nuevaFila.insertCell();
                    let txtCantidad = document.createElement("input");
                    txtCantidad.setAttribute("type","number");
                    txtCantidad.setAttribute("id","idProducto"+carritoEntrada[key].idCarrito);
                    txtCantidad.setAttribute("class","form-control form-control-sm");
                    txtCantidad.setAttribute("style","width:100px");
                    txtCantidad.setAttribute("step",1);
                    txtCantidad.setAttribute("value",carritoEntrada[key].cantidad);
                    txtCantidad.setAttribute("onchange","actualizarTotalProducto(this)");
                    cellCantidad.appendChild(txtCantidad);

                    let cellPrecio = nuevaFila.insertCell();
                    let precio = document.createTextNode("$" + carritoEntrada[key].precio);
                    cellPrecio.appendChild(precio);
                    
                    calcularPrecioProducto(carritoEntrada[key].cantidad, carritoEntrada[key].precio)

                    let cellTotal = nuevaFila.insertCell();
                    let total = document.createTextNode("$" + calcularPrecioProducto(carritoEntrada[key].cantidad, carritoEntrada[key].precio));
                    cellTotal.appendChild(total);

                    let cellEliminar = nuevaFila.insertCell();
                    let btnEliminar = document.createElement("button");
                    btnEliminar.setAttribute("type","button");
                    btnEliminar.setAttribute("class","btn btn-danger btn-sm");
                    btnEliminar.setAttribute("value",carritoEntrada[key].idCarrito);
                    btnEliminar.setAttribute("onclick","eliminarProducto(this.value)");
                    btnEliminar.innerText = "Eliminar";
                    cellEliminar.appendChild(btnEliminar);

                }
            }
}

function eliminarProducto(idCarrito) {

    document.getElementById("confirmacionBody").innerHTML = 'Esta apunto de eliminar un producto del  carrito. <br>' +
                                                            '<strong> ¿Esta seguro de eliminarlo?</strong>';
    document.getElementById("btnEliminarProducto").innerHTML = 'Eliminar';

    var btnSolicitarConfirmacion = document.getElementById("btnSolicitarConfirmacion");
    btnSolicitarConfirmacion.click();
    
    var btnEliminarProducto = document.getElementById("btnEliminarProducto");

    btnEliminarProducto.addEventListener("click", function () {

    var request = new XMLHttpRequest();

    request.open('DELETE', URL_HOST+"eliminarCarrito/"+idCarrito, true);

    request.onload = function(){
        if (request.status >= 200 && request.status < 300) {
            
            let mostrarMensaje = document.getElementById("mostrarMensaje");

            if(this.response == 1){
                
                mostrarMensaje.innerHTML =  '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                                                '<strong id="mensajeAlerta"> Se elimino el Producto </strong>' +
                                                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                                            '</div>';
                cargarProductos()

            }else{
                mostrarMensaje.innerHTML =  '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                                                '<strong id="mensajeAlerta"> No se pudo eliminar el producto </strong>' +
                                                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                                            '</div>';
            }
        }
    }

        request.send();
        var btnCerrarModalConfirmacion = document.getElementById("btnCerrarModalConfirmacion");
        btnCerrarModalConfirmacion.click();
    });
}

function actualizarTotalProducto(input) {

    var productoModificado = carritoUsuario.filter(producto => producto.idCarrito == input.id.slice(10));

    var actualCantidadSolicitada = productoModificado[0].cantidad;
    var nuevaCantidadsolicitada = input.value;

    if (actualCantidadSolicitada > nuevaCantidadsolicitada) {
        // Restar a carrito y aunmentar a producto
        var cantidad = actualCantidadSolicitada - nuevaCantidadsolicitada;
        var datos = {
            "idCarrito":productoModificado[0].idCarrito,
            "idProducto": productoModificado[0].idProducto,
            "sumarCarrito": false,
            "cantidad": cantidad,
            "cantidadActual": productoModificado[0].cantidad,
            "total": (productoModificado[0].precio * nuevaCantidadsolicitada)
        }
        actualizarCarritoProducto(datos);

    }else if (actualCantidadSolicitada < nuevaCantidadsolicitada) {
        // Sumar a carrito y restar a producto
        var cantidad = nuevaCantidadsolicitada - actualCantidadSolicitada;
        var datos = {
            "idCarrito":productoModificado[0].idCarrito,
            "idProducto": productoModificado[0].idProducto,
            "sumarCarrito": true,
            "cantidad": cantidad,
            "cantidadActual": productoModificado[0].cantidad,
            "total": (productoModificado[0].precio * nuevaCantidadsolicitada)
        }
        actualizarCarritoProducto(datos);
    }
}

function actualizarCarritoProducto(datos) {

    var request = new XMLHttpRequest();

    request.open('PUT', URL_HOST+'carrito/producto/actualizar', true);

    request.setRequestHeader('Content-Type', 'application/json');

    let mostrarMensaje = document.getElementById("mostrarMensaje");
    let btnRealizarPago = document.getElementById("realizarPago");

    request.onload = function(){

        if(this.response == 1){
            btnRealizarPago.disabled = false;
            cargarProductos();
        }else if(this.response > 1){
            mostrarMensaje.innerHTML =  `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                            <strong id="mensajeAlerta"> La cantidad es mayor a la disponible. La maxima cantidad de compra es de ${parseInt(datos.cantidadActual) + parseInt(this.response)} articulos en esa linea de compra</strong>
                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>`;
            btnRealizarPago.disabled = true;
        }else{
            mostrarMensaje.innerHTML =  `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                            <strong id="mensajeAlerta"> Ocurrio algun error.Favor de eliminar y volver a cargar el producto </strong>
                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>`;
            btnRealizarPago.disabled = true;
        }
    }
    request.send(JSON.stringify(datos));
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
            }else{
                total += parseFloat(document.getElementById('tablaCarrito').getElementsByTagName('tbody')[0].getElementsByTagName("tr")[index].getElementsByTagName("td")[numeroColumna].firstChild.nodeValue.slice(1));
            }
        }
    return total;
}

function cerrarSesion(){
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open('../index.html','_self');
    }, 1000);
}

function seguirComprando() {
    window.open('./productos.html?idUsuario='+ usuario.idUsuario ,'_self');
}