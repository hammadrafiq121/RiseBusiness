import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { Form, Row, Col } from "react-bootstrap";

const EditStatusModal = ({ status }) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [formData, setFormData] = useState({
    status: "",
    _id: "",
  });
  useEffect(() => {
    if (status) {
      setFormData(status);
    }
  }, [status]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    console.log(formData);
    handleCloseModal();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
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
          <Modal.Title>Status</Modal.Title>
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
