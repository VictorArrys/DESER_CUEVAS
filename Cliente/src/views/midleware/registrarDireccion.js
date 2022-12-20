var URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0";
var token;
var idCliente;

var usuario;
var listaProductos = "";
var listaProductosFiltrados = "";

// ! Validación de usuario para regresar al login si no esta logeado
function validarUsuario() {
  let miURL = document.location.href;

  if (miURL.indexOf("?") > 0) {
    let valorUser = miURL.split("?")[1];

    let idUsuario = valorUser.split("=")[1];

    usuario = JSON.parse(localStorage.getItem(idUsuario));
    console.log("usuraio");
    token = usuario.token;
    idCliente = usuario.idUsuario;
    console.log(token);
    console.log(idCliente);

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

window.onload = function () {
  validarUsuario();
};

function registrarDireccion() {
  if (!validarDatos()) {
    alert("Datos invalidos");
  } else {
    let calle = document.getElementById("txt_Calle").value;
    let noInterior = document.getElementById("txt_NoInterior").value;
    let noExterior = document.getElementById("txt_NoExterior").value;
    let colonia = document.getElementById("txt_Colonia").value;
    let codigoPostal = document.getElementById("txt_CodigoPostal").value;
    let municipio = document.getElementById("txt_Municipio").value;
    let entidadFederativa = document.getElementById(
      "txt_EntidadFederativa"
    ).value;

    ////////////////////////////////

    try {
      let nuevaDireccion = {
        calle: calle,
        noInterior: parseInt(noInterior),
        noExterior: parseInt(noExterior),
        colonia: colonia,
        codigoPostal: parseInt(codigoPostal),
        municipio: municipio,
        entidadFederativa: entidadFederativa,
        latitud: "0",
        longitud: "0",
      };

      console.log(nuevaDireccion);

      var request = new XMLHttpRequest();
      request.open("POST", URL_HOST + "/direcciones/" + idCliente, true);
      request.setRequestHeader(
        "Content-Type",
        "application/json; charset=UTF-8"
      );
      request.setRequestHeader("x-access-token", token);

      let direccionRegistrada;

      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
          direccionRegistrada = JSON.parse(this.response);
          alert("Dirección registrada con éxito");
        }
      };

      let cuerpoPeticion = JSON.stringify(nuevaDireccion);
      request.send(cuerpoPeticion);
    } catch (error) {
      alert(
        "Ocurrió un error, intente más tarde o comuniquese con los profesionales"
      );
    }

    ////////////////////////
  }
  return false;
}

function validarDatos() {
  let calle = document.getElementById("txt_Calle");
  let noInterior = document.getElementById("txt_NoInterior");
  let noExterior = document.getElementById("txt_NoExterior");
  let colonia = document.getElementById("txt_Colonia");
  let codigoPostal = document.getElementById("txt_CodigoPostal");
  let municipio = document.getElementById("txt_Municipio");
  let entidadFederativa = document.getElementById("txt_EntidadFederativa");

  let datosValidos = true;

  calle.value !== ""
    ? (calle.style.borderColor = "green")
    : (calle.style.borderColor = "red");

  colonia.value !== ""
    ? (colonia.style.borderColor = "green")
    : (colonia.style.borderColor = "red");

  municipio.value !== ""
    ? (municipio.style.borderColor = "green")
    : (municipio.style.borderColor = "red");

  entidadFederativa.value !== ""
    ? (entidadFederativa.style.borderColor = "green")
    : (entidadFederativa.style.borderColor = "red");

  parseInt(noInterior.value) >= 1
    ? (noInterior.style.borderColor = "green")
    : (noInterior.style.borderColor = "red");

  parseInt(noExterior.value) >= 1
    ? (noExterior.style.borderColor = "green")
    : (noExterior.style.borderColor = "red");

  parseInt(codigoPostal.value) >= 1 && parseInt(codigoPostal.value) <= 99999
    ? (codigoPostal.style.borderColor = "green")
    : (codigoPostal.style.borderColor = "red");

  datosValidos = calle.value !== "" && datosValidos;
  datosValidos = colonia.value !== "" && datosValidos;
  datosValidos = municipio.value !== "" && datosValidos;
  datosValidos = entidadFederativa.value !== "" && datosValidos;
  datosValidos = parseInt(noInterior.value) >= 1 && datosValidos;
  datosValidos = parseInt(noExterior.value) >= 1 && datosValidos;
  datosValidos =
    parseInt(codigoPostal.value) >= 1 &&
    parseInt(codigoPostal.value) <= 99999 &&
    datosValidos;

  console.log(datosValidos);
  return datosValidos;
}

function cerrarSesion() {
  localStorage.removeItem(usuario.idUsuario);
  setTimeout(() => {
    window.open("../index.html", "_self");
  }, 1000);
}
function cancelar(){
    window.open(
      "../vista_consumidor/productos.html?idUsuario=" + usuario.idUsuario,
      "_self"
    );
}