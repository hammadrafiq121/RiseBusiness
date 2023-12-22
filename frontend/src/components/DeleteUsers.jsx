import React, { useState } from "react";
import { Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import DeleteConfirmation from "./DeleteConfirmation";
import { useDispatch } from "react-redux";
import { deleteUsers } from "../app/reducers/userSlice.js";

const DeleteUsers = ({ selectedUsers }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    // Perform deletion logic here
    await dispatch(deleteUsers(selectedUsers));

    // Close the modal
    setShowDeleteModal(false);
  };

  return (
    <span>
      <Button
        variant="secondary"
        type="button"
        onClick={() => setShowDeleteModal(true)} // Open the modal on button click
        disabled={selectedUsers.length === 0}
      >
        Delete Users
      </Button>

      <DeleteConfirmation
        showModal={showDeleteModal}
        hideModal={() => setShowDeleteModal(false)}
        confirmModal={handleDelete}
        ids={selectedUsers}
        type="users"
        message="Are you sure you want to delete these users? if you selected all without filters, it might contain other users in pagination."
      />
    </span>
  );
};

export default DeleteUsers;
