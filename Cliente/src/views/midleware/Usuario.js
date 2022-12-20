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

        var urlConsultarDirecciones = document.getElementById("consultarDirecciones");
        urlConsultarDirecciones.href = "../vistaUsuario/consultarDirecciones.html?idUsuario=" + idUsuario;

        var urlRegistrarDireccion =document.getElementById("registrarDireccion");
            urlRegistrarDireccion.href =
              "../vistaUsuario/registrarDireccion.html?idUsuario=" + idUsuario;

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
    var claveU = document.getElementById("txt_claveG")
    var celularU = document.getElementById("txt_celularG")
    var fechaNacimientoU = document.getElementById("txt_fNacimientoG")

    try {

        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.response);
                console.log(data.resultadoInicio[0])
                var registro = data.resultadoInicio[0]
                
                nombreU.value = registro.nombre
                aPaternoU.value = registro.primerApellido
                aMaternoU.value = registro.segundoApellido
                correoU.value = registro.correo
                claveU.value = registro.clave
                celularU.value = registro.noCelular
                var cad1 = registro.fechaNacimiento
                cad1.toString();
                let cad2 = cad1.substring(0, 10);
                fechaNacimientoU.value = cad2
                
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
    var claveU = document.getElementById("txt_claveG").value
    var celularU = document.getElementById("txt_celularG").value
    var fechaNacimientoU = document.getElementById("txt_fNacimientoG").value

    try {

        let modificarUsuario = {
            nombre: nombreU,
            primerApellido: aPaternoU,
            segundoApellido: aMaternoU,
            correo: correoU,
            clave: claveU,
            tipo: 3,
            noCelular: celularU,
            fechaNacimiento: fechaNacimientoU
        }

        var request = new XMLHttpRequest();
        request.open('PATCH', URL_HOST + "/clientes/" + idUsuario, true)
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader("x-access-token", usuario.token);

        request.onload = function() {
            if (request.status >= 200 && request.status < 300) {
                alert(`Usuario ${nombreU} actualizado con éxito`)
                alert(`El usuario fue modificado, favor de iniciar sesión nuevamente`)
                localStorage.removeItem(usuario.idUsuario);
                setTimeout(() => {
                    window.open('../index.html', '_self');
                }, 1000)
            }else if (request.status == 403){
                alert(`Favor de comprobar que tus campos estén llenos`)
            }
        }
        let uR = JSON.stringify(modificarUsuario)
        request.send(uR)
        
    } catch (error) {
        alert(`Ocurrió un error, intente más tarde o comuniquese con los profesionales`)
    }
}

function cerrarSesion() {
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open('../index.html', '_self');
    }, 1000);
}