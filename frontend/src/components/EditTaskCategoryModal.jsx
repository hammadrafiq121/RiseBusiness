import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { Form, Row, Col } from "react-bootstrap";
import { updateTaskCategory } from "../app/reducers/taskCategorySlice.js";

const EditTaskCategoryModal = ({ taskCategory }) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [formData, setFormData] = useState(taskCategory);
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    await dispatch(
      updateTaskCategory({
        id: formData._id,
        updatedTaskCategory: formData.taskCategory,
      })
    );
    handleCloseModal();
  };

  return (
    <>
      <Button
        variant="link"
        className="symbol-button"
        onClick={handleShowModal}
      >
        <PencilSquare />
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
          <Form onSubmit={handleUpdate}>
            <Row>
              <Col>
                <Form.Group controlId="status">
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
                    Update
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

export default EditTaskCategoryModal;
