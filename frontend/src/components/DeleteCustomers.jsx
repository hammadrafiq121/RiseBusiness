import React, { useState } from "react";
import { Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import DeleteConfirmation from "./DeleteConfirmation";
import { useDispatch } from "react-redux";
import { deleteCustomers } from "../app/reducers/customerSlice.js";

const DeleteCustomers = ({ selectedCustomers, admin }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    // Perform deletion logic here
    await dispatch(deleteCustomers(selectedCustomers));

    // Close the modal
    setShowDeleteModal(false);
  };

  return (
    <span>
      <Button
        variant="secondary"
        type="button"
        onClick={() => setShowDeleteModal(true)} // Open the modal on button click
        disabled={selectedCustomers.length === 0}
      >
        Delete Customers
      </Button>

      <DeleteConfirmation
        showModal={showDeleteModal}
        hideModal={() => setShowDeleteModal(false)}
        confirmModal={handleDelete}
        ids={selectedCustomers}
        type="customers"
        message="Are you sure you want to delete these customers? if you selected all without filters, it might contain other customers in pagination ?"
      />
    </span>
  );
};

export default DeleteCustomers;
