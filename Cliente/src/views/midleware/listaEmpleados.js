var URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0";
var token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjIsImNvcnJlbyI6ImxldmF0aG9zMTZAZ21haWwuY29tIiwidGlwbyI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE2NzE0ODYxODUsImV4cCI6MTY3MTQ5MzM4NX0._MkDB_k7g21IKAiwQjy7dy26jk0gizOUaAa3LW8Sl_s";

var cargos = { 1: "Administrador", 2: "Ejecutivo de ventas", 3: "Repartidor" };

window.onload = function () {
  cargarEmpleados();
};

function cargarEmpleados() {
  var request = new XMLHttpRequest();
  request.open("GET", URL_HOST + "/empleados", true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.setRequestHeader("x-access-token", token);

  let empleados;

  request.onload = function () {
    tbl_Empleados = document.getElementById("tbl_cuerpo");
    if (request.status >= 200 && request.status < 300) {
      empleados = JSON.parse(this.response);

      if (empleados.length === 0) {
        alert("No hay empleados registradas");
      } else {
        console.log(empleados.resultadoInicio);

        for (var key in empleados.resultadoInicio) {
          var filaEmpleado = document.createElement("tr");
          filaEmpleado.id = empleados.resultadoInicio[key].idUsuario;
          filaEmpleado.onclick = function () {
            //console.log(this.id);
            window.location = "prueba.html";

            localStorage.setItem("idUsuario", this.id);
            //localStorage.setItem(sesion.idUsuario, JSON.stringify(sesion));
            window.open("./editarEmpleado.html?idUsuario=" + this.id, "_self");
          };

          var celdaNombre = document.createElement("td");
          var celdaPrimerApellido = document.createElement("td");
          var celdaSegundoApellido = document.createElement("td");
          var celdaCargo = document.createElement("td");
          var celdaSucursal = document.createElement("td");

          celdaNombre.innerHTML = empleados.resultadoInicio[key].nombre;
          celdaPrimerApellido.innerHTML =
            empleados.resultadoInicio[key].primerApellido;
          celdaSegundoApellido.innerHTML =
            empleados.resultadoInicio[key].segundoApellido;
          celdaCargo.innerHTML = cargos[empleados.resultadoInicio[key].idCargo];
          celdaSucursal.innerHTML = empleados.resultadoInicio[key].idSucursal;

          filaEmpleado.appendChild(celdaNombre);
          filaEmpleado.appendChild(celdaPrimerApellido);
          filaEmpleado.appendChild(celdaSegundoApellido);
          filaEmpleado.appendChild(celdaCargo);
          filaEmpleado.appendChild(celdaSucursal);

          tbl_Empleados.appendChild(filaEmpleado);
        }
      }
    } else {
      alert("No se puede conectar al servidor...");
    }
  };

  request.send();

  return false;
}
