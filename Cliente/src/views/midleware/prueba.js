window.onload = function () {
  let miURL = document.location.href;
  let valorUser = miURL.split("?")[1];

  let idUsuario = valorUser.split("=")[1];

  usuario = localStorage.getItem(idUsuario);

  console.log(idUsuario);
};
