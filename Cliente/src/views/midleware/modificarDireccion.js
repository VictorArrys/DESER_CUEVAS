var URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0";
var token;
var idDireccion;
var idUsuario
var usuario;


/*function validarUsuario() {
    let miURL = document.location.href;
  
    if (miURL.indexOf("?") > 0) {
      let valorUser = miURL.split("?")[1];
      let parametros = miURL.split("?")[1];
  
      let idUsuario = valorUser.split("=")[1];
      let valorIdDireccion = parametros.split("&")[1];

      idDireccion = valorIdDireccion.split("=")[1];
  
      usuario = JSON.parse(localStorage.getItem(idUsuario));
      console.log("usuraio");
  
      if (!usuario) {
        window.open("../index.html", "_self");
      } else if (usuario.tipo === "Cliente") {
        var urlCarritoCompras = document.getElementById("carritoCompras");
        urlCarritoCompras.href =
          "../vista_consumidor/carritoCompras.html?idUsuario=" +
          usuario.idUsuario;
  
        var urlProductos = document.getElementById("productos");
        urlProductos.href =
          "../vista_consumidor/productos.html?idUsuario=" + idUsuario;
  
        var urlConsultarCliente = document.getElementById("consultarCliente");
        urlConsultarCliente.href =
          "../vistaUsuario/consultarCliente.html?idUsuario=" + idUsuario;
  
        var urlConsultarDirecciones = document.getElementById(
          "consultarDirecciones"
        );
        urlConsultarDirecciones.href =
          "../vistaUsuario/consultarDirecciones.html?idUsuario=" + idUsuario;
  
  
        var urlRegistrarDireccion = document.getElementById("registrarDireccion");
        urlRegistrarDireccion.href =
          "../vistaUsuario/registrarDireccion.html?idUsuario=" + idUsuario;
  
        var urlProductosBoton = document.getElementById("btn_cancelar");
        urlProductosBoton.href =
          "../vistaUsuario/registrarDireccion.html?idUsuario=" + idUsuario;
      }
    } else {
      window.open("../index.html", "_self");
    }
  }
  validarUsuario();*/

// ! Validación de usuario para regresar al login si no esta logeado
function validarUsuario() {
  let miURL = document.location.href;
  console.log("storage:");
  console.log(localStorage);

  if (miURL.indexOf("?") > 0) {
    let parametros = miURL.split("?")[1];

    let valorUser = parametros.split("&")[0];
    let valorIdDireccion = parametros.split("&")[1];

    idUsuario = valorUser.split("=")[1];
    idDireccion = valorIdDireccion.split("=")[1];

    usuario = JSON.parse(localStorage.getItem(idUsuario));

    token = usuario.token;

    if (!usuario){

    }else if (usuario.tipo === "Cliente"){
        var urlCarritoCompras = document.getElementById("carritoCompras");
      urlCarritoCompras.href =
        "../vista_consumidor/carritoCompras.html?idUsuario=" +
        usuario.idUsuario;

      var urlProductos = document.getElementById("productos");
      urlProductos.href =
        "../vista_consumidor/productos.html?idUsuario=" + idUsuario;

      var urlConsultarCliente = document.getElementById("consultarCliente");
      urlConsultarCliente.href =
        "../vistaUsuario/consultarCliente.html?idUsuario=" + idUsuario;

      var urlConsultarDirecciones = document.getElementById(
        "consultarDirecciones"
      );
      urlConsultarDirecciones.href =
        "../vistaUsuario/consultarDirecciones.html?idUsuario=" + idUsuario;


      var urlRegistrarDireccion = document.getElementById("registrarDireccion");
      urlRegistrarDireccion.href =
        "../vistaUsuario/registrarDireccion.html?idUsuario=" + idUsuario;
    }

  } else {
    window.open("../index.html", "_self");
  }
}
validarUsuario();


function getDireccion(){
    var calleG = document.getElementById("txt_calle")
    var numExtG = document.getElementById("txt_numExt")
    var numIntG = document.getElementById("txt_numInt")
    var coloniaG = document.getElementById("txt_colonia")
    var codigoPG = document.getElementById("txt_cPostal")
    var municipioG = document.getElementById("txt_municipio")
    var entidadG = document.getElementById("txt_entidad")

    try{
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                var data = JSON.parse(this.response);
                console.log(data.respuesta[0])
                var registro = data.respuesta[0]

                calleG.value = registro.calle
                numExtG.value = registro.noExterior
                numIntG.value = registro.noInterior
                coloniaG.value = registro.colonia
                codigoPG.value = registro.codigoPostal
                municipioG.value = registro.municipio
                entidadG.value = registro.entidadFederativa
            }
        }

        request.open('GET', URL_HOST + "/direcciones/"+ usuario.idUsuario +"/" + idDireccion, true)
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader("x-access-token", usuario.token);

        request.send();
    }catch(error){
        alert(`Ocurrió un error, intente más tarde o comuniquese con los profesionales`)
    }
}
getDireccion();


function modificarDireccion (){
    var calleM = document.getElementById("txt_calle").value
    var numExtM = document.getElementById("txt_numExt").value
    var numIntM = document.getElementById("txt_numInt").value
    var coloniaM = document.getElementById("txt_colonia").value
    var codigoPM = document.getElementById("txt_cPostal").value
    var municipioM = document.getElementById("txt_municipio").value
    var entidadM = document.getElementById("txt_entidad").value

    try{
        
        let modificarDireccion = {
            calle: calleM,
            noExterior: numExtM,
            noInterior: numIntM,
            colonia: coloniaM,
            codigoPostal: codigoPM,
            municipio: municipioM,
            entidadFederativa: entidadM,
            latitud: "0,0,0,0,0",
            longitud: "0,0,0,0,0"
        }


        console.log(usuario.token)
        var request = new XMLHttpRequest();
        request.open('PATCH', URL_HOST + "/direcciones/" + usuario.idUsuario, true)
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader("x-access-token", usuario.token);


        request.onload = function(){
            if (request.status >= 200 && request.status < 300){
                alert("Direccion actualizada con éxito")
                alert("Para ver reflejado los cambios favor de hacer clic en la tab 'consultar direcciones' u otro")
            }
        }

        let uR = JSON.stringify(modificarDireccion)
        request.send(uR)


    }catch (error){
        console.log(error)
        alert(`Ocurrió un error, intente más tarde o comuniquese con los profesionales`)
    }
}

function cerrarSesion() {
    localStorage.removeItem(usuario.idUsuario);
    setTimeout(() => {
      window.open("../index.html", "_self");
    }, 1000);
  }