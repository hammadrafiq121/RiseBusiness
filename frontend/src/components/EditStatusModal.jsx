import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { Form, Row, Col } from "react-bootstrap";
import { updateStatus } from "../app/reducers/statusSlice.js";

const EditStatusModal = ({ status }) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [formData, setFormData] = useState({
    _id: status._id || "",
    status: status.status || "",
    belongsTo: status.belongsTo || "",
  });
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    await dispatch(updateStatus({ id: formData._id, updatedStatus: formData }));
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
                <Form.Group controlId="userFilter" className="mb-2">
                  <Form.Control
                    as="select"
                    name="belongsTo"
                    value={formData.belongsTo}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      belongs to
                    </option>
                    <option value="customers">Customers</option>
                    <option value="leads">Leads</option>
                  </Form.Control>
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
