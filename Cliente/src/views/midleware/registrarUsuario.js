var URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0"

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
            }else if (request.status == 422){
                alert(`usuario ya registrado, intente de nuevo`)
                window.open('../views/index.html', '_self')
            }
        }
        let uR = JSON.stringify(nuevoUsuario)
        request.send(uR)

    } catch (error) {
        alert(`Ocurrió un error, intente comunicar el error con soporte`)
    }

    return false;
}

function cancelar() {
    window.open('../views/index.html', '_self')
}