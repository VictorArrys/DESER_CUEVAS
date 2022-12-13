import React from 'react'
import  "./login.css"

export const Login = () => {
  return (
            <div class="overlay">
                <form >

                    <h2> Iniciar sesion </h2>
                    <p type="Email:"><input class="form-input" placeholder="Ingrese su correo.."></input></p>
                    <p type="Password:"><input class="form-input" type="password" placeholder="Clave.."></input></p>
                    <button>Ingresar</button>
                </form>

            </div> 
  );
}
