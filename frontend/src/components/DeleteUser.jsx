import React from "react";
import { Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { deleteUser } from "../app/reducers/userSlice.js";
import { useDispatch } from "react-redux";

const DeleteUser = ({ user }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(deleteUser(user._id));
  };

  return (
    <Button variant="link" className="symbol-button" onClick={handleDelete}>
      <Trash />
    </Button>
  );
};

export default DeleteUser;
