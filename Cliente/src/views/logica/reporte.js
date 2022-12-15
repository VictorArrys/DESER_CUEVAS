var URL_HOST = "https://9f0f-2806-2f0-7080-c9c8-c1b4-9c34-e39b-24ff.ngrok.io/"
// var URL_HOST = "http://localhost:4000/"

var params = window.location.search.substring(1);
var idUsuario = localStorage.getItem('idUsuario');

function registrarReporte() {
    let formularioRegistrarReporte = document.forms.formularioRegistrarReporte;

    let txtAsunto = formularioRegistrarReporte.txtAsunto.value;
    let txtComentarios =formularioRegistrarReporte.txtComentarios.value;
    let imagenReporteVista = formularioRegistrarReporte.txtImagenReporte.files[0];

    var reporte = new FormData();

    reporte.append("comentarios", txtComentarios);
    reporte.append("tipo", txtAsunto);
    reporte.append("idUsuario", idUsuario);
    reporte.append("imagen", imagenReporteVista);

    var request = new XMLHttpRequest();

    request.open('POST', URL_HOST+"reportes/registrar", true);

    request.onload = function(){
        if (request.status >= 200 && request.status < 300) {
            
            let mostrarMensaje = document.getElementById("mostrarMensaje");

            if(this.response == 1){
                alert("Reporte enviado exitosamente");
            }else{
                alert("Error al enviar el reporte");
            }

            restablecerModal();
            let botonClic = document.getElementById("btnCancelarReporte");
            botonClic.click();

        }
    }

    request.send(reporte);
    return false;
}

function restablecerModal(){

    let formularioRegistrarReporte = document.forms.formularioRegistrarReporte;
    formularioRegistrarReporte.reset();  

    const imagenReporteVista = document.getElementById("imagenReporteVista");

    imagenReporteVista.setAttribute("class","visually-hidden");
}

function visualizarImagenReporte() {

    const txtImagenReporte = document.getElementById("txtImagenReporte");
    const imagenReporteVista = document.getElementById("imagenReporteVista");
    
    imagenReporteVista.setAttribute("class","img-fluid");

    if (txtImagenReporte.files != 0) {
        
        const tipoImagen = [
            "image/apng",
            "image/bmp",
            "image/gif",
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/svg+xml",
            "image/tiff",
            "image/webp",
            "image/x-icon"
        ];

        for(const imagen of txtImagenReporte.files) {

            if(tipoImagen.includes(imagen.type)){
                imagenReporteVista.src = URL.createObjectURL(imagen);
            }
        }
    }

}