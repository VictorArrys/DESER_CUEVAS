var URL_HOST = "https://9f0f-2806-2f0-7080-c9c8-c1b4-9c34-e39b-24ff.ngrok.io/"
//  var URL_HOST = "http://localhost:4000/"

function iniciarSesion(params) {
    
    let formularioIniciarSesion = document.forms.formularioIniciarSesion;
    
    let correo = formularioIniciarSesion.txtCorreo.value;
    let contrasenia = formularioIniciarSesion.txtPassword.value;
    
    let informacionUsuario;
    
    var request = new XMLHttpRequest();

    request.open('GET', URL_HOST+"usuario/iniciarSesion/" + correo+ "/" + contrasenia, true);

    request.onload = function(){
        if (request.status >= 200 && request.status < 300) {
            informacionUsuario = JSON.parse(this.response);

            if (informacionUsuario.length === 0) {
                let mostrarMensaje = document.getElementById("mensajeAlerta");
                mostrarMensaje.innerHTML =  '<div class="alert alert-danger text-center " role="alert">' +
                                                'No se encontro el usuario con las credeciales introducidas' +
                                            '</div>';                      
            }else{

                switch (informacionUsuario[0].tipo) {
                    case "Cliente":
                        localStorage.setItem('idUsuario',informacionUsuario[0].idUsuario);
                        localStorage.setItem(informacionUsuario[0].idUsuario, JSON.stringify(informacionUsuario[0]));
                        window.open('./vista_consumidor/productos.html?idUsuario='+ informacionUsuario[0].idUsuario ,'_self');
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
            } 
        }
    }
    request.send();

    return false;
}