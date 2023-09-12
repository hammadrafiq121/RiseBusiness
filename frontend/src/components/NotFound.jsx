import React from 'react';
import "../style.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="error-code">404 </div>
      <div className="error-message">Page Not Found</div>
      <div className="error-description">
        The page you are looking for might have been removed or is temporarily unavailable.
      </div>
      <div className="background-circle"></div>
    </div>
  );
};

export default NotFoundPage;
