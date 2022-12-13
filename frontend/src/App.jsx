import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom'
import { Login } from './componentes/Login/Login'
import { ConsultarProductos } from './componentes/Producto/ConsultarProductos'

export function App(){

    return (
		<Router>
			<Routes>
				<Route path='/abarrotes_cuevas/login' element={<Login />} />
                <Route path='/abarrotes_cuevas/productos' element={<ConsultarProductos />} />
                


                </Routes>
		</Router>
    )

}