import React from 'react'
import  "./login.css"

export const MenuPrincipal = (Componente) => {
  return (
    <div class="containerMenu">
      <nav>
        <a href="/abarrotes_cuevas/productos">Option 1</a>
        <a href=".">Option 2</a>
        <a href=".">Option 3</a>
        <a href=".">Option 4</a>
      </nav>     
      <Componente />

    </div>

  )}
