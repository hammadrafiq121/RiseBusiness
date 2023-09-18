import React, { useState } from "react";
import "../style.css";
import logo from "../assets/logo 1.png";
import Logout from "./Logout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = ({ isDarkMode, toggleDarkMode }) => {
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCustomersDropdownOpen, setIsCustomersDropdownOpen] = useState(false);
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setIsCustomersDropdownOpen(false);
    }
  };

  const handleToggleCustomersDropdown = () => {
    setIsCustomersDropdownOpen(!isCustomersDropdownOpen);
  };
  const handleToggleCustomerDropdown = () => {
    setIsCustomerDropdownOpen(!isCustomerDropdownOpen);
  };

  return (
    <div
      className={`sidebar ${isSidebarOpen ? "close" : ""} ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Header */}
      <header>
        <div className="image-text">
          <span className="image">
            <img src={logo} alt="Logo" />
          </span>
          <div className="text logo-text">
            <span className="name">{user.fullName}</span>
            <span className="profession">{user.userRole}</span>
          </div>
        </div>
        <i
          className="bx bx-chevron-right toggle"
          onClick={handleToggleSidebar}
        ></i>
      </header>

      {/* Sidebar menu */}
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            {/* Dashboard link */}
            <li className="nav-link">
              <Link to="/" title="Click to Go Dashborad">
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Dashboard</span>
              </Link>
            </li>

            {/* Customers dropdown */}
            {user &&
              (user.userRole === "admin" ||
                user.userRole === "manager" ||
                user.userRole === "agent") && (
                <div className="nav-dropdown">
                  <div
                    className="nav-link-with-dropdown nav-link1  "
                    onClick={handleToggleCustomersDropdown}
                  >
                    <i className="bx bx-bar-chart-alt-2 icon"></i>
                    <span className="text nav-text txt">Customers</span>
                    <i
                      className={`bx ${
                        isCustomersDropdownOpen
                          ? "bx-chevron-up"
                          : "bx-chevron-down"
                      }`}
                    ></i>
                  </div>
                  <dl
                    className={`dropdown-list ${
                      isCustomersDropdownOpen ? "open" : ""
                    } ${isSidebarOpen ? "" : "dropdown-ul-closed"}`}
                  >
                    <li>
                      <Link
                        to="/customers"
                        title="Click to View Customers List"
                      >
                        <i className="bx bx-user icon"></i>
                        <span className="text nav-text">Customers</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/addcustomers " title="Click to Add Customers">
                        <i className="bx bx-store icon"></i>
                        <span className="text nav-text">Add</span>
                      </Link>
                    </li>
                    {user && user.userRole === "admin" && (
                      <li className="nav-link">
                        <Link
                          to="/customers/upload"
                          title="Click to Upload File"
                        >
                          <i className="bx bxs-file-doc icon"></i>{" "}
                          <span className="text nav-text">Upload</span>
                        </Link>
                      </li>
                    )}
                  </dl>
                </div>
              )}

            {/* Upload link (for admin only) */}
            {/* {(user && user.userRole === "admin") && (
                <li className="nav-link">
                  <Link to="/customers/upload" title="Click to Upload File" >
                    <i className="bx bxs-file-doc icon"></i>{" "}
                    <span className="text nav-text">Upload File</span>
                  </Link>
                </li>
              )} */}

            {/* Admin-specific menu items */}
            {/* {(user && user.userRole === "admin") && ( */}
            {user && user.userRole === "admin" && (
              <div className="nav-dropdowna">
                <div
                  className="nav-link-with-dropdown nav-link1"
                  onClick={handleToggleCustomerDropdown}
                >
                  <i className="bx bxs-user icon"></i>
                  <span className="text nav-text txt">User </span>
                  <i
                    className={`bx ${
                      isCustomerDropdownOpen
                        ? "bx-chevron-up"
                        : "bx-chevron-down"
                    }`}
                  ></i>
                </div>
                <ul
                  className={`dropdown-list ${
                    isCustomerDropdownOpen ? "open" : ""
                  } ${isSidebarOpen ? "" : "dropdown-ul-closed"}`}
                >
                  <li>
                    <Link to="/signup" title="Click to Add User">
                      <i className="bx bx-user icon"></i>
                      <span className="text nav-text">Add </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" title="Click to view user list">
                      <i className="bx bx-store icon"></i>
                      <span className="text nav-text">Users</span>
                    </Link>
                  </li>
                </ul>
                <li className="nav-link">
                  <Link to="/status" title="Stutus list">
                    <i className="bx bx-analyse icon"></i>
                    <span className="text nav-text">Status</span>
                  </Link>
                </li>
                <li className="nav-link">
                  <Link to="/product" title="Stutus list">
                    <i className="bx bx-analyse icon"></i>
                    <span className="text nav-text">Products</span>
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>

        {/* Logout and Dark Mode */}
        <div className="bottom-content">
          <li className="nav-link">
            <Link to="/Viewprofile" title="Click to view Profile">
              <i className="bx bxs-user-account icon"></i>{" "}
              <span className="text nav-text">Profile</span>
            </Link>
          </li>

          <Link to="/login" title="Click to Logout">
            <Logout />
          </Link>

          <li className="mode" onClick={toggleDarkMode}>
            <div className="sun-moon">
              <i className={`bx ${isDarkMode ? "bx-moon" : "bx-sun"} icon`}></i>
            </div>
            {/* <span className="mode-text text">
                {isDarkMode ? "Light mode" : "Dark mode"}
              </span> */}

            <div className="toggle-switch">
              <span className={`switch ${isDarkMode ? "dark" : ""}`}></span>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
