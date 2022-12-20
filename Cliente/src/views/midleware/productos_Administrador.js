const URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0"
var token;

var listaProductos = "";
var listaProductosAuxiliar = "";

// ?
var urlParametro = window.location.search;
var parametro = new URLSearchParams(urlParametro);
var usuario;
// ?

// ! Validación de usuario para regresar al login si no esta logeado
function validarUsuario() {
    let miURL = document.location.href;

    if (miURL.indexOf("?") > 0) {
        let valorUser = miURL.split("?")[1];

        let idUsuario = valorUser.split("=")[1];

        usuario = JSON.parse(localStorage.getItem(idUsuario));

        token = usuario.token;
        console.log(usuario.tipo)
        if (!usuario) {
            window.open("../index.html", "_self");
        } else if (usuario.tipo === 'Administrador') {

            let mostrarMensaje = document.getElementById("nombreCompleto");
            mostrarMensaje.value = usuario.nombre;

            var urlEmpleados = document.getElementById("gestionarEmpleados");
            urlEmpleados.href =
                "../vista_administrador/listaEmpleados.html?idUsuario=" +
                usuario.idUsuario;

            var urlProductos = document.getElementById("gestionarProductos");
            urlProductos.href =
                "../vista_administrador/productos.html?idUsuario=" + idUsuario;
        }
    } else {
        window.open("../index.html", "_self");
    }
}
validarUsuario();

function cerrarSesion() {
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open('../index.html', '_self');
    }, 1000);
}

