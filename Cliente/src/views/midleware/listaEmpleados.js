var URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0";
var token;
var cargos = { 1: "Administrador", 2: "Ejecutivo de ventas", 3: "Repartidor" };

var usuario;

// ! Validación de usuario para regresar al login si no esta logeado
function validarUsuario() {
    let miURL = document.location.href;

    if (miURL.indexOf("?") > 0) {
        let valorUser = miURL.split("?")[1];

        let idUsuario = valorUser.split("=")[1];

        usuario = JSON.parse(localStorage.getItem(idUsuario));

        token = usuario.token;

        if (!usuario) {
            window.open("../index.html", "_self");
        } else if (usuario.tipo === "Administrador") {
            let mostrarMensaje = document.getElementById("nombreCompleto");
            mostrarMensaje.innerHTML = usuario.nombre;

            var urlEmpleados = document.getElementById("empleados");
            urlEmpleados.href =
                "..views//vista_administrador/listaEmpleados.html?idUsuario=" +
                usuario.idUsuario;

            var urlProductos = document.getElementById("productos");
            urlProductos.href = "../vista_administrador/productos.html?idUsuario=" + idUsuario;
        }
    } else {
        window.open("../index.html", "_self");
    }
}
validarUsuario();

function cerrarSesion() {
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open("../index.html", "_self");
    }, 1000);
}

window.onload = function() {
    cargarEmpleados();
    console.log("informacion usuario: " + JSON.stringify(usuario));
};

function cargarEmpleados() {
    var request = new XMLHttpRequest();
    request.open("GET", URL_HOST + "/empleados", true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.setRequestHeader("x-access-token", token);

    let empleados;

    request.onload = function() {
        tbl_Empleados = document.getElementById("tbl_cuerpo");
        if (request.status >= 200 && request.status < 300) {
            empleados = JSON.parse(this.response);

            if (empleados.length === 0) {
                alert("No hay empleados registrados");
            } else {
                console.log(empleados.resultadoInicio);

                for (var key in empleados.resultadoInicio) {
                    var filaEmpleado = document.createElement("tr");
                    filaEmpleado.id = empleados.resultadoInicio[key].idUsuario;
                    filaEmpleado.onclick = function() {
                        localStorage.setItem("idUsuario", this.id);
                        window.open("./editarEmpleado.html?idUsuario=" + this.id, "_self");
                    };

                    var celdaNombre = document.createElement("td");
                    var celdaPrimerApellido = document.createElement("td");
                    var celdaSegundoApellido = document.createElement("td");
                    var celdaCargo = document.createElement("td");
                    var celdaSucursal = document.createElement("td");

                    celdaNombre.innerHTML = empleados.resultadoInicio[key].nombre;
                    celdaPrimerApellido.innerHTML =
                        empleados.resultadoInicio[key].primerApellido;
                    celdaSegundoApellido.innerHTML =
                        empleados.resultadoInicio[key].segundoApellido;
                    celdaCargo.innerHTML = cargos[empleados.resultadoInicio[key].idCargo];
                    celdaSucursal.innerHTML = empleados.resultadoInicio[key].idSucursal;

                    filaEmpleado.appendChild(celdaNombre);
                    filaEmpleado.appendChild(celdaPrimerApellido);
                    filaEmpleado.appendChild(celdaSegundoApellido);
                    filaEmpleado.appendChild(celdaCargo);
                    filaEmpleado.appendChild(celdaSucursal);

                    tbl_Empleados.appendChild(filaEmpleado);
                }
            }
        } else {
            alert("No se puede conectar al servidor...");
        }
    };

    request.send();

    return false;
}

function registrarEmpleado() {

    localStorage.setItem("idUsuario", usuario.idUsuario);
    localStorage.setItem(usuario.idUsuario, JSON.stringify(usuario));
    window.open(
        "./registrarEmpleado.html?idUsuario=" + usuario.idUsuario,
        "_self"
    );
}