var URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0";
var token;
var idEmpleado;

var usuario;

// ! Validación de usuario para regresar al login si no esta logeado
function validarUsuario() {
  let miURL = document.location.href;
  console.log("storage:");
  console.log(localStorage);

  if (miURL.indexOf("?") > 0) {
    let parametros = miURL.split("?")[1];

    let valorUser = parametros.split("&")[0];
    let valorIdEmpleado = parametros.split("&")[1];

    let idUsuario = valorUser.split("=")[1];
    idEmpleado = valorIdEmpleado.split("=")[1];

    usuario = JSON.parse(localStorage.getItem(idUsuario));

    token = usuario.token;
  } else {
    window.open("../index.html", "_self");
  }
}
validarUsuario();

function editarEmpleado() {
  let nombre = document.getElementById("txt_Nombre").value;
  let primerApellido = document.getElementById("txt_PrimerApellido").value;
  let segundoApellido = document.getElementById("txt_SegundoApellido").value;
  let fechaIngreso = document.getElementById("dt_FechaIngreso").value;
  let correo = document.getElementById("txt_Correo").value;
  let contrasena = document.getElementById("psw_Contrasena").value;
  let tipo = document.getElementById("slt_Tipo").value;
  let cargo = document.getElementById("slt_Cargo").value;
  let sucursal = document.getElementById("slt_Sucursal").value;

  validarDatos();

  ////////////////////////////////

  try {
    let nuevoEmpleado = {
      nombre: nombre,
      primerApellido: primerApellido,
      segundoApellido: segundoApellido,
      correo: correo,
      clave: contrasena,
      fechaIngreso: fechaIngreso,
      idCargo: cargo,
      idSucursal: sucursal,
    };

    console.log(nuevoEmpleado);

    var request = new XMLHttpRequest();
    request.open("PATCH", URL_HOST + "/empleados/" + idEmpleado, true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.setRequestHeader("x-access-token", token);

    let empleadoRegistrado;
    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        alert("Usuario " + nombre + " modificado con éxito");
      }
    };
    let cuerpoPeticion = JSON.stringify(nuevoEmpleado);
    request.send(cuerpoPeticion);
  } catch (error) {
    console.log(error);
    alert(
      "Ocurrió un error, intente más tarde o comuniquese con los profesionales"
    );
  }

  ////////////////////////

  return false;
}

window.onload = function () {
  cargarSucursales();
  cargarEmpleado();
};

function validarDatos() {
  let nombre = document.getElementById("txt_Nombre");
  let primerApellido = document.getElementById("txt_PrimerApellido");
  let segundoApellido = document.getElementById("txt_SegundoApellido");
  let fechaIngreso = document.getElementById("dt_FechaIngreso");
  let correo = document.getElementById("txt_Correo");
  let contrasena = document.getElementById("psw_Contrasena");
  let cargo = document.getElementById("slt_Cargo");
  let sucursal = document.getElementById("slt_Sucursal");

  validarCorreo(correo.value)
    ? (correo.style.borderColor = "green")
    : (correo.style.borderColor = "red");

  validarNombre(nombre.value)
    ? (nombre.style.borderColor = "green")
    : (nombre.style.borderColor = "red");
}

function validarCorreo(correo) {
  const regexCorreo =
    /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  return regexCorreo.test(correo);
}

function validarNombre(nombre) {
  const regexNombre = new RegExp("[a-zA-Z ]((?![0-9])){1,100}");
  return regexNombre.test(nombre);
}

function cargarSucursales() {
  var request = new XMLHttpRequest();
  request.open("GET", URL_HOST + "/sucursales", true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.setRequestHeader("x-access-token", token);

  let sucursales;

  request.onload = function () {
    slt_Sucursal = document.getElementById("slt_Sucursal");
    if (request.status >= 200 && request.status < 300) {
      sucursales = JSON.parse(this.response);

      if (sucursales.length === 0) {
        alert("No hay sucursales registradas");
      } else {
        for (var key in sucursales.resultadoInicio) {
          var sucursalOpcion = new Option(
            sucursales.resultadoInicio[key].nombre,
            sucursales.resultadoInicio[key].idSucursal
          );
          slt_Sucursal.options.add(sucursalOpcion);
        }
      }
    } else {
      alert("No se puede conectar al servidor...");
    }
  };

  request.send();

  return false;
}

function cargarEmpleado() {
  let nombre = document.getElementById("txt_Nombre");
  let primerApellido = document.getElementById("txt_PrimerApellido");
  let segundoApellido = document.getElementById("txt_SegundoApellido");
  let fechaIngreso = document.getElementById("dt_FechaIngreso");
  let correo = document.getElementById("txt_Correo");
  let contrasena = document.getElementById("psw_Contrasena");
  let tipo = document.getElementById("slt_Tipo");
  let cargo = document.getElementById("slt_Cargo");
  let sucursal = document.getElementById("slt_Sucursal");

  try {
    var request = new XMLHttpRequest();
    request.open("GET", URL_HOST + "/empleados/" + idEmpleado, true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.setRequestHeader("x-access-token", token);

    let empleadoConsultado;

    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        empleadoConsultado = JSON.parse(this.response);
        console.log(empleadoConsultado.resultadoInicio[0]);

        nombre.value = empleadoConsultado.resultadoInicio[0].nombre;
        primerApellido.value =
          empleadoConsultado.resultadoInicio[0].primerApellido;
        segundoApellido.value =
          empleadoConsultado.resultadoInicio[0].segundoApellido;
        fechaIngreso.value =
          empleadoConsultado.resultadoInicio[0].fechaIngreso.substr(0, 10);
        correo.value = empleadoConsultado.resultadoInicio[0].correo;
        contrasena.value = empleadoConsultado.resultadoInicio[0].contrasena;
        tipo.selectedIndex = empleadoConsultado.resultadoInicio[0].tipo;
        cargo.selectedIndex = empleadoConsultado.resultadoInicio[0].cargo;
        sucursal.selectedIndex = empleadoConsultado.resultadoInicio[0].sucursal;
      }
    };
    request.send();
  } catch (error) {
    console.log(error);
    alert(
      "Ocurrió un error, intente más tarde o comuniquese con los profesionales"
    );
  }
}

function cancelar() {
  localStorage.setItem("idUsuario", usuario.idUsuario);
  localStorage.setItem(usuario.idUsuario, JSON.stringify(usuario));
  window.open("./listaEmpleados.html?idUsuario=" + usuario.idUsuario, "_self");
}
