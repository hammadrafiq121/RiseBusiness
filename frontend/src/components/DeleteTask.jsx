import React, { useState } from "react";
import { Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import DeleteConfirmation from "./DeleteConfirmation";
import { useDispatch } from "react-redux";
import { deleteTask } from "../app/reducers/taskSlice.js";

const DeleteTask = ({ task }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    // Perform deletion logic here
    await dispatch(deleteTask(task._id));
    // Close the modal
    setShowDeleteModal(false);
  };

  return (
    <span>
      <Button
        variant="link"
        className="symbol-button"
        onClick={() => setShowDeleteModal(true)}
      >
        <Trash />
      </Button>

      <DeleteConfirmation
        showModal={showDeleteModal}
        hideModal={() => setShowDeleteModal(false)}
        confirmModal={handleDelete}
        id={task._id}
        type="task"
        message="Are you sure you want to delete this task?"
      />
    </span>
  );
};

export default DeleteTask;
