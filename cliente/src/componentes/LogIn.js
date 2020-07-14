import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <a href="/#" className="boton" onClick={()=> loginWithRedirect() }>Iniciar Sesión</a>
};

export default LoginButton;