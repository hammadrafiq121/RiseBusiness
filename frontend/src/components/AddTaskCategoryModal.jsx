import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import { addTaskCategory } from "../app/reducers/taskCategorySlice.js";

const AddTaskCategoryModal = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [formData, setFormData] = useState({ taskCategory: "" });
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(addTaskCategory(formData));
    setFormData({ taskCategory: "" });
    handleCloseModal();
  };

  return (
    <>
      <Button
        variant="link"
        className="symbol-button"
        onClick={handleShowModal}
      >
        add new
      </Button>

      <Modal
        style={{ width: "50%" }}
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="custom-modal-width"
      >
        <Modal.Header closeButton>
          <Modal.Title>Task Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="taskCategory">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder=""
                      name="taskCategory"
                      value={formData.taskCategory}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Button variant="secondary" type="submit">
                    Add
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTaskCategoryModal;
