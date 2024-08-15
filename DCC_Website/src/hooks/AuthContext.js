import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para carga inicial
  const history = useHistory();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:4000/validateToken", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const decodedToken = jwtDecode(token);
            setIsAuthenticated(true);
            setUserRole(decodedToken.rol_id); // Establecer el rol del usuario
            setIsLoading(false); // Indicar que la carga ha finalizado correctamente
          } else {
            setIsAuthenticated(false);
            setUserRole(null);
            setIsLoading(false); // Indicar que la carga ha finalizado, aunque no se autentique
            history.push("/auth/signin"); // Redirigir si el token no es válido
          }
        } catch (error) {
          console.error("Error al validar token:", error);
          setIsAuthenticated(false);
          setUserRole(null);
          setIsLoading(false); // Manejar errores de validación
          if (history) {
            history.push("/auth/signin"); // Manejar errores de validación si history está definido
          }
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
        setIsLoading(false); // Indicar que la carga ha finalizado, aunque no haya token
      }
    };

    checkAuthentication();
  }, [history]);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserRole(null);
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
      value={{
        isAuthenticated,
        userRole,
        setIsAuthenticated,
        setUserRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
