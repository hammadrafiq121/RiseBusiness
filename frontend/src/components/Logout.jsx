import React, { useEffect } from "react";

import { logout } from "../app/reducers/authSlice";
import { reset } from "../app/reducers/customerSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BoxArrowInLeft } from "react-bootstrap-icons";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      toast.loading(message);
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }

    if (isSuccess) {
      toast.dismiss();
      toast.success(message);
    }
  }, [isSuccess, isError, message, isLoading]);

  const handleLogout = async () => {
    await dispatch(logout());
    if (isSuccess) {
      await dispatch(reset());
    }
    navigate("/login");
  };
  return (
  
  //   <ul>
  //    <li onClick={handleLogout} className="nav-link">
  //    <Link to="">
  //      <i className="bx bxs-file-doc icon"></i>
  //      <span className="text nav-text">Logout</span>
  //    </Link>
  //  </li>
  //  </ul>
    <span  onClick={handleLogout}>
      <li className="nav-link ">
      <Link  to="/login" >  
    <i className="bx bx-log-out icon"></i>
      <span className="text nav-text ">Logout
    </span>
    </Link>
      </li>
    </span>
    
  );
};

export default Logout;
