import React from "react";
import EditCustomer from "./components/EditCustomer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./style.css";
import AddCustomer from "./components/AddCustomer";
import Customers from "./components/Customers";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import UploadCSV from "./components/UploadCSV";
import { useSelector } from "react-redux";
import Users from "./components/Users";
import EditUser from "./components/EditUser";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <BrowserRouter>
        {user && <Sidebar />}{" "}
        {user && <Navbar />}{" "}
        {/* Only render Sidebar if user is authenticated */}
        
        <Routes>
          {user ? (
            // If the user is logged in, render the Sidebar component
            <Route path="/dashboard" element={<Dashboard />} />

          ):  (
            // If the user is not logged in, render the Login component
            <Route path="/" element={<Login />} />
          )}
          {/* <Route path="/" element={</ />} /> */}
          <Route path="/addCustomers" element={<AddCustomer />} />

          <Route path="/customers/addCustomers" element={<EditCustomer />} />
          <Route path="/uploadCSV" element={<UploadCSV />} />
          {user && (
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
          )}

          <Route
            path="/customers/editCustomer/:id"
            element={<EditCustomer />}
          />
          <Route path="/customers" element={<Customers />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/editUser/:id" element={<EditUser />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
