import React, { useState } from "react";
import { Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import DeleteConfirmation from "./DeleteConfirmation";
import { useDispatch } from "react-redux";
import { deleteTasks } from "../app/reducers/taskSlice.js";

const DeleteTasks = ({ selectedTasks }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    // Perform deletion logic here
    await dispatch(deleteTasks(selectedTasks));

    // Close the modal
    setShowDeleteModal(false);
  };

  return (
    <span>
      <Button
        variant="secondary"
        type="button"
        onClick={() => setShowDeleteModal(true)} // Open the modal on button click
        disabled={selectedTasks.length === 0}
      >
        Delete Tasks
      </Button>

      <DeleteConfirmation
        showModal={showDeleteModal}
        hideModal={() => setShowDeleteModal(false)}
        confirmModal={handleDelete}
        ids={selectedTasks}
        type="tasks"
        message="Are you sure you want to delete these task? if you selected all without filters, it might contain other tasks in pagination."
      />
    </span>
  );
};

export default DeleteTasks;
