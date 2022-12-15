var usuario; 

function validarUsuario() {

    let miURL = document.location.href;
    
    if(miURL.indexOf('?') > 0) {
        
        let valorUser = miURL.split('?')[1];

        let idUsuario = valorUser.split('=')[1];

        usuario =  JSON.parse(localStorage.getItem(idUsuario));

        if (!usuario) {
            window.open('index.html','_self');
        }else if(usuario.tipo === "Cliente"){
            let mostrarMensaje = document.getElementById("nombreCompleto");
                mostrarMensaje.innerHTML = usuario.nombreCompleto;
        }
    }else{
        window.open('index.html','_self');
    }
}

validarUsuario();

function cerrarSesion(){
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
        window.open('index.html','_self');
    }, 1000);
}