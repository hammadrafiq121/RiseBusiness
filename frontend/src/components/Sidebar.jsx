import React, { useState } from "react";
import "../style.css";
import logo from "../assets/logo 1.png";
import Logout from "./Logout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = ({ isDarkMode, toggleDarkMode }) => {
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCustomersDropdownOpen, setIsCustomersDropdownOpen] = useState(false);
  const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);
  const [isTasksDropdownOpen, setIsTasksDropdownOpen] = useState(false);

  const admin = user && user.userRole === "admin";
  const manager = user && user.userRole === "manager";
  const agent = user && user.userRole === "agent";

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setIsCustomersDropdownOpen(false);
    }
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
            <img src={logo} alt="Logo" className="img" />
          </span>
          <div className="text logo-text">
            <span className="name">{user.fullName}</span>
            <span className="profession">{user.userRole}</span>
          </div>
        </div>
        <i
          // className="bx bx-chevron-right toggle"
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
            {(agent || manager || admin) && (
              <div className="nav-dropdown">
                <div
                  className="nav-link-with-dropdown nav-link1  "
                  onClick={() =>
                    setIsCustomersDropdownOpen(!isCustomersDropdownOpen)
                  }
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
                    <Link to="/customers" title="Click to View Customers List">
                      <i className="bx bx-user icon"></i>
                      <span className="text nav-text">Customers</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/leads" title="Click to View Leads">
                      <i className="bx bx-user icon"></i>
                      <span className="text nav-text">Leads</span>
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
                      <Link to="/customers/upload" title="Click to Upload File">
                        <i className="bx bxs-file-doc icon"></i>{" "}
                        <span className="text nav-text">Upload</span>
                      </Link>
                    </li>
                  )}
                </dl>
              </div>
            )}

            {/* Admin-specific menu items */}
            {/* {(user && user.userRole === "admin") && ( */}
            {(manager || admin) && (
              <div className="nav-dropdowna">
                <div
                  className="nav-link-with-dropdown nav-link1"
                  onClick={() => setIsUsersDropdownOpen(!isUsersDropdownOpen)}
                >
                  <i className="bx bxs-user icon"></i>
                  <span className="text nav-text txt">User </span>
                  <i
                    className={`bx ${
                      isUsersDropdownOpen ? "bx-chevron-up" : "bx-chevron-down"
                    }`}
                  ></i>
                </div>
                <ul
                  className={`dropdown-list ${
                    isUsersDropdownOpen ? "open" : ""
                  } ${isSidebarOpen ? "" : "dropdown-ul-closed"}`}
                >
                  <li>
                    <Link to="/signup" title="Click to Add User">
                      <i className="bx bx-user icon"></i>
                      <span className="text nav-text">Add </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/agents" title="Click to view user list">
                      <i className="bx bx-store icon"></i>
                      <span className="text nav-text">Agents</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/managers" title="Click to view user list">
                      <i className="bx bx-store icon"></i>
                      <span className="text nav-text">Managers</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {admin && (
              <div className="nav-dropdowna">
                <div
                  className="nav-link-with-dropdown nav-link1"
                  onClick={() => setIsTasksDropdownOpen(!isTasksDropdownOpen)}
                >
                  <i className="bx bxs-user icon"></i>
                  <span className="text nav-text txt">Tasks </span>
                  <i
                    className={`bx ${
                      isTasksDropdownOpen ? "bx-chevron-up" : "bx-chevron-down"
                    }`}
                  ></i>
                </div>
                <ul
                  className={`dropdown-list ${
                    isTasksDropdownOpen ? "open" : ""
                  } ${isSidebarOpen ? "" : "dropdown-ul-closed"}`}
                >
                  <li>
                    <Link to="/addtask" title="Click to Add Task">
                      <i className="bx bx-user icon"></i>
                      <span className="text nav-text">Add </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/tasks" title="Click to view Tasks">
                      <i className="bx bx-store icon"></i>
                      <span className="text nav-text">Tasks</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            {admin && (
              <div className="nav-dropdowna">
                <li className="nav-link">
                  <Link to="/status" title="Stutus list">
                    <i className="bx bx-analyse icon"></i>
                    <span className="text nav-text">Status</span>
                  </Link>
                </li>
                <li className="nav-link">
                  <Link to="/product" title="Stutus list">
                    <i className="bx bxl-product-hunt icon"></i>
                    <span className="text nav-text">Products</span>
                  </Link>
                </li>
                <li className="nav-link">
                  <Link to="/taskCategory" title="Stutus list">
                    <i className="bx bx-analyse icon"></i>
                    <span className="text nav-text">Task Category</span>
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>

        {/* Logout and Dark Mode */}
        <div className="bottom-content">
          <Link to="/login" title="Click to Logout">
            <Logout />
          </Link>

          <li className="mode" onClick={toggleDarkMode}>
            <div className="sun-moon">
              <i className={`bx ${isDarkMode ? "bx-moon" : "bx-sun"} icon`}></i>
            </div>
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
