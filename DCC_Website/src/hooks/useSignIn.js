import { useState } from "react";
import { useHistory } from "react-router-dom";

const useSignIn = () => {
  const history = useHistory();

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
  const handleSignIn = () => {
    if (handleValidation()) {
      setGeneralError("");
      // Aquí iría la lógica real para iniciar sesión, este es un ejemplo:
      let response = true; // Simulación de respuesta
      if (response) {
        console.log("Iniciando sesión con:");
        console.log("Correo:", email);
        console.log("Contraseña:", password);
        console.log("Inicio de sesión exitoso");
        history.push("/dashboard");
      } else {
        console.log("Error al iniciar sesión");
        setGeneralError("Correo o contraseña incorrectos");
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
