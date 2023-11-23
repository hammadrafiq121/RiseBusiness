import React, { useState } from "react";
import { Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import DeleteConfirmation from "./DeleteConfirmation";
import { useDispatch } from "react-redux";
import { deleteCustomer } from "../app/reducers/customerSlice.js";

const DeleteCustomer = ({ customer }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    // Perform deletion logic here
    await dispatch(deleteCustomer(customer._id));
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
        id={customer._id}
        type="customer"
        message="Are you sure you want to delete this customer?"
      />
    </span>
  );
};

export default DeleteCustomer;
