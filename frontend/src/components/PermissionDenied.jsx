import React from "react";
import "../style.css";

const PermissionDeniedPage = () => {
  return (
    <div className="permission-denied-container">
      <div className="error-code">403</div>
      <div className="error-message">Permission Denied</div>
      <p className="error-description">
        Sorry, you do not have permission to access this page.
      </p>
    </div>
  );
};

export default PermissionDeniedPage;
