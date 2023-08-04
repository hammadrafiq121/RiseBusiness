import React, { useEffect } from "react";

import { logout } from "../app/reducers/authSlice";
import { reset } from "../app/reducers/customerSlice";
import { useNavigate } from "react-router-dom";
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
    <button className="btn" onClick={handleLogout}>
      <BoxArrowInLeft className="mr-2" /> Logout
    </button>
  );
};

export default Logout;
