import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { Form, Row, Col } from "react-bootstrap";
import productApi from "../services/productApi";
import { updateProduct } from "../app/reducers/productSlice.js";

const EditProductModal = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [formData, setFormData] = useState(product);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    const slug = value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "");

    updatedFormData.slug = slug;
    setFormData(updatedFormData);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    await productApi.updateProduct(formData._id, formData);
    await dispatch(
      updateProduct({ id: formData._id, updatedProduct: formData.product })
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
          <Modal.Title>Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Row>
              <Col>
                <Form.Group controlId="product">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder=""
                      name="product"
                      value={formData.product}
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

export default EditProductModal;
