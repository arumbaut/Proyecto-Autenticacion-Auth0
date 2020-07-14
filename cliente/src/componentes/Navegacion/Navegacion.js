import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
import './Navegacion.css';

class Navegacion extends Component {

    iniciarSesion = () => {
        this.props.auth0.loginWithRedirect();
    }

    cerrarSesion = () => {
        this.props.auth0.logout()
    }
    
     render(){
        const { isAuthenticated } = this.props.auth0;
        let resultado;

        if( isAuthenticated ) {
            resultado = <a onClick={this.cerrarSesion}>Cerrar Sesión</a>
        } else {
            resultado = <a onClick={this.iniciarSesion}>Iniciar Sesión</a>
        }

        return ( 
            <nav className="navegacion">
                 <NavLink to={'/nosotros'} activeClassName="activo">Nosotros</NavLink>
                 <NavLink to={'/productos'} activeClassName="activo">Productos</NavLink>
                 <NavLink to={'/contacto'} activeClassName="activo">Contacto</NavLink>
                 {resultado}
            </nav>
        );
     }
}
 
export default withAuth0(Navegacion);