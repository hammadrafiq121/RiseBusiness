import React, { useState } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { EyeFill } from "react-bootstrap-icons";

const ViewCustomerModal = ({ customer }) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Button
        variant="link"
        className="symbol-button"
        onClick={handleShowModal}
      >
        <EyeFill />
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Company Name:</strong> {customer.companyName}
          <br />
          <strong>Company Phone:</strong> {customer.companyPhone}
          <br />
          <strong>Company Fax:</strong> {customer.companyFax}
          <br />
          <strong>Company Address:</strong> {customer.companyAddress}
          <br />
          <strong>Country:</strong> {customer.country}
          <br />
          <strong>State:</strong> {customer.state}
          <br />
          <strong>City:</strong> {customer.city}
          <br />
          <strong>ZIP Code:</strong> {customer.zipCode}
          <br />
          <strong>Person Name:</strong> {customer.personName}
          <br />
          <strong>Person Phone:</strong> {customer.personPhone}
          <br />
          <strong>Person Email:</strong> {customer.personEmail}
          <br />
          <strong>Comments:</strong>
          {customer.comments.length === 0 ? (
            " not yet set"
          ) : (
            <ListGroup>
              {customer.comments?.map((comment, index) => (
                <ListGroup.Item key={index}>{comment}</ListGroup.Item>
              ))}
            </ListGroup>
          )}
          <br />
          <strong>Status:</strong> {customer.status || "not yet set"}
          <br />
          <strong>Products:</strong>
          {customer.products.length === 0 ? (
            " not yet set"
          ) : (
            <ListGroup>
              {customer.products?.map((product) => (
                <ListGroup.Item key={product._id}>
                  {product.product}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewCustomerModal;
