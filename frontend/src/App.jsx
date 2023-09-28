import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

// Import components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Import routes
import Dashboard from "./components/Dashboard";
import Status from "./components/Status";
import Product from "./components/Product";
import Sample from "./components/Sample";
import NotFound from "./components/NotFound";
import PermissionDenied from "./components/PermissionDenied";

// Auth routes
import Login from "./components/Login";
import Signup from "./components/Signup";

// Customer routes
import Customers from "./components/Customers";
import AddCustomer from "./components/AddCustomer";
import EditCustomer from "./components/EditCustomer";
import UploadCSV from "./components/UploadCSV";
import Viewprofile from "./components/Viewprofile";

// User routes
import Users from "./components/Users";
import EditUser from "./components/EditUser";

function App() {
  const { user } = useSelector((state) => state.auth);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const isUserAdmin = user && user.userRole === "admin";

  return (
    <div className={`app ${isDarkMode ? "dark" : ""}`}>
      <BrowserRouter>
        {user && (
          <>
            <Sidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          </>
        )}

        <Routes>
          {user ? (
            <>
              {/* Dashboard */}
              <Route path="/" element={<Dashboard isDarkMode={isDarkMode} />} />

              {/* Status and Product */}
              <Route path="/status" element={<Status />} />
              <Route path="/product" element={<Product />} />

              {/* Sample */}
              <Route path="/sample" element={<Sample />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Navigate to="/" />} />
              <Route
                path="/signup"
                element={isUserAdmin ? <Signup /> : <Navigate to="/403" />}
              />

              {/* Customer Routes */}
              <Route path="/customers" element={<Customers />} />
              <Route path="/addCustomers" element={<AddCustomer />} />
              <Route path="/viewprofile" element={<Viewprofile />} />
              <Route
                path="/customers/editCustomer/:id"
                element={<EditCustomer />}
              />
              <Route
                path="/customers/upload"
                element={isUserAdmin ? <UploadCSV /> : <Navigate to="/403" />}
              />

              {/* User Routes */}
              <Route
                path="/users"
                element={isUserAdmin ? <Users /> : <Navigate to="/403" />}
              />
              <Route path="/users/editUser/:id" element={<EditUser />} />
              <Route path="/403" element={<PermissionDenied />} />
              <Route path="/*" element={<NotFound />} />
            </>
          ) : (
            <>
              {/* Login */}
              <Route path="/login" element={<Login />} />

              {/* Default Redirect */}
              <Route path="/*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>

        {/* Toast Notifications */}
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
