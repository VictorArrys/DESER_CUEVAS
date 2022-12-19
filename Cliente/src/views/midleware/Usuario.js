var URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0"
var usuario;
var tokenCliente;

var urlParametro = window.location.search;
var parametro = new URLSearchParams(urlParametro);

var idUsuario = parametro.get('idUsuario');





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



function registrar() {
    var nombreF = document.getElementById("txt_nombre").value;
    var aPaternoF = document.getElementById("txt_aPaterno").value;
    var aMaternoF = document.getElementById("txt_aMaterno").value;
    var fechaNacimientoF = document.getElementById("txt_fNacimiento").value;
    var correoF = document.getElementById("txt_correo").value;
    var celularF = document.getElementById("txt_celular").value;
    var claveF = document.getElementById("txt_clave").value;
    var tipoF = 3

    try {
        let nuevoUsuario = {
            nombre: nombreF,
            primerApellido: aPaternoF,
            segundoApellido: aMaternoF,
            correo: correoF,
            clave: claveF,
            tipo: tipoF,
            noCelular: celularF,
            fechaNacimiento: fechaNacimientoF
        }


        var request = new XMLHttpRequest();
        request.open('POST', URL_HOST + "/clientes", true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
        let usuarioRegistrado
        request.onload = function() {
            if (request.status >= 200 && request.status < 300) {
                usuarioRegistrado = JSON.parse(this.response)
                alert(`Usuario ${nombreF} registrado con éxito`)
                window.open('../views/index.html', '_self')
            }
        }
        let uR = JSON.stringify(nuevoUsuario)
        request.send(uR)

    } catch (error) {
        alert(`Ocurrió un error, intente más tarde o comuniquese con los profesionales`)
    }

    return false;
}

function getUsuario() {

    var nombreU = document.getElementById("txt_nombreG")
    var aPaternoU = document.getElementById("txt_aPaternoG")
    var aMaternoU = document.getElementById("txt_aMaternoG")
    var correoU = document.getElementById("txt_correoG")
    var claveU = document.getElementById("txt_celularG")
    var fechaNacimientoU = document.getElementById("txt_fNacimientoG")

    alert("Prueba que a mi si me sirve xD")

    try {

        const idUsuario = 1;
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

function cancelar() {
    window.open('../views/index.html', '_self')
}

/*function cerrarSesion() {
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open('../index.html', '_self');
    }, 1000);
}*/