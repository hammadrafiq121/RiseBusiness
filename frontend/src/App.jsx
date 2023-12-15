import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./style.css";
import Toast from "./components/Toast";
import { useSelector } from "react-redux";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import EditTask from "./components/EditTask";

// Import components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Import routes
import Dashboard from "./components/Dashboard";
import Status from "./components/Status";
import TaskCategory from "./components/TaskCategory";
import Product from "./components/Product";
import NotFound from "./components/NotFound";
import PermissionDenied from "./components/PermissionDenied";

// Auth routes
import Login from "./components/Login";
import Signup from "./components/Signup";

// Customer routes
import Customers from "./components/Customers";
import Leads from "./components/Leads";
import AddCustomer from "./components/AddCustomer";
import EditCustomer from "./components/EditCustomer";
import UploadCSV from "./components/UploadCSV";
import Viewprofile from "./components/Viewprofile";

// User routes
import Agents from "./components/Agents";
import Managers from "./components/Managers";
import EditUser from "./components/EditUser";

function App() {
  // Add this code in your main application file

  // Event listener for the 'logout' event
  window.addEventListener("storage", (event) => {
    if (event.key === "logoutEvent") {
      // Perform actions when logout event is detected
      // For example, clear user data and reload the page
      localStorage.removeItem("user");
      window.location.reload(1);
    }
  });

  // Other setup for your React app...

  const { user } = useSelector((state) => state.auth);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const isUserAdmin = user && user.userRole === "admin";
  const isUserManager = user && user.userRole === "manager";

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

              {/* Status , taskCategory and Product */}
              <Route
                path="/status"
                element={isUserAdmin ? <Status /> : <Navigate to="/403" />}
              />
              <Route
                path="/taskCategory"
                element={
                  isUserAdmin ? <TaskCategory /> : <Navigate to="/403" />
                }
              />
              <Route
                path="/product"
                element={isUserAdmin ? <Product /> : <Navigate to="/403" />}
              />

              {/* Auth Routes */}
              <Route path="/login" element={<Navigate to="/" />} />
              <Route
                path="/signup"
                element={
                  isUserAdmin || isUserManager ? (
                    <Signup />
                  ) : (
                    <Navigate to="/403" />
                  )
                }
              />

              {/* Customer Routes */}
              <Route path="/customers" element={<Customers />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/addCustomers" element={<AddCustomer />} />
              <Route path="/viewprofile" element={<Viewprofile />} />
              <Route
                path="/customers/editCustomer/:id"
                element={<EditCustomer />}
              />
              <Route
                path="/customers/upload"
                element={
                  isUserAdmin || isUserManager ? (
                    <UploadCSV />
                  ) : (
                    <Navigate to="/403" />
                  )
                }
              />

              {/* User Routes */}
              <Route
                path="/agents"
                element={
                  isUserAdmin || isUserManager ? (
                    <Agents />
                  ) : (
                    <Navigate to="/403" />
                  )
                }
              />
              <Route path="/users/editUser/:id" element={<EditUser />} />

              <Route
                path="/managers"
                element={
                  isUserAdmin || isUserManager ? (
                    <Managers />
                  ) : (
                    <Navigate to="/403" />
                  )
                }
              />

              {/* Task Routes */}
              <Route
                path="/addtask"
                element={
                  isUserAdmin || isUserManager ? (
                    <AddTask />
                  ) : (
                    <Navigate to="/403" />
                  )
                }
              />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/editTask/:id" element={<EditTask />} />
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
      </BrowserRouter>
    </div>
  );
}

export default App;
