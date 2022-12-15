var URL_HOST = "https://9f0f-2806-2f0-7080-c9c8-c1b4-9c34-e39b-24ff.ngrok.io/";
// var URL_HOST = "http://localhost:4000/"



function verificarCodigo(){
    try {
        var codigo = parseInt(document.getElementById("txtcodigo").value);
        var correo = localStorage.getItem('correo');
        var body = {
            "correo": correo,
            "codigo": codigo
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(parseInt(this.response) == 1){
                document.location.href = "recuperacion.html";
            }else{
                document.getElementById("alerterror").hidden = false;
            }
        }
        };
        xhttp.open("POST", URL_HOST+"usuario/passwordrecovery", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(body));
    } catch (error) {
        alert(error);
    }
}