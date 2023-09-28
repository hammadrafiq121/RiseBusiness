import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reset as resetCustomer } from "../app/reducers/customerSlice.js";
import { reset as resetStatus } from "../app/reducers/statusSlice.js";
import { reset as resetProduct } from "../app/reducers/productSlice.js";
import { reset as resetUsers } from "../app/reducers/userSlice.js";
import { logout } from "../app/reducers/authSlice.js";

const Logout = () => {
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
  }, [isSuccess, isError, isLoading]);

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
    <span onClick={handleLogout}>
      <li className="nav-link ">
        <Link to="/login">
          <i className="bx bx-log-out icon"></i>
          <span className="text nav-text ">Logout</span>
        </Link>
      </li>
    </span>
  );
};

export default Logout;
