import React, { useState } from "react";
import "../style.css";
import logo from "../assets/logo 1.png";
import Logout from "./Logout";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import {  useNavigate } from "react-router-dom";
// import { reset, logout } from "../app/reducers/authSlice";

const Sidebar = ({ isDarkMode, toggleDarkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCustomersDropdownOpen, setIsCustomersDropdownOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const handleModeSwitch = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  const handleToggleCustomersDropdown = () => {
    setIsCustomersDropdownOpen(!isCustomersDropdownOpen);
  };

  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   dispatch(logout());
  //   dispatch(reset());
  //   navigate("/");
  // };

  return (
    <div
      className={`sidebar ${isSidebarOpen ? "close" : ""} ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <header>
        <div className="image-text">
          <span className="image">
            <img src={logo} alt="" />
          </span>

          <div className="text logo-text">
            <span className="name">Rise Business Solution</span>
            <span className="profession">Super Admin</span>
          </div>
        </div>

        <i
          className="bx bx-chevron-right toggle"
          onClick={handleToggleSidebar}
        ></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <Link to="/">
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Dashboard</span>
              </Link>
            </li>

            <li className="nav-link">
              <div className="nav-dropdown">
                <div
                  className="nav-link-with-dropdown"
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
              </div>
            </li>
            <li>
              <Link to="/customers">
                <i className="bx bx-user icon"></i>
                <span className="text nav-text">Customer List</span>
              </Link>
            </li>
            <li>
              <Link to="/addcustomers">
                <i className="bx bx-store icon"></i>
                <span className="text nav-text">Add Customers</span>
              </Link>
            </li>
            {/* Add more dropdown items as needed */}
            <li className="nav-link">
              <Link to="/customers/upload">
                <i className="bx bxs-file-doc icon"></i>{" "}
                <span className="text nav-text">Upload File</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/signup">
              <i class="bx bxs-user-plus icon"></i>{" "}
                <span className="text nav-text">Add User</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/users">
              <i class='bx bx-list-ul icon' ></i>{" "}
                <span className="text nav-text">User List</span>  
              </Link>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          {/* {user ? (
            <>
              <li>
                <button className="btn-2">
                  <i className="bx bx-log-out icon"></i>
                  <span className="text nav-text ">Logout</span>
                </button>
              </li>
            </>
          ) : (
            <></>
          )} */}
      
            
        

          <li className="nav-link">
              <Link to="/login">
                <i className="bx bx-log-out icon"></i>
                <Logout />
                {/* <span className="text nav-text">Logout</span> */}
              </Link>
            </li>

          <li className="mode" onClick={toggleDarkMode}>
            <div className="sun-moon">
              <i className={`bx ${isDarkMode ? "bx-moon" : "bx-sun"} icon`}></i>
            </div>
            <span className="mode-text text">
              {isDarkMode ? "Light mode" : "Dark mode"}
            </span>

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

{
  /* {user ? (
              <>
              
                   <li>
            <button className="btn-2" onClick={handleLogout}>
              <i className="bx bx-log-out icon"></i>
              <span className="text nav-text "  >Logout</span>
            </button>
          </li>
              </>
            ) : (
              <>
              
               
              </>
            )} */
}

{
  /* <li className="nav-link">
              <Link to="#">
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Notification</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="#">
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Notification</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="#">
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Notification</span>
              </Link>
            </li> */
}

{
  /* Other menu items... */
}
// {/* <li className="nav-link">
// <Link to="">
//   {/* <i class="bx bx-log-out icon"></i> */}
//   <Logout />
// </Link>
// </li> */}