var URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0";
var token;
///////////////////////////////

var usuario;

// ! Validación de usuario para regresar al login si no esta logeado
function validarUsuario() {
  let miURL = document.location.href;
  console.log(localStorage);
  if (miURL.indexOf("?") > 0) {
    let valorUser = miURL.split("?")[1];

    let idUsuario = valorUser.split("=")[1];

    usuario = JSON.parse(localStorage.getItem(idUsuario));
    token = usuario.token;
  } else {
    window.open("../index.html", "_self");
  }
}
validarUsuario();

function registrarEmpleado() {
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
  if (!validarDatos()) {
    alert("Datos invalidos")
  }
  else {
    try {
      let nuevoEmpleado = {
        nombre: nombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        correo: correo,
        clave: contrasena,
        tipo: tipo,
        fechaIngreso: fechaIngreso,
        idCargo: cargo,
        idSucursal: sucursal,
      };

      console.log(nuevoEmpleado);

      var request = new XMLHttpRequest();
      request.open("POST", URL_HOST + "/empleados", true);
      request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      request.setRequestHeader("x-access-token", token);

      let empleadoRegistrado;
      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
          empleadoRegistrado = JSON.parse(this.response);
          alert("Usuario " + nombre + " registrado con éxito");
        }
      };
      let cuerpoPeticion = JSON.stringify(nuevoEmpleado);
      request.send(cuerpoPeticion);
    } catch (error) {
      alert(
        "Ocurrió un error, intente más tarde o comuniquese con los profesionales"
      );
    }
  }
  ////////////////////////

  return false;
}

window.onload = function () {
  cargarSucursales();
  console.log("Información usuario: " + JSON.stringify(usuario));
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

  let datosValidos = true;

  validarCorreo(correo.value)
    ? (correo.style.borderColor = "green")
    : (correo.style.borderColor = "red");

  validarNombre(nombre.value)
    ? (nombre.style.borderColor = "green")
    : (nombre.style.borderColor = "red");

  primerApellido.value != "" ? primerApellido.style.borderColor = "green" : primerApellido.style.borderColor = "red";
  segundoApellido.value != "" ? segundoApellido.style.borderColor = "green" : segundoApellido.style.borderColor = "red";
  fechaIngreso.value != "" ? fechaIngreso.style.borderColor = "green" : fechaIngreso.style.borderColor = "red";
  contrasena.value != "" ? contrasena.style.borderColor = "green" : contrasena.style.borderColor = "red";

  datosValidos = validarCorreo(correo.value) && datosValidos;
  datosValidos = validarNombre(nombre.value) && datosValidos;
  datosValidos = primerApellido.value != "" && datosValidos;
  datosValidos = segundoApellido.value != "" && datosValidos;
  datosValidos = fechaIngreso.value != "" && datosValidos;
  datosValidos = contrasena.value != "" && datosValidos;

  return datosValidos;
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

function cancelar() {
  localStorage.setItem("idUsuario", usuario.idUsuario);
  localStorage.setItem(usuario.idUsuario, JSON.stringify(usuario));
  window.open("./listaEmpleados.html?idUsuario=" + usuario.idUsuario, "_self");
}
