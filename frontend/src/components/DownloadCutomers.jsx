import React, { useRef } from "react";
import { Button } from "react-bootstrap";

const DownloadCutomers = ({ data }) => {
  const downloadLinkRef = useRef(null);

  const handleDownload = () => {
    try {
      const csvData = generateCSV(data);
      const blob = new Blob([csvData], { type: "text/csv" });

      // Set the href and download attributes of the anchor element
      downloadLinkRef.current.href = window.URL.createObjectURL(blob);
      downloadLinkRef.current.download = "customersData.csv";

      // Trigger a click event on the anchor element
      downloadLinkRef.current.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const generateCSV = (data) => {
    // Check if data is not empty, undefined, or null
    if (!data || data.length === 0) {
      console.error("No data to generate CSV");
      return "";
    }

    const requiredColumns = [
      "companyName",
      "companyPhone",
      "companyFax",
      "companyAddress",
      "country",
      "state",
      "city",
      "zipCode",
      "personName",
      "personPhone",
      "personEmail",
    ];

    // Create a header line
    const headers = requiredColumns.join(",");

    // Create lines for each data entry
    const lines = data.map((entry) =>
      requiredColumns.map((column) => `"${entry[column]}"`).join(",")
    );

    // Combine headers and data lines
    return `${headers}\n${lines.join("\n")}`;
  };

  return (
    <>
      <a ref={downloadLinkRef} style={{ display: "none" }} />
      <Button variant="secondary" onClick={handleDownload}>
        Download Customers
      </Button>
    </>
  );
};

export default DownloadCutomers;
