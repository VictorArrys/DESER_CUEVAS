const URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0"

var usuario;
var listaProductos = "";
var listaProductosFiltrados = "";

// ! Validación de usuario para regresar al login si no esta logeado
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
            urlCarritoCompras.href = "carritoCompras.html?idUsuario=" + usuario.idUsuario;

            var urlProductos = document.getElementById("productos");
            urlProductos.href = "productos.html?idUsuario=" + idUsuario;

            var urlConsultarCliente = document.getElementById("consultarCliente");
            urlConsultarCliente.href = "../vistaUsuario/consultarCliente.html?idUsuario=" + idUsuario;

            var urlConsultarDirecciones = document.getElementById("consultarDirecciones");
            urlConsultarDirecciones.href = "../vistaUsuario/consultarDirecciones.html?idUsuario=" + idUsuario;
            
            var urlRegistrarDireccion =document.getElementById("registrarDireccion");
            urlRegistrarDireccion.href =
              "../vistaUsuario/registrarDireccion.html?idUsuario=" + idUsuario;
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

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
            listaProductos = data.resultado;
            console.log(listaProductos)
            mostrarProductos(listaProductos);
            if (!listaProductos == "Sin registros") {
                mostrarProductos(listaProductos);
            }
        }
    };

    request.open("GET", URL_HOST + "/productos/sucursal/" + 1, true);
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("x-access-token", usuario.token);

    request.send();

}

function mostrarProductos(data) {

    for (var i = 0; i < data.length; i++) {
        console.log(data[i])
        var producto = data[i]
        var imagen = producto.archivo
        console.log(imagen)

        var card = `<div class="col">
                        <div class="card" style="min-height: 300px;">
                            <div class="text-center">
                                <img src="http://localhost:3001/api/abarrotes_cuevas/1.0/img/products/${imagen}" class="card-img-top " style="width:140px; margin-top: 10px; border-radius: 20px;" alt="imgProducto"></img>
                            </div>
                            <div class="card-body">
                                <h6 class="fw-bold">${producto.nombreProducto}</h6>
                                <h6> precioVenta: $${producto.precioVenta}</h6>
                            </div>
                            <div class="d-grid gap-2 mb-1 mx-1">
                                <button class="btn btn-primary btn-sm" onclick="verProducto(${producto.codigoBarras})">Ver producto</button>
                            </div>
                        </div>
                    </div`
        document.getElementById("contenedor-productos").innerHTML += card;
    }
}

function cargarCategorias() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
            console.log(data.resultadoInicio)
            mostrarCategorias(data.resultadoInicio);
        }
    };

    request.open("GET", URL_HOST + "/categorias/", true);
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("x-access-token", usuario.token);

    request.send();
}

function mostrarCategorias(data) {
    var selectorCategorias = document.getElementById("selectorcategoria");

    selectorCategorias.innerHTML += `<option value="-1" selected>Todos</option>`;

    for (var i = 0; i < data.length; i++) {
        var card = `<option value="${data[i].idCategoria}">${data[i].nombreCategoria}</option>`
        selectorCategorias.innerHTML += card;
    }

}

function verProducto(idProductoSeleccionado) {
    // para acceder al ID del usuario nada más con el localStorage accedes.

    window.open('producto.html?idUsuario=' + usuario.idUsuario + '&idProducto=' + idProductoSeleccionado, '_self');
}

function mostrarProductoCategoria(idCategoria) {
    listaProductosFiltrados = listaProductos;
    var contenedorProductos = document.getElementById("contenedor-productos");

    if (idCategoria == -1) {
        contenedorProductos.innerHTML = "";
        mostrarProductos(listaProductos);
        listaProductosFiltrados = "";
    } else {
        contenedorProductos.innerHTML = "";

        listaProductosFiltrados = listaProductosFiltrados.filter(producto => producto.idCatagoria == idCategoria)

        mostrarProductos(listaProductosFiltrados);
    }

}

function ordenarPorPrecio(valor) {

    var listaProductosCategorias = listaProductos;
    var contenedorProductos = document.getElementById("contenedor-productos");

    if (listaProductosFiltrados.length == 0) {

        if (parseInt(valor)) {
            listaProductosCategorias.sort(function(a, b) {
                return b.precioVenta - a.precioVenta;
            });
        } else {
            listaProductosCategorias.sort(function(a, b) {
                return a.precioVenta - b.precioVenta;
            });
        }
        contenedorProductos.innerHTML = "";
        mostrarProductos(listaProductosCategorias);

    } else {
        if (parseInt(valor)) {
            listaProductosFiltrados.sort(function(a, b) {
                return b.precioVenta - a.precioVenta;
            });
        } else if (!parseInt(valor)) {
            listaProductosFiltrados.sort(function(a, b) {
                return a.precioVenta - b.precioVenta;
            });
        }
        contenedorProductos.innerHTML = "";
        mostrarProductos(listaProductosFiltrados);

    }
}

function buscarProducto() {

    var txtBuscarProducto = document.getElementById("txtBuscarProducto");
    var contenedorProductos = document.getElementById("contenedor-productos");

    var resultadosProductos;

    if (txtBuscarProducto.value.length != 0) {
        if (listaProductosFiltrados.length == 0) {

            resultadosProductos = listaProductos.filter(producto => producto.nombreProducto.toLowerCase().includes(txtBuscarProducto.value.toLowerCase()) ||
                producto.precioVenta.toString().includes(txtBuscarProducto.value) ||
                producto.nombreCategoria.toLowerCase().includes(txtBuscarProducto.value.toLowerCase()));

        } else {
            resultadosProductos = listaProductosFiltrados.filter(producto => producto.nombre.toLowerCase().includes(txtBuscarProducto.value.toLowerCase()) ||
                producto.precioVenta.toString().includes(txtBuscarProducto.value) ||
                producto.nombreCategoria.toLowerCase().includes(txtBuscarProducto.value.toLowerCase()));
        }
        contenedorProductos.innerHTML = "";
        mostrarProductos(resultadosProductos);
    } else {
        contenedorProductos.innerHTML = "";
        mostrarProductos(listaProductos);
    }

}

function buscadorVacio() {

    var enterBuscador = document.getElementById("txtBuscarProducto");
    if (enterBuscador.value.length == 0) {
        cargarProductos();
        document.getElementById("selectorprecioVenta").value = -1;
        document.getElementById("selectorcategoria").value = -1;
    }
}


function cerrarSesion() {
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open('../index.html', '_self');
    }, 1000);
}

window.onload = function() {
    cargarProductos();
    cargarCategorias();

    var enterBuscador = document.getElementById("txtBuscarProducto");

    enterBuscador.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            buscarProducto();
        }
    });
}