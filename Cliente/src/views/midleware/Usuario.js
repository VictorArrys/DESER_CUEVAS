var URL_HOST = "http://localhost:3000/api/abarrotes_cuevas/1.0"
var usuario;
var tokenCliente;

var urlParametro = window.location.search;
var parametro = new URLSearchParams(urlParametro);

var idUsuario = parametro.get('idUsuario');





// ! Validación de usuario para regresar al login si no esta logeado
function validarUsuario() {

    usuario = JSON.parse(localStorage.getItem(idUsuario));

    console.log("Imprimi el usuario")
    console.log(usuario)

    if (!usuario) {
        window.open('../index.html', '_self');
    } else if (usuario.tipo === "Cliente") {
        let mostrarMensaje = document.getElementById("nombreCompleto");
        mostrarMensaje.innerHTML = usuario.nombre;

        var urlCarritoCompras = document.getElementById("carritoCompras");
        urlCarritoCompras.href = "../vista_consumidor/carritoCompras.html?idUsuario=" + usuario.idUsuario;

        var urlProductos = document.getElementById("productos");
        urlProductos.href = "../vista_consumidor/productos.html?idUsuario=" + idUsuario;

    } else {
        window.open('../index.html', '_self');
    }
}

validarUsuario();

function getUsuario() {

    var nombreU = document.getElementById("txt_nombreG")
    var aPaternoU = document.getElementById("txt_aPaternoG")
    var aMaternoU = document.getElementById("txt_aMaternoG")
    var correoU = document.getElementById("txt_correoG")
    var claveU = document.getElementById("txt_celularG")
    var fechaNacimientoU = document.getElementById("txt_fNacimientoG")

    alert("Prueba que a mi si me sirve xD")

    try {

        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.response);
                console.log(data)
            }
        };
        request.open('GET', URL_HOST + "/clientes/" + idUsuario, true)
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader("x-access-token", usuario.token);

        request.send();
    } catch (error) {
        alert(`Ocurrió un error, intente más tarde o comuniquese con los profesionales`)
    }
}
getUsuario()

function modificar() {
    var nombreU = document.getElementById("txt_nombreG").value
    var aPaternoU = document.getElementById("txt_aPaternoG").value
    var aMaternoU = document.getElementById("txt_aMaternoG").value
    var correoU = document.getElementById("txt_correoG").value
    var claveU = document.getElementById("txt_celularG").value
    var fechaNacimientoU = document.getElementById("txt_fNacimientoG").value

    try {
        alert(`jala`)


        /*let modfUsuario = {
            nombre: nombreU,
            primerApellido: aPaternoU,
            segundoApellido: aMaternoU,
            correo: correoU,
            clave: claveU,
            fechaNacimiento: fechaNacimientoU
           }*/
    } catch (error) {
        alert(`Ocurrió un error, intente más tarde o comuniquese con los profesionales`)
    }
}

/*function cerrarSesion() {
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open('../index.html', '_self');
    }, 1000);
}*/