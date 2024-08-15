// hooks/usePostData.js

import { useState } from "react";
import axios from "axios";

/**
 * Hook personalizado para manejar solicitudes POST.
 *
 * @param {string} url - La URL para la solicitud POST.
 * @returns {Object} - Un objeto con el resultado de la solicitud, errores y la función para hacer la solicitud POST.
 */
export function usePost(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Función para hacer la solicitud POST.
   *
   * @param {Object} body - El cuerpo de la solicitud POST.
   * @returns {boolean} - `true` si la solicitud es exitosa, `false` si ocurre un error.
   */
  const postData = async (body) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token aquí
        },
      });
      setData(response.data);
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postData };
}
