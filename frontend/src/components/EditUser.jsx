import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getUser } from "../app/reducers/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const EditUser = () => {
  const stlye = {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
  };
  const [isDisabled, setIsDisabled] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    userRole: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, isLoading, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetch = async () => {
      if (isError) {
        toast.error(message);
      }
      if (user) {
        const fetcheduser = await dispatch(getUser(id));
        setFormData(fetcheduser.payload);
      }
    };
    fetch();
  }, [user, dispatch, id]);

  const handleEdit = () => {
    setIsDisabled(!isDisabled);
  };
  const handleChange = (event) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    await dispatch(updateUser({ id: formData._id, user: formData }));
    navigate("/users/");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="tab">
      <Container style={stlye}>
        <Form onSubmit={handleUpdate}>
          <Row>
            <Col md={12}>
              <Form.Group as={Row} controlId="fullName" className="mb-2">
                <Form.Label column sm={3}>
                  Full Name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled={isDisabled}
                    type="text"
                    placeholder=""
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="userName" className="mb-2">
                <Form.Label column sm={3}>
                  Username
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled={isDisabled}
                    type="text"
                    placeholder=""
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="email" className="mb-2">
                <Form.Label column sm={3}>
                  Email
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled={isDisabled}
                    type="email"
                    placeholder=""
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="userRole" className="mb-2">
                <Form.Label column sm={3}>
                  Role
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    value={formData.userRole}
                    name="status"
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="Admin">Admin</option>
                    <option value="Manger">Manger</option>
                    <option value="Agent">Agent</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2">
                {isDisabled && (
                  <Button
                    className="mb-2 mr-2"
                    variant="secondary"
                    type="button"
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                )}
                <Button className="mb-2 mr-2" variant="secondary" type="submit">
                  Update
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </main>
  );
};

export default EditUser;
