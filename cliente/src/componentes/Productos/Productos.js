import React, { useState, useEffect } from 'react';
import Producto from '../Producto/Producto';
import Buscador from '../Buscador/Buscador';
import './Productos.css';
//import { withAuth0 } from '@auth0/auth0-react';
import config from "../../auth_config.json";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const Productos = () => {

    const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect} = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    const [productos, setProductos] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [autenticado, setAutenticado] = useState(false)
    
    
    
    useEffect(() => {
         //const { isAuthenticated } = this.props.auth;
         //const { isAuthenticated } = this.props.auth0;
         //console.log(this.props.auth0);
         if(isAuthenticated) 
            queryAPI();
       
    },[isAuthenticated])

   const queryAPI = async() => {
        const url = 'http://localhost:8080/productos';
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `http://productos`,
        scope: "read:prouctos",
      });

      console.log(accessToken)
      const resultado = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

     const productos = await resultado.json();
      console.log(productos)
      setProductos(productos)
    } catch (e) {
      console.log(e);
    }
    }

    const busquedaProducto = (busqueda) => {
            if(busqueda.length > 3) {

                // obtener copia del state
                let productos = [...productos];


                // filtrar
                let resultado;

                resultado = productos.filter(producto => (
                    producto.nombre.toLowerCase().indexOf( busqueda.toLowerCase()  ) !== -1
                ))
               

                // enviar al state los productos filtrados y la busqueda
               setTerminoBusqueda(busqueda);
               setProductos(resultado);
            } else {
                setTerminoBusqueda('');
                queryAPI();
            }
      }

   const login = () => {
        loginWithRedirect();
    }
    
        return ( 
               <div className="productos">
                    
                    { isAuthenticated && (
                        <React.Fragment>
                            <h2>Nuestros Productos</h2>
                            <Buscador
                                busqueda={busquedaProducto}
                            />
                            <ul className="lista-productos">
                                {Object.keys(productos).map(producto => (
                                    <Producto
                                        informacion={productos[producto]}
                                        key={producto}
                                    />
                            )) }
                            </ul>
                        </React.Fragment>
                    )

                    }
                    

                    { !isAuthenticated && (
                        <div className="contenedor-boton">
                            <p>Para ver el contenido debes estar logueado:</p>
                            <a className="boton" onClick={ login }>Iniciar Sesión</a>
                        </div>
                    ) }
               </div>
           )     
}
 
export default Productos;