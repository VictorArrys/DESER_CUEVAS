var URL_HOST = "http://localhost:3001/api/abarrotes_cuevas/1.0"
var usuario;
var tokenCliente;

var urlParametro = window.location.search;
var parametro = new URLSearchParams(urlParametro);

var idUsuario = parametro.get('idUsuario');

function validarUsuario() {

    usuario = JSON.parse(localStorage.getItem(idUsuario));

    console.log("Imprimi el usuario")
    console.log(usuario)

    if (!usuario) {
        window.open('../index.html', '_self');
    } else if (usuario.tipo === "Cliente") {
        let mostrarMensaje = document.getElementById("nombreCompleto");
        mostrarMensaje.innerHTML = usuario.nombre;

        var urlCarritoCompras = document.getElementById("carritoCompras");
        urlCarritoCompras.href = "../vista_consumidor/carritoCompras.html?idUsuario=" + usuario.idUsuario;

        var urlProductos = document.getElementById("productos");
        urlProductos.href = "../vista_consumidor/productos.html?idUsuario=" + idUsuario;

        var urlConsultarCliente = document.getElementById("consultarCliente");
        urlConsultarCliente.href = "../vistaUsuario/consultarCliente.html?idUsuario=" + idUsuario;

        var urlRegistrarDireccion =document.getElementById("registrarDireccion");
            urlRegistrarDireccion.href =
              "../vistaUsuario/registrarDireccion.html?idUsuario=" + idUsuario;

    } else {
        window.open('../index.html', '_self');
    }
}
validarUsuario();


function getDirecciones(){
    try {
        var request = new XMLHttpRequest();
        tbl_Direccion = document.getElementById("tbl_cuerpoD");
        request.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200){
                var data = JSON.parse(this.response);
                console.log(data)

                for (var key in data.respuesta){
                    var filaDireccion = document.createElement("tr");
                    filaDireccion.id = data.respuesta[key].idDireccion;
                    filaDireccion.onclick = function (){
                        //localStorage.setItem("idDireccion", this.id);
                        localStorage.setItem("idUsuario", usuario.idUsuario);
                        localStorage.setItem(usuario.idUsuario, JSON.stringify(usuario));
                        localStorage.setItem("idDireccion", this.id);
                        //window.open("./editarEmpleado.html?idUsuario=" + usuario.idUsuario + "&idEmpleado=" + this.id, "_self");

                        window.open("./modificarDireccion.html?idUsuario=" + usuario.idUsuario + "&idDireccion=" + this.id, "_self")
                    };

                    var cDireccion = document.createElement("td")
                    var cCalle = document.createElement("td")
                    var cExterior = document.createElement("td")
                    var cColonia = document.createElement("td")
                    var cMunicipio = document.createElement("td")
                    var cCiudad = document.createElement("td")


                    cDireccion.innerHTML = data.respuesta[key].idDireccion
                    cCalle.innerHTML = data.respuesta[key].calle
                    cExterior.innerHTML = data.respuesta[key].noExterior
                    cColonia.innerHTML = data.respuesta[key].colonia
                    cMunicipio.innerHTML = data.respuesta[key].municipio
                    cCiudad.innerHTML = data.respuesta[key].entidadFederativa

                    filaDireccion.appendChild(cDireccion)
                    filaDireccion.appendChild(cCalle)
                    filaDireccion.appendChild(cExterior)
                    filaDireccion.appendChild(cColonia)
                    filaDireccion.appendChild(cMunicipio)
                    filaDireccion.appendChild(cCiudad)

                    tbl_Direccion.appendChild(filaDireccion);
                }
            }
        }

        request.open('GET', URL_HOST + "/direcciones/" + idUsuario, true)
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader("x-access-token", usuario.token);

        request.send()
    } catch (error) {
        alert(`Ocurrió un error, intente más tarde o comuniquese con los profesionales`)
    }
}
getDirecciones();