var URL_HOST = "http://localhost:3000/api/abarrotes_cuevas/1.0"

function iniciarSesion() {

    let formularioIniciarSesion = document.forms.formularioIniciarSesion;

    let correoUsuario = formularioIniciarSesion.txtCorreo.value;
    let contrasenia = formularioIniciarSesion.txtPassword.value;

    console.log(contrasenia)

    var request = new XMLHttpRequest();

    request.open('POST', URL_HOST + "/usuarios/iniciarSesion", true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    let informacionUsuario
    request.onload = function() {
        if (request.status >= 200 && request.status < 300) {
            informacionUsuario = JSON.parse(this.response);
            console.log(this.response)

            if (informacionUsuario.length === 0) {
                let mostrarMensaje = document.getElementById("mensajeAlerta");
                mostrarMensaje.innerHTML = '<div class="alert alert-danger text-center " role="alert">' +
                    'No se encontro el usuario con las credeciales introducidas' +
                    '</div>';
            } else {

                console.log(informacionUsuario);
                let sesion = informacionUsuario.usuario

                switch (sesion.tipo) {
                    case "Cliente":
                        localStorage.setItem('idUsuario', sesion.idUsuario);
                        localStorage.setItem(sesion.idUsuario, JSON.stringify(sesion));
                        window.open('./vista_consumidor/productos.html?idUsuario=' + sesion.idUsuario, '_self');
                        break;
                    case "Repartidor":

                        break;
                    case "Administrador":
                        localStorage.setItem('idUsuario', sesion.idUsuario);
                        localStorage.setItem(sesion.idUsuario, JSON.stringify(sesion));
                        window.open('../views/vista_administrador/listaEmpleados.html?idUsuario=' + sesion.idUsuario, '_self');
                        break;

                    default:
                        break;
                }

            }

        }
    }
    let bodyCrendenciales = JSON.stringify({ correo: correoUsuario, clave: contrasenia })

    request.send(bodyCrendenciales)

    return false;
}