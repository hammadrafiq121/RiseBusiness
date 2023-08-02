import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Users from "./components/Users";
import EditUser from "./components/EditUser";
import AddCustomer from "./components/AddCustomer";
import Customers from "./components/Customers";
import EditCustomer from "./components/EditCustomer";
import UploadCSV from "./components/UploadCSV";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      {user ? (
        // If user is logged in, render authenticated routes
        <div>
          <Sidebar />
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addCustomers" element={<AddCustomer />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/editCustomer/:id" element={<EditCustomer />} />
            <Route path="/uploadCSV" element={<UploadCSV />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/editUser/:id" element={<EditUser />} />
          </Routes>
          <ToastContainer />
        </div>
      ) : (
        // If user is not logged in, render the Login route
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
