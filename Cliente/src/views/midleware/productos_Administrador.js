const URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0"

var listaProductos = "";
var listaProductosAuxiliar = "";

// ?
var urlParametro = window.location.search;
var parametro = new URLSearchParams(urlParametro);
var idUsuario = parametro.get('idUsuario');
var usuario = "";
// ?

// ! Validación de usuario para regresar al login si no esta logeado
function validarUsuario() {

    usuario = JSON.parse(localStorage.getItem(idUsuario));

    if (!usuario) {
        window.open('../index.html', '_self');
    } else if (usuario.tipo === "Administrador") {

        let mostrarMensaje = document.getElementById("nombreCompleto");

        mostrarMensaje.innerHTML = usuario.nombre;

        var urlUsuarios = document.getElementById("gestionUsuarios");
        urlUsuarios.href = "../vista_administrador/productos.html?idUsuario=" + idUsuario;

    } else {
        window.open('../index.html', '_self');
    }
}
validarUsuario();

function cerrarSesion() {
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open('index.html', '_self');
    }, 1000);
}

/////////////////////////////////////METODOS SOLO PARA PRODUCTOS////////////////////////////////////////
function cargarProductos() {

    var request = new XMLHttpRequest();

    request.open('GET', URL_HOST + "productosCategorias", true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 300) {
            let productos = JSON.parse(this.response);
            listaProductos = productos;
            // listaProductosAuxiliar = JSON.parse( JSON.stringify(listaProductosAuxiliar));

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
            let cellPrecio = nuevaFila.insertCell();
            let cellCantidad = nuevaFila.insertCell();
            let cellIdCategoria = nuevaFila.insertCell();
            let cellEstatus = nuevaFila.insertCell();
            let cellModificar = nuevaFila.insertCell();
            let cellEliminar = nuevaFila.insertCell();

            let idProducto = document.createTextNode(productosLista[key].idProducto);
            let nombre = document.createTextNode(productosLista[key].nombre);
            let precio = document.createTextNode("$" + productosLista[key].precio);
            let cantidad = document.createTextNode(productosLista[key].cantidad);
            let idCategoria = document.createTextNode(productosLista[key].nombreCatego);
            let estatus = document.createTextNode(productosLista[key].estatus == 1 ? "Disponible" : "Agotado");

            let btnModificar = document.createElement("button");

            btnModificar.setAttribute("type", "button");
            btnModificar.setAttribute("class", "btn btn-warning btn-sm");
            btnModificar.setAttribute("value", productosLista[key].idProducto);
            btnModificar.setAttribute("onclick", "modificarProducto(this.value)");
            btnModificar.innerText = "Modificar";

            let btnEliminar = document.createElement("button");

            btnEliminar.setAttribute("type", "button");
            btnEliminar.setAttribute("class", "btn btn-danger btn-sm");
            btnEliminar.setAttribute("value", productosLista[key].idProducto);
            btnEliminar.setAttribute("onclick", "eliminarProducto(this.value)");
            btnEliminar.innerText = "Eliminar";

            cellIdProducto.appendChild(idProducto);
            cellNombre.appendChild(nombre);
            cellPrecio.appendChild(precio);
            cellCantidad.appendChild(cantidad);
            cellIdCategoria.appendChild(idCategoria);
            cellEstatus.appendChild(estatus);
            cellModificar.appendChild(btnModificar);
            cellEliminar.appendChild(btnEliminar);

            if (productosLista[key].ruta) {
                let inputImg = document.createElement("img");
                inputImg.setAttribute("style", "width: 80px;");
                inputImg.setAttribute("alt", "imgproducto");
                inputImg.setAttribute("src", URL_HOST + "imagenesProductos/" + productosLista[key].ruta);

                let contenedorIMG = document.createElement("div");
                contenedorIMG.setAttribute("class", "text-center");

                contenedorIMG.appendChild(inputImg);

                cellImg.appendChild(contenedorIMG);
            }
        }
    }
}

