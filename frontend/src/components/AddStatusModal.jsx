import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Modal } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import statusApi from "../services/statusApi";
import { addStatus } from "../app/reducers/statusSlice.js";

const EditStatusModal = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [formData, setFormData] = useState({ status: "" });
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await statusApi.addStatus(formData);
    await dispatch(addStatus(response.data));
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
          <Modal.Title>Status</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="status">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder=""
                      name="status"
                      value={formData.status}
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

export default EditStatusModal;
