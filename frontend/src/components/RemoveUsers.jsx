import React, { useState, useEffect } from "react";
import { Form, Col, Button, Modal, Row } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import { removeUsers } from "../app/reducers/userSlice.js";
import { useDispatch } from "react-redux";

const RemoveUsers = ({ _id, fullName, users }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    users: [],
  });
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  //   useEffect(() => {
  //     if (showModal) {
  // Filter the users based on whether they are already assigned to the manager
  //   const assignedUserIds = users
  //     .filter((user) => user.manager?.includes(_id))
  //     .map((user) => user._id);
  //   console.log(assignedUserIds);
  //   const preSelectedUsers = managers_agents.filter((user) =>
  //     assignedUserIds.includes(user._id)
  //   );
  //   console.log(preSelectedUsers);
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     users: managers_agents,
  //   }));
  //     }
  //   }, [showModal, _id, users]);

  const managers_agents = users
    .filter(
      (item) =>
        item.userRole !== "admin" &&
        item._id !== _id &&
        item.manager?.includes(_id)
    )
    .map((user) => ({
      _id: user._id,
      value: user.userName,
      label: user.fullName,
    }));

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedUsers = formData.users.map((user) => user._id);
    await dispatch(removeUsers({ _id, users: selectedUsers }));
    handleCloseModal();
    console.log({ _id, users: selectedUsers });
  };

  return (
    <>
      <Button
        variant="link"
        className="symbol-button"
        onClick={handleShowModal}
      >
        Remove Users
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={4}>
                <Form.Label column sm={12}>
                  Remove Users
                </Form.Label>
              </Col>

              <Col lg={6}>
                <Form.Group as={Row} controlId="manager" className="mb-2 role">
                  <MultiSelect
                    name="users"
                    options={managers_agents}
                    value={formData.users}
                    onChange={(selected) =>
                      handleInputChange("users", selected)
                    }
                    labelledBy="Select"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveUsers;
