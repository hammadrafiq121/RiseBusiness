import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Modal } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import productApi from "../services/productApi";
import { addProduct } from "../app/reducers/productSlice.js";

const AddProductModal = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [formData, setFormData] = useState({ product: "", slug: "" });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the product value
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    // Generate the slug based on the product value
    const slug = value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "");

    updatedFormData.slug = slug;

    setFormData(updatedFormData);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await productApi.addProduct(formData);
    await dispatch(addProduct(response.data));
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
          <Modal.Title>Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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

export default AddProductModal;

// const trimmedProduct = product.trim();
// const lowercaseProduct = trimmedProduct.toLowerCase();
// const wordsInProduct = lowercaseProduct.split(" ");
// const capitalizedProduct = wordsInProduct
//   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//   .join(" ");
// return {
//   product: capitalizedProduct,
//   slug: lowercaseProduct.replace(/\s+/g, "-"),
// };
