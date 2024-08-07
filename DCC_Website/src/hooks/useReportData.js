import { useState } from "react";

const useReportData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateReport = async (reportUrl, startDate, endDate, project) => {
    setLoading(true);
    setError(null);
    // JWT del localStorage
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(reportUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const fileExtension = reportUrl.endsWith("pdf") ? "pdf" : "xlsx";
      const fileName = `report_${new Date().toISOString()}.${fileExtension}`;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
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
