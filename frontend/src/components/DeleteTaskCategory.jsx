import React from "react";
import { Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { deleteTaskCategory } from "../app/reducers/taskCategorySlice.js";
import { useDispatch } from "react-redux";

const DeleteTaskCategory = ({ taskCategory }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteTaskCategory(taskCategory._id));
  };

  return (
    <Button variant="link" className="symbol-button" onClick={handleDelete}>
      <Trash />
    </Button>
  );
};

export default DeleteTaskCategory;
