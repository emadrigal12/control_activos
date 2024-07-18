import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Asegúrate de instalar esta dependencia

const useUserData = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const { id } = jwtDecode(token);
          setId(id);

          const response = await fetch(`http://localhost:4000/usuario/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Error al obtener los datos del usuario");
          }

          const data = await response.json();
          setUser(`${data.Nombre} ${data.Apellido}`);
          setUserData(data);
          console.log(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { user, id, loading, error, userData };
};

export default useUserData;
