import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "./Spinner";
import {
  uploadCustomers,
  reset as resetCustomer,
} from "../app/reducers/customerSlice.js";
import { getUsers, reset as resetUsers } from "../app/reducers/userSlice.js";
import { reset as resetStatus } from "../app/reducers/statusSlice.js";
import { reset as resetProduct } from "../app/reducers/productSlice.js";

const UploadCSV = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(resetCustomer());
      await dispatch(resetUsers());
      await dispatch(resetProduct());
      await dispatch(resetStatus());

      await dispatch(getUsers());
    };
    fetchData();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleChange = (event) => {
    setSelectedAgent(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      return alert("Please select a file");
    }
    if (!selectedAgent) {
      return alert("Please select a agent");
    }
    try {
      const customers = new FormData();
      customers.append("csvFile", selectedFile);
      customers.append("user", selectedAgent);
      await dispatch(uploadCustomers(customers));
    } catch (error) {
      console.log("Error uploading customers from CSV:", error);
    }
    // navigate("/customers/");
  };

  const allUsers =
    users &&
    users.map((user) => (
      <option key={user._id} value={user._id}>
        {user.userName}
      </option>
    ));

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="upload">
      <Container className=" upload-container ">
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Col sm={12}>
                  <Form.Label></Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2">
                <Col sm={6}>
                  <Form.Select
                    value={selectedAgent}
                    name="agent"
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Agent
                    </option>
                    {allUsers}
                  </Form.Select>
                </Col>
                <Col sm={6}>
                  <Button
                    className="mb-2 mr-2"
                    variant="secondary"
                    type="submit"
                  >
                    Upload
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UploadCSV;