/////////////////////////////////////METODOS SOLO PARA PRODUCTOS////////////////////////////////////////
function cargarProductos() {

    var request = new XMLHttpRequest();

    request.open('GET', URL_HOST + "/productos", true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.setRequestHeader("x-access-token", token);

    request.onload = function() {
        if (request.status >= 200 && request.status < 300) {
            var productos = JSON.parse(this.response);
            listaProductos = productos.resultado;
            console.log(listaProductos);
            cargarTablaProductos(listaProductos);
        }
    }
    request.send();
}
cargarProductos();

function cargarTablaProductos(productosLista) {
    let tbodyRef = document.getElementById('tablaProductos').getElementsByTagName('tbody')[0];

    tbodyRef.innerHTML = "";

    for (var key in productosLista) {

        if (productosLista.hasOwnProperty(key)) {

            let nuevaFila = tbodyRef.insertRow();

            let cellImg = nuevaFila.insertCell();
            let cellIdProducto = nuevaFila.insertCell();
            let cellNombre = nuevaFila.insertCell();
            let cellPrecioVenta = nuevaFila.insertCell();
            let cellPrecioCompra = nuevaFila.insertCell();
            let cellIdCategoria = nuevaFila.insertCell();
            let cellDescripcion = nuevaFila.insertCell();
            let cellModificar = nuevaFila.insertCell();

            let idProducto = document.createTextNode(productosLista[key].codigoBarras);
            let nombre = document.createTextNode(productosLista[key].nombreProducto);
            let precioVenta = document.createTextNode("$" + productosLista[key].precioVenta);
            let precioCompra = document.createTextNode("$" + productosLista[key].precioCompra);
            let idCategoria = document.createTextNode(productosLista[key].idCatagoria);
            let descripcion = document.createTextNode(productosLista[key].descripcion);

            let btnModificar = document.createElement("button");

            btnModificar.setAttribute("type", "button");
            btnModificar.setAttribute("class", "btn btn-warning btn-sm");
            btnModificar.setAttribute("value", productosLista[key].codigoBarras);
            btnModificar.setAttribute("onclick", "modificarProducto(this.value)");
            btnModificar.innerText = "Modificar";

            cellIdProducto.appendChild(idProducto);
            cellNombre.appendChild(nombre);
            cellPrecioVenta.appendChild(precioVenta);
            cellPrecioCompra.appendChild(precioCompra);
            cellIdCategoria.appendChild(idCategoria);
            cellDescripcion.appendChild(descripcion);
            cellModificar.appendChild(btnModificar);

            /*if (productosLista[key].archivo) {
                let inputImg = document.createElement("img");
                inputImg.setAttribute("style", "width: 80px;");
                inputImg.setAttribute("alt", "imgproducto");
                inputImg.setAttribute("src", URL_HOST + "/img/products/" + productosLista[key].archivo);

                let contenedorIMG = document.createElement("div");
                contenedorIMG.setAttribute("class", "text-center");

                contenedorIMG.appendChild(inputImg);

                cellImg.appendChild(contenedorIMG);
            }*/
        }
    }
}

function cargarComboCategoria() {

    var selectCategoria = document.getElementById("selectCategoria");

    var selectorCategorias = document.getElementById("selectorcategoria");

    var request = new XMLHttpRequest();
    console.log(token);
    request.open('GET', URL_HOST + "/categorias", true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.setRequestHeader("x-access-token", token);

    request.onload = function() {
        if (request.status >= 200 && request.status < 300) {
            var categorias = JSON.parse(this.response);
            var listaCategorias = categorias.resultado;

            selectorCategorias.options.add(new Option("Todos", -1));

            for (var key in listaCategorias) {

                if (categorias.hasOwnProperty(key)) {

                    var opcionCategoria = new Option(listaCategorias[key].nombreCategoria, listaCategorias[key].idCategoria);
                    selectCategoria.options.add(opcionCategoria);
                    var opcionCategoriaDos = new Option(listaCategorias[key].nombreCategoria, listaCategorias[key].idCategoria);
                    selectorCategorias.options.add(opcionCategoriaDos);
                }
            }
            selectorCategorias.value = -1;
        }
    }
    request.send();
}
cargarComboCategoria();

function registrarProducto() {

    let formularioEditarProducto = document.forms.formularioRegistrarProducto;

    let imageProductoVista = formularioEditarProducto.txtImagenProducto.files[0];
    let txtCodigoBarras = formularioEditarProducto.txtCodigoBarras.value;
    let txtProducto = formularioEditarProducto.txtProducto.value;
    let txtDescripcion = formularioEditarProducto.txtDescripcion.value;
    let txtPrecioVenta = formularioEditarProducto.txtPrecioVenta.value;
    let txtPrecioCompra = formularioEditarProducto.txtPrecioCompra.value;
    let selectCategoria = formularioEditarProducto.selectCategoria.value;

    var producto = new FormData();

    producto.append("codigoBarras", txtCodigoBarras);
    producto.append("descripcion", txtDescripcion);
    producto.append("ciudad", "Xalapa");
    producto.append("estatus", 1);
    producto.append("precioVenta", txtPrecioVenta);
    producto.append("precioCompra", txtPrecioCompra);
    producto.append("idCategoria", selectCategoria);
    producto.append("nombreProducto", txtProducto);
    producto.append("imagen", imageProductoVista);

    var request = new XMLHttpRequest();

    request.open('POST', URL_HOST + "/productos", true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 300) {

            let mostrarMensaje = document.getElementById("mostrarMensaje");

            if (this.response == 1) {

                mostrarMensaje.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                    '<strong id="mensajeAlerta"> Se registro el Producto</strong>' +
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                    '</div>';
                resetearModal();
                cargarProductos();
                let botonClic = document.getElementById("btnCancelar");
                botonClic.click();

            } else {
                mostrarMensaje.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                    '<strong id="mensajeAlerta"> No se pudo registrar el producto</strong>' +
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                    '</div>';
            }
        }
    }

    request.send(producto);
    return false;
}

function modificarProducto(idProducto) {

    let btnModificarProducto = document.getElementById("btnRegistrarNuevoProducto");
    btnModificarProducto.click();

    let txtTituloModal = document.getElementById("txtTituloModal");
    txtTituloModal.innerHTML = "Modificar Producto";


    let btnRegistra = document.getElementById("btnRegistraProducto");
    btnRegistra.setAttribute("class", "btn btn-primary visually-hidden");
    let btnModificar = document.getElementById("btnModificarProducto");
    btnModificar.setAttribute("class", "btn btn-primary");

    let formularioIniciarSesion = document.forms.formularioRegistrarProducto;

    for (var key in listaProductos) {

        if (listaProductos.hasOwnProperty(key)) {

            if (listaProductos[key].codigoBarras == codigoBarras) {

                /*if (listaProductos[key].archivo) {
                    const imageProductoVista = document.getElementById("imageProductoVista");
                    imageProductoVista.setAttribute("class", "img-fluid");

                    imageProductoVista.src = URL_HOST + "/img/products/" + listaProductos[key].archivo;
                }*/

                formularioIniciarSesion.txtCodigoBarras.value = listaProductos[key].codigoBarras;
                formularioIniciarSesion.txtProducto.value = listaProductos[key].nombreProducto;
                formularioIniciarSesion.txtDescripcion = listaProductos[key].descripcion;
                formularioIniciarSesion.txtPrecioVenta.value = listaProductos[key].precioVenta;
                formularioIniciarSesion.txtPrecioCompra.value = listaProductos[key].precioCompra;
                formularioIniciarSesion.selectCategoria.value = listaProductos[key].idCategoria;

                

                return;
            }
        }
    }
}

function guardarProductoModificado() {

    document.getElementById("confirmacionBody").innerHTML = 'Esta apunto de modificar un producto de la lista. <br>' +
        '<strong> ¿Esta seguro de modificarlo?</strong>';
    document.getElementById("btnEliminarProducto").innerHTML = 'Modificar';

    var btnSolicitarConfirmacion = document.querySelector("#btnSolicitarConfirmacion");
    btnSolicitarConfirmacion.click();

    var contador = 0;

    var btnEliminarProducto = document.getElementById("btnEliminarProducto");

    btnEliminarProducto.addEventListener("click", function() {

        if (contador == 0) {

            let formularioIniciarSesion = document.forms.formularioRegistrarProducto;

            let imageProductoVista = formularioIniciarSesion.txtImagenProducto.files[0];
            let txtCodigoBarras = formularioIniciarSesion.txtCodigoBarras.value;
            let txtProducto = formularioIniciarSesion.txtProducto.value;
            let txtDescripcion = formularioIniciarSesion.txtDescripcion.value;
            let txtPrecioVenta = formularioIniciarSesion.txtPrecioVenta.value;
            let txtPrecioCompra = formularioIniciarSesion.txtPrecioCompra.value;
            let selectCategoria = formularioIniciarSesion.selectCategoria.value;

            var producto = new FormData();

            producto.append("codigoBarras", txtCodigoBarras);
            producto.append("descripcion", txtDescripcion);
            producto.append("ciudad", "Xalapa");
            producto.append("estatus", 1);
            producto.append("precioVenta", txtPrecioVenta);
            producto.append("precioCompra", txtPrecioCompra);
            producto.append("idCategoria", selectCategoria);
            producto.append("nombreProducto", txtProducto);
            producto.append("imagen", imageProductoVista);

            var request = new XMLHttpRequest();

            request.open('PUT', URL_HOST + "/productos/:" + codigoBarras, true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 300) {

                    let mostrarMensaje = document.getElementById("mostrarMensaje");

                    if (this.response == 1) {


                        mostrarMensaje.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                            '<strong id="mensajeAlerta"> Se modificó el Producto</strong>' +
                            '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                            '</div>';

                        resetearModal();
                        cargarProductos();

                    } else {
                        mostrarMensaje.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                            '<strong id="mensajeAlerta"> No se pudo modificar el producto</strong>' +
                            '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                            '</div>';
                    }
                }

            }
            request.send(producto);

            var btnCerrarModalConfirmacion = document.getElementById("btnCerrarModalConfirmacion");
            btnCerrarModalConfirmacion.click();

            var btnCancelar = document.getElementById("btnCancelar");
            btnCancelar.click();
        }
        ++contador;
    });
}

