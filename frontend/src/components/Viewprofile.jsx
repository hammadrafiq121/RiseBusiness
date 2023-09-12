import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../style.css";



const ViewProfile = () => {

  return (
    <>
    <div className="profle_div" >

    <Container className="profile-container">

      <Row className="justify-content-center">

        <Col md={6} className="profile-form">

          <h2 className="text-center mb-4">User Profile</h2>
          
          <Form>

            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name"/>
            </Form.Group>


            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter your username"   />
            </Form.Group>


            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>


            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>


            <Button variant="primary" type="submit" className="btn-block">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
            </>
  );
};

export default ViewProfile;
