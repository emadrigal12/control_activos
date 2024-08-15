import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

const useSignIn = () => {
  const history = useHistory();
  const { setIsAuthenticated, setUserRole } = useContext(AuthContext);

  // Estados para el correo, contraseña y mensajes de error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  // Expresión regular para validar el formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Función para validar los campos de correo y contraseña
  const handleValidation = () => {
    let isValid = true;
    setGeneralError("");

    // Validación del campo de correo
    if (!email) {
      setEmailError("El correo electrónico es requerido");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("El correo electrónico no es válido");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validación del campo de contraseña
    if (!password) {
      setPasswordError("La contraseña es requerida");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  // Función para manejar el inicio de sesión
  const handleSignIn = async () => {
    if (handleValidation()) {
      setGeneralError("");
      const data = {
        username: email,
        password: password,
      };

      try {
        const response = await fetch("http://localhost:4000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result.message && result.message === "Invalid user") {
          setGeneralError("Correo o contraseña incorrectos");
        } else {
          console.log("Inicio de sesión exitoso");

          // Almacenar el token en localStorage
          localStorage.setItem("token", result.token);
          const decodedToken = jwtDecode(result.token);
          setIsAuthenticated(true);
          setUserRole(result.rol_id);

          history.push("/admin/inicio");
        }
      } catch (error) {
        console.error("Error en la solicitud de inicio de sesión:", error);
        setGeneralError("Error en la solicitud de inicio de sesión");
      }
    }
  };

  // Retorno de estados y funciones necesarias para el componente SignIn
  return {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    handleSignIn,
    generalError,
  };
};

export default useSignIn;