function resetearModal() {
    let txtTituloModal = document.getElementById("txtTituloModal");
    txtTituloModal.innerHTML = "Registrar Producto";

    let btnRegistra = document.getElementById("btnRegistraProducto");
    btnRegistra.setAttribute("class", "btn btn-primary");

    let btnModificar = document.getElementById("btnModificarProducto");
    btnModificar.setAttribute("class", "btn btn-primary visually-hidden");

    let formularioRegistrarProducto = document.forms.formularioRegistrarProducto;
    formularioRegistrarProducto.reset();

    const imageProductoVista = document.getElementById("imageProductoVista");

    imageProductoVista.setAttribute("class", "visually-hidden");
}

function visualizarImagen() {

    const txtImagenProducto = document.getElementById("txtImagenProducto");
    const imageProductoVista = document.getElementById("imageProductoVista");

    imageProductoVista.setAttribute("class", "img-fluid");

    if (txtImagenProducto.files != 0) {

        const tipoImagen = [
            "image/apng",
            "image/bmp",
            "image/gif",
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/svg+xml",
            "image/tiff",
            "image/webp",
            "image/x-icon"
        ];

        for (const imagen of txtImagenProducto.files) {

            if (tipoImagen.includes(imagen.type)) {
                imageProductoVista.src = URL.createObjectURL(imagen);
            }
        }
    }

}

