var URL_HOST = "https://9f0f-2806-2f0-7080-c9c8-c1b4-9c34-e39b-24ff.ngrok.io/"
// var URL_HOST = "http://localhost:4000/"

function registrar(){
    
    let nombreCompleto = document.getElementById("txt_nombre").value;
    let correo = document.getElementById("txt_correo").value;
    let contraseña = document.getElementById("txt_contraseña").value;
    let telefono = document.getElementById("txt_telefono").value;

   try {
        let nuevoUsuario = {
            "nombreCompleto":nombreCompleto,
            "estatus": 1,
            "tipo": "Cliente",
            "contraseña":contraseña,
            "correo":correo,
            "telefono":telefono     
        }
        
        var request = new XMLHttpRequest();
        request.open('POST', URL_HOST+'usuario/registrarUsuario', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function(){
            if(this.response == 1){
                alert("Usuario registrado con exito");
                window.open('../views/index.html', '_self')
            }else{
                alert("No fue posible realizar el registro");
            }
        }
        request.send(JSON.stringify(nuevoUsuario));    
   } catch (error) {
    alert("Ocurrió un error, intente más tarde o comuniquese con los profesionales")
   }
   
}
function cancelar(){
    window.open('../views/index.html', '_self')
}
