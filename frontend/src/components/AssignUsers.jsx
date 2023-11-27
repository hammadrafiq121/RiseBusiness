import React, { useState } from "react";
import { Form, Col, Button, Modal, Row } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
// import { assignUsers } from "../services/userApi";
import { assignUsers } from "../app/reducers/userSlice.js";
import { useDispatch } from "react-redux";

const AssignUsers = ({ _id, fullName, users }) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    users: [],
  });

  const managers_agents = users
    .filter((item) => item.userRole !== "admin" && item._id !== _id)
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
    const users = await formData.users.map((user) => user._id);
    console.log(_id, users);
    await dispatch(assignUsers({ _id, users }));
    setFormData({
      users: [],
    });
    handleCloseModal();
  };

  return (
    <>
      <Button
        variant="link"
        className="symbol-button"
        onClick={handleShowModal}
      >
        Assign Users
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
                  Assign Users
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
          <Button variant="secondary" onClick={handleSubmit}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AssignUsers;