function mostrarProductoCategoria(idCategoria) {
    listaProductosAuxiliar = JSON.parse(JSON.stringify(listaProductos));

    if (idCategoria == -1) {
        cargarTablaProductos(listaProductos)
        listaProductosAuxiliar = "";
    } else {

        listaProductosAuxiliar = listaProductosAuxiliar.filter(producto => producto.idCategoria == idCategoria)

        cargarTablaProductos(listaProductosAuxiliar)
    }

}

function ordenarPorPrecio(valor) {

    if (listaProductosAuxiliar.length == 0) {

        if (parseInt(valor)) {
            listaProductos.sort(function(a, b) {
                return b.precio - a.precio;
            });
        } else {
            listaProductos.sort(function(a, b) {
                return a.precio - b.precio;
            });
        }
        listaProductosAuxiliar = "";
        cargarTablaProductos(listaProductos);

    } else {
        if (parseInt(valor)) {
            listaProductosAuxiliar.sort(function(a, b) {
                return b.precio - a.precio;
            });
        } else if (!parseInt(valor)) {
            listaProductosAuxiliar.sort(function(a, b) {
                return a.precio - b.precio;
            });
        }
        cargarTablaProductos(listaProductosAuxiliar);

    }
}

function buscarProducto() {

    var txtBuscarProducto = document.getElementById("txtBuscarProducto");

    var resultadosProductos;

    if (txtBuscarProducto.value.length != 0) {

        if (listaProductosAuxiliar.length == 0) {
            listaProductosAuxiliar = "";
            resultadosProductos = listaProductos.filter(producto => producto.nombreProducto.toLowerCase().includes(txtBuscarProducto.value.toLowerCase()) ||
                producto.precioCompra.toString().includes(txtBuscarProducto.value) ||
                producto.idCatagoria.toLowerCase().includes(txtBuscarProducto.value.toLowerCase()));

        } else {
            resultadosProductos = listaProductosAuxiliar.filter(producto => producto.nombreProducto.toLowerCase().includes(txtBuscarProducto.value.toLowerCase()) ||
                producto.precioCompra.toString().includes(txtBuscarProducto.value) ||
                producto.idCatagoria.toLowerCase().includes(txtBuscarProducto.value.toLowerCase()));
        }
        cargarTablaProductos(resultadosProductos);
    } else {
        if (listaProductosAuxiliar.length == 0) {
            cargarTablaProductos(listaProductos);
        } else {
            cargarTablaProductos(listaProductosAuxiliar);
        }
    }
}

function buscadorVacio() {

    var enterBuscador = document.getElementById("txtBuscarProducto");

    if (enterBuscador.value.length == 0) {
        buscarProducto();
    }
}

window.onload = function() {
    var enterBuscador = document.getElementById("txtBuscarProducto");

    enterBuscador.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            buscarProducto();
        }
    });
}