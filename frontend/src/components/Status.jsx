import React, { useState } from "react";

const Status = () => {
  const statusOptions = [
    { _id: "1", status: "Status 1" },
    { _id: "2", status: "Status 2" },
    { _id: "3", status: "Status 3" },
    { _id: "4", status: "Status 4" },
    { _id: "5", status: "Status 5" },
    { _id: "6", status: "Status 6" },
  ];

  const handleStatusEdit = async () => {
    const [editStatus, setEditStatus] = useState(false);
    const [statusForm, setStatusForm] = useState({
      status: "",
    });
    setEditStatus(!editStatus);
    console.log(editStatus);
  };
  const handleStatusChange = async (event) => {
    setStatusForm((statusForm) => ({
      ...statusForm,
      [event.target.name]: event.target.value,
    }));
  };
  const handleStatusSubmit = async (event) => {
    event.preventDefault();
    console.log(statusForm);
  };

  return {
    /* {editing ? (
        <div>
          <input
            type="text"
            value={editedStatus}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdateClick}>Update</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          {statusData.status}
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )} */
  };
};

export default Status;
