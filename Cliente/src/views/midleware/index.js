var URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0"
//  var URL_HOST = "http://localhost:4000/"

function iniciarSesion() {
    
    let formularioIniciarSesion = document.forms.formularioIniciarSesion;
    
    let correo = formularioIniciarSesion.txtCorreo.value;
    let contrasenia = formularioIniciarSesion.txtPassword.value;
    const params = {
        email: correo,
        clave: contrasenia,
    }

    let informacionUsuario;
    
    var request = new XMLHttpRequest();

    request.open('POST', URL_HOST + "/usuario/iniciarSesion" , true);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    

    request.onload = function(){
        if (request.status >= 200 && request.status < 300) {
            informacionUsuario = JSON.parse(this.response);

            if (informacionUsuario.length === 0) {
                let mostrarMensaje = document.getElementById("mensajeAlerta");
                mostrarMensaje.innerHTML =  '<div class="alert alert-danger text-center " role="alert">' +
                                                'No se encontro el usuario con las credeciales introducidas' +
                                            '</div>';                      
            }else{

                console.log(informacionUsuario);
                /*
                switch (informacionUsuario[0].tipo) {
                    case "Cliente":
                        localStorage.setItem('correo',informacionUsuario[0].correo);
                        //localStorage.setItem(informacionUsuario[0].idUsuario, JSON.stringify(informacionUsuario[0]));
                        //window.open('./vista_consumidor/productos.html?idUsuario='+ informacionUsuario[0].idUsuario ,'_self');
                        break;
                    case "Ejecutivo":
                        
                        break;
                    case "Repartidor":
                        
                        break;
                    case "Administrador":
                        localStorage.setItem(informacionUsuario[0].idUsuario, JSON.stringify(informacionUsuario[0]));
                        window.open('productos.html?idUsuario='+ informacionUsuario[0].idUsuario ,'_self');
                        break;
                
                    default:
                        break;
                }
                */
            } 
        }
    }
    request.send(JSON.stringify(params))

    return false;
}