function cargarComboCategoria() {

    var selectCategoria = document.getElementById("selectCategoria");

    var selectorCategorias = document.getElementById("selectorcategoria");

    var request = new XMLHttpRequest();

    request.open('GET', URL_HOST + "categorias/obtenerCategorias", true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 300) {
            let categorias = JSON.parse(this.response);

            selectorCategorias.options.add(new Option("Todos", -1));

            for (var key in categorias) {

                if (categorias.hasOwnProperty(key)) {

                    var opcionCategoria = new Option(categorias[key].nombreCatego, categorias[key].idCatego);
                    selectCategoria.options.add(opcionCategoria);
                    var opcionCategoriaDos = new Option(categorias[key].nombreCatego, categorias[key].idCatego);
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

    let formularioIniciarSesion = document.forms.formularioRegistrarProducto;

    let imageProductoVista = formularioIniciarSesion.txtImagenProducto.files[0];
    let txtProducto = formularioIniciarSesion.txtProducto.value;
    let txtPrecio = formularioIniciarSesion.txtPrecio.value;
    let txtCantidad = formularioIniciarSesion.txtCantidad.value;
    let selectCategoria = formularioIniciarSesion.selectCategoria.value;

    var producto = new FormData();

    producto.append("nombre", txtProducto);
    producto.append("precio", txtPrecio);
    producto.append("cantidad", txtCantidad);
    producto.append("idCategoria", selectCategoria);
    producto.append("estatus", txtCantidad == "0" ? 0 : 1);
    producto.append("imagen", imageProductoVista);

    var request = new XMLHttpRequest();

    request.open('POST', URL_HOST + "registrar", true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 300) {

            let mostrarMensaje = document.getElementById("mosntrarMensaje");

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

function eliminarProducto(idProducto) {

    document.getElementById("confirmacionBody").innerHTML = 'Esta apunto de eliminar un producto de la lista. <br>' +
        '<strong> ¿Esta seguro de eliminarlo?</strong>';
    document.getElementById("btnEliminarProducto").innerHTML = 'Eliminar';

    var btnSolicitarConfirmacion = document.getElementById("btnSolicitarConfirmacion");
    btnSolicitarConfirmacion.click();

    var btnEliminarProducto = document.getElementById("btnEliminarProducto");

    var contador = 0;

    btnEliminarProducto.addEventListener("click", function() {

        if (contador == 0) {

            var request = new XMLHttpRequest();

            request.open('DELETE', URL_HOST + "eliminar/" + idProducto, true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 300) {

                    let mostrarMensaje = document.getElementById("mosntrarMensaje");

                    if (this.response == 1) {

                        mostrarMensaje.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                            '<strong id="mensajeAlerta"> Se elimino el Producto</strong>' +
                            '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                            '</div>';
                        cargarProductos();

                    } else {
                        mostrarMensaje.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                            '<strong id="mensajeAlerta"> No se pudo eliminar el producto</strong>' +
                            '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                            '</div>';
                    }
                }
            }

            request.send();

            var btnCerrarModalConfirmacion = document.getElementById("btnCerrarModalConfirmacion");
            btnCerrarModalConfirmacion.click();
        }
        ++contador;
    });



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

            if (listaProductos[key].idProducto == idProducto) {

                if (listaProductos[key].ruta) {
                    const imageProductoVista = document.getElementById("imageProductoVista");
                    imageProductoVista.setAttribute("class", "img-fluid");

                    imageProductoVista.src = URL_HOST + "imagenesProductos/" + listaProductos[key].ruta;
                }

                formularioIniciarSesion.txtIdProducto.value = listaProductos[key].idProducto;
                formularioIniciarSesion.txtProducto.value = listaProductos[key].nombre;
                formularioIniciarSesion.txtPrecio.value = listaProductos[key].precio;
                formularioIniciarSesion.txtCantidad.value = listaProductos[key].cantidad;
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

            let txtIdProducto = formularioIniciarSesion.txtIdProducto.value;
            let imageProductoVista = formularioIniciarSesion.txtImagenProducto.files[0];
            let txtProducto = formularioIniciarSesion.txtProducto.value;
            let txtPrecio = formularioIniciarSesion.txtPrecio.value;
            let txtCantidad = formularioIniciarSesion.txtCantidad.value;
            let selectCategoria = formularioIniciarSesion.selectCategoria.value;

            var producto = new FormData();

            producto.append("idProducto", txtIdProducto);
            producto.append("nombre", txtProducto);
            producto.append("precio", txtPrecio);
            producto.append("cantidad", txtCantidad);
            producto.append("idCategoria", selectCategoria);
            producto.append("estatus", txtCantidad == "0" ? 0 : 1);
            producto.append("imagen", imageProductoVista);

            var request = new XMLHttpRequest();

            request.open('PUT', URL_HOST + "actualizar", true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 300) {

                    let mostrarMensaje = document.getElementById("mosntrarMensaje");

                    if (this.response == 1) {


                        mostrarMensaje.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                            '<strong id="mensajeAlerta"> Se modifico el Producto</strong>' +
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

function ordenarPorCantidad(valor) {

    if (listaProductosAuxiliar.length == 0) {

        if (parseInt(valor)) {
            listaProductos.sort(function(a, b) {
                return b.cantidad - a.cantidad;
            });
        } else {
            listaProductos.sort(function(a, b) {
                return a.cantidad - b.cantidad;
            });
        }
        listaProductosAuxiliar = "";
        cargarTablaProductos(listaProductos);

    } else {
        if (parseInt(valor)) {
            listaProductosAuxiliar.sort(function(a, b) {
                return b.cantidad - a.cantidad;
            });
        } else if (!parseInt(valor)) {
            listaProductosAuxiliar.sort(function(a, b) {
                return a.cantidad - b.cantidad;
            });
        }
        cargarTablaProductos(listaProductosAuxiliar);

    }

}

function ordenarPorEstatus(valor) {

    if (listaProductosAuxiliar.length == 0) {

        if (parseInt(valor)) {
            listaProductos.sort(function(a, b) {
                return b.estatus - a.estatus;
            });
        } else {
            listaProductos.sort(function(a, b) {
                return a.estatus - b.estatus;
            });
        }
        listaProductosAuxiliar = "";
        cargarTablaProductos(listaProductos);

    } else {
        if (parseInt(valor)) {
            listaProductosAuxiliar.sort(function(a, b) {
                return b.estatus - a.estatus;
            });
        } else if (!parseInt(valor)) {
            listaProductosAuxiliar.sort(function(a, b) {
                return a.estatus - b.estatus;
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
            resultadosProductos = listaProductos.filter(producto => producto.nombre.toLowerCase().includes(txtBuscarProducto.value.toLowerCase()) ||
                producto.precio.toString().includes(txtBuscarProducto.value) ||
                producto.cantidad.toString().includes(txtBuscarProducto.value) ||
                producto.nombreCatego.toLowerCase().includes(txtBuscarProducto.value.toLowerCase()));

        } else {
            resultadosProductos = listaProductosAuxiliar.filter(producto => producto.nombre.toLowerCase().includes(txtBuscarProducto.value.toLowerCase()) ||
                producto.precio.toString().includes(txtBuscarProducto.value) ||
                producto.cantidad.toString().includes(txtBuscarProducto.value) ||
                producto.nombreCatego.toLowerCase().includes(txtBuscarProducto.value.toLowerCase()));
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

function cerrarSesion() {
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open('index.html', '_self');
    }, 1000);
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