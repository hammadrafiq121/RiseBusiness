import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddCustomer from "./components/AddCustomer";
import Customers from "./components/Customers";
import EditCustomer from "./components/EditCustomer";
import UploadCSV from "./components/UploadCSV";

function App() {
  const { user } = useSelector((state) => state.auth);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
 
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? "dark" : ""}`}>
      <BrowserRouter>
        {user && (
          <Sidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        )}
        {user && (
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        )}

        <Routes>
          {user ? (
            <>
              {/* If the user is logged in */}
              <Route path="/" element={<Dashboard isDarkMode={isDarkMode} />} />
              <Route path="/addCustomers" element={<AddCustomer />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/editCustomer/:id" element={<EditCustomer />} />
              <Route path="/uploadCSV" element={<UploadCSV />} />

              {/* Other routes for logged-in users */}
            </>
          ) : (
            <>
              {/* If the user is not logged in */}
              <Route path="/" element={<Login />} />
              {/* Redirect to login page if trying to access other routes */}
              <Route path="/dashboard" element={<Navigate to="/" />} />
              <Route path="/addCustomers" element={<Navigate to="/" />} />
              <Route path="/customers" element={<Navigate to="/" />} />
              <Route path="/customers/editCustomer/:id" element={<Navigate to="/" />} />
              <Route path="/uploadCSV" element={<Navigate to="/" />} />

              {/* Other restricted routes */}
            </>
          )}
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
