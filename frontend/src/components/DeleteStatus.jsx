import React from "react";
import { Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { deleteStatus } from "../app/reducers/statusSlice.js";
import statusApi from "../services/statusApi.jsx";
import { useDispatch } from "react-redux";

const DeleteStatus = ({ status }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await statusApi.deleteStatus(status._id);
    await dispatch(deleteStatus(status._id));
  };

  return (
    <Button variant="link" className="symbol-button" onClick={handleDelete}>
      <Trash />
    </Button>
  );
};

export default DeleteStatus;
