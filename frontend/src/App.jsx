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
import NotFound from "./components/NotFound";
import LogViewer from "./components/LogViewer";
import PermissionDenied from "./components/PermissionDenied";
import Viewprofile from "./components/Viewprofile";
import Status from "./components/Status";
import Product from "./components/Product";

// import Test from "./components/Test";

function App() {
  const { user } = useSelector((state) => state.auth);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const isUserAdmin = user && user.userRole === "admin";

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
          {/* If the user is logged in */}
          {user ? (
            <>
              <Route path="/status" element={<Status />} />
              <Route path="/product" element={<Product />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Navigate to="/" />} />
              <Route
                path="/signup"
                element={isUserAdmin ? <Signup /> : <Navigate to="/403" />}
              />

              {/* Customer Routes */}
              <Route path="/customers" element={<Customers />} />
              <Route path="/addCustomers" element={<AddCustomer />} />
              <Route path="/logViewer" element={<LogViewer />} />
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
              <Route path="/" element={<Dashboard isDarkMode={isDarkMode} />} />
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
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
