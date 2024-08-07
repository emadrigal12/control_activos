import { useState } from "react";

const useReportData = (reportUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateReport = async (type, startDate, endDate, project) => {
    setLoading(true);
    setError(null);
    // JWT del localStorage
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${reportUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          startDate,
          endDate,
          project
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const fileName = `report_${type}_${project}_${startDate}_${endDate}.${type}`;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setLoading(false);
      return true; 
    } catch (error) {
      setLoading(false);
      setError(error.message);
      return false; 
    }
  };

  return { loading, error, generateReport };
};

export default useReportData;