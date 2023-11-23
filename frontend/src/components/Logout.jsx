import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset as resetCustomer } from "../app/reducers/customerSlice.js";
import { reset as resetStatus } from "../app/reducers/statusSlice.js";
import { reset as resetProduct } from "../app/reducers/productSlice.js";
import { reset as resetUsers } from "../app/reducers/userSlice.js";
import { logout } from "../app/reducers/authSlice.js";
import Toast from "./Toast";
import Spinner from "./Spinner";

const Logout = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const handleLogout = async () => {
    const result = await dispatch(logout());
    if (result.meta.requestStatus === "fulfilled") {
      await dispatch(resetCustomer());
      await dispatch(resetProduct());
      await dispatch(resetStatus());
      await dispatch(resetUsers());
    }
  };

  return (
    <main>
      <span onClick={handleLogout}>
        <li className="nav-link ">
          <Link to="/login">
            <i className="bx bx-log-out icon"></i>
            <span className="text nav-text ">Logout</span>
          </Link>
        </li>
      </span>
      {isLoading && <Spinner />}
      {isSuccess && <Toast isSuccess={isSuccess} message={message} />}
      {isError && <Toast isError={isError} message={message} />}
    </main>
  );
};

export default Logout;
