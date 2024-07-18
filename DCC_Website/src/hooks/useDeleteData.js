import { useState } from "react";

const useDeleteData = (deleteUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteItem = async (id) => {
    setLoading(true);
    setError(null);
    // JWT del localStorage
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${deleteUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setLoading(false);
      return true; // Éxito en la eliminación
    } catch (error) {
      setLoading(false);
      setError(error.message);
      return false; // Error en la eliminación
    }
  };

  return { loading, error, deleteItem };
};

export default useDeleteData;
