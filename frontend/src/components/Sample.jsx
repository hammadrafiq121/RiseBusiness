// import React, { useState } from "react";
// import axios from "axios";

// function Sample() {
//   const addStatus = async (comments) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3000/api/samples/add`,
//         { comments }
//       );
//       return response.data;
//     } catch (error) {
//       console.log(`Error while calling add sample api ${error}`);
//       return error;
//     }
//   };

//   return <div>Hello</div>;
// }

// export default Sample;

import React from "react";
import "../check.css";

const Sample = () => {
  return (
    <figure className="notification">
      <div className="notification__body">
        <div className="notification__description">
          <div className="icon__wrapper">
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
          </div>
          Report is saved!
        </div>
        <button className="notification__button">Edit report</button>
      </div>
      <div className="notification__progress"></div>
    </figure>
  );
};

export default Sample;
