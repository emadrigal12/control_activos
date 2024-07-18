import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para carga inicial
  const history = useHistory();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Aquí deberías validar el token con tu servidor para asegurar su vigencia
        try {
          const response = await fetch("http://localhost:4000/validateToken", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            setIsAuthenticated(true);
            setIsLoading(false); // Indicar que la carga ha finalizado correctamente
            console.log("Token válido");
          } else {
            setIsAuthenticated(false);
            setIsLoading(false); // Indicar que la carga ha finalizado, aunque no se autentique
            history.push("/auth/signin"); // Redirigir si el token no es válido
          }
        } catch (error) {
          console.error("Error al validar token:", error);
          setIsAuthenticated(false);
          setIsLoading(false); // Manejar errores de validación
          if (history) {
            history.push("/auth/signin"); // Manejar errores de validación si history está definido
          }
        }
      } else {
        setIsAuthenticated(false);
        setIsLoading(false); // Indicar que la carga ha finalizado, aunque no haya token
      }
    };

    checkAuthentication();
  }, [history]);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    if (history) {
      history.push("/auth/signin");
    }
  };

  // Mostrar carga hasta que se verifique la autenticación
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
