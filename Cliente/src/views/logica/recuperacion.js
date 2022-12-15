var URL_HOST = "https://9f0f-2806-2f0-7080-c9c8-c1b4-9c34-e39b-24ff.ngrok.io/";
// var URL_HOST = "http://localhost:4000/"



function cambiarContraseña(){
    var contra = document.getElementById("txtcontra1").value;
    var correo = localStorage.getItem('correo');
    var contra2 = document.getElementById("txtcontra2").value;
    if(contra === contra2){
        registrarContraseña(correo, contra);
    }else{
        document.getElementById("alerterror").hidden = false;
    }
}

function registrarContraseña(correo, contra){
    try {
        var body = {
            "correo": correo,
            "contraseña": contra
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(parseInt(this.response) == 1){
                $("#dialogocontraseña").modal()
            }else{
                document.getElementById("alerterror").hidden = false;
            }
        }
        };
        console.log(body);
        xhttp.open("PUT", URL_HOST+"usuario/cambiarpass", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(body));
    } catch (error) {
        alert(error);
    }
}

function redirigir(){
    document.location.href = "index.html";
}