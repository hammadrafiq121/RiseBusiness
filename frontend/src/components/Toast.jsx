import React from "react";
import "../toast.css";

const Toast = ({ message, isSuccess, isError }) => {
  return (
    <figure className="notification">
      <div className="notification__body">
        <div className="notification__description">
          <div
            className="icon__wrapper"
            style={{ backgroundColor: isError ? "#ff1e00" : "" }}
          >
            {isSuccess && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
            )}
            {isError && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            )}
          </div>
          {message}
        </div>
        {/* <button className="notification__button">close</button> */}
      </div>
      <div
        className="notification__progress"
        style={{
          background: isError
            ? "linear-gradient(to right, var(--toast-background), #ff1e00)"
            : "",
        }}
      ></div>
    </figure>
  );
};

export default Toast;
