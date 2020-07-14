import React, {Fragment, useState,useEffect} from 'react';
import {Route, Switch,BrowserRouter} from 'react-router-dom';
import './App.css';
//import LoginButton from './componentes/LogIn';
import Navegacion from './componentes/Navegacion/Navegacion';
import Header from './componentes/Header/Header';
import Productos from './componentes/Productos/Productos'; 
import SingleProducto from './componentes/SingleProducto/SingleProducto';
import Nosotros from './componentes/Nosotros/Nosotros';
import Contacto from './componentes/Contacto/Contacto';


function App() {
  
  const [productos, setProducto] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');


  let products = [...productos];
  let busqueda = terminoBusqueda;
  let resultado;
  
  if(busqueda !== '') {
    resultado = products.filter(producto => (
      producto.nombre.toLowerCase().indexOf( busqueda.toLowerCase()  ) !== -1
    ))
  } else {
    resultado = productos;
  }

  function busquedaProducto (busqueda) {
    if(busqueda.length > 3) {
      this.setState({
        terminoBusqueda : busqueda
      })
    } else {
       this.setState({
         terminoBusqueda: ''
       })
    }
  }
  return (
   
      <Fragment>
        <BrowserRouter>
            <div className="contenedor">
                  <Header />
                  <Navegacion />
                  <Switch>
                      <Route exact path="/" render={() => (
                            <Productos
                                productos={resultado}
                                busquedaProducto={busquedaProducto}
                            />
                      ) } />
                      <Route exact path="/nosotros" component={Nosotros} />
                      <Route exact path="/productos" render={ () => (
                          <Productos
                            productos={resultado}
                            busquedaProducto={busquedaProducto}
                          />
                        ) } />
                      <Route exact path="/producto/:productoId" render={(props) => {
                            let idProducto = props.location.pathname.replace('/producto/', '');
                            return (
                                <SingleProducto
                                      producto={this.state.productos[idProducto]}
                                      key={idProducto}
                                />
                            )
                      } } />
                      <Route exact path="/contacto" component={Contacto} />
                      <Route component={Error} />
                  </Switch>
            </div>
        </BrowserRouter>
      </Fragment>
  );
}

export default App;
