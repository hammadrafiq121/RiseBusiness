import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import EditCustomer from "./components/EditCustomer";
import AddCustomer from "./components/AddCustomer";
import Customers from "./components/Customers";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import UploadCSV from "./components/UploadCSV";
import Users from "./components/Users";
import EditUser from "./components/EditUser";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Test from "./components/Test";

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
              <Route path="/customers" element={<Customers />} />
              <Route path="/addCustomers" element={<AddCustomer />} />
              <Route path="/uploadCSV" element={<UploadCSV />} />
              <Route
                path="/customers/editCustomer/:id"
                element={<EditCustomer />}
              />
              {user && (
                <>
                  <Route
                    path="/customers/upload"
                    element={
                      user.userRole === "admin" ? (
                        <UploadCSV />
                      ) : (
                        <Navigate to="/test" />
                      )
                    }
                  />

                  <Route
                    path="/users"
                    element={
                      user.userRole === "admin" ? (
                        <Users />
                      ) : (
                        <Navigate to="/test" />
                      )
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      user.userRole === "admin" ? (
                        <Signup />
                      ) : (
                        <Navigate to="/test" />
                      )
                    }
                  />
                </>
              )}

              <Route
                path="/customers/editCustomer/:id"
                element={<EditCustomer />}
              />
              <Route path="/login" element={<Login />} />

              {/* <Route path="/users" element={<Users />} /> */}
              <Route path="/users/editUser/:id" element={<EditUser />} />
              <Route path="/*" element="404 Not Found" />
              {/* Other routes for logged-in users */}
            </>
          ) : (
            <>
              {/* If the user is not logged in */}
              <Route path="/*" element={<Login />} />
              {/* Redirect to login page if trying to access other routes */}
              {/* <Route path="/dashboard" element={<Navigate to="/" />} />
              <Route path="/addCustomers" element={<Navigate to="/" />} />
              <Route path="/customers" element={<Navigate to="/" />} /> */}
              {/* <Route
                path="/customers/editCustomer/:id"
                element={<Navigate to="/" />}
              />
              <Route path="/uploadCSV" element={<Navigate to="/" />} /> */}

              {/* Other restricted routes */}
            </>
          )}
          {/* <Route path="/signup" element={<Signup />} /> */}
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
