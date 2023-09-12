import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../app/reducers/authSlice";
// import Spinner from "./Spinner";

const Signup = () => {
  const blankForm = {
    fullName: "",
    userName: "",
    email: "",
    password: "",
    userRole: "",
  };
  const [formData, setFormData] = useState(blankForm);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //   dispatch(reset());
  // }, []);

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      toast.loading(message);
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }

    if (isSuccess) {
      toast.dismiss();
      toast.success(message);
      setFormData(blankForm);
    }
  }, [isSuccess, isError, message, isLoading]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(signup(formData));
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <section className="signup_tab">
      <Container className="signup_container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="signup_group" controlId="fullName">
            <Form.Label className="signup_label">Full Name</Form.Label>
            <Form.Control
              className="signup_name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="signup_group" controlId="userName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              className="signup_name"
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="signup_group" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="signup_name"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="signup_group" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="signup_name"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="signup_group" controlId="userRole">
            <Form.Label>User Role</Form.Label>
            <Form.Control
              className="signup_name"
              as="select"
              name="userRole"
              value={formData.userRole}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="agent">Agent</option>
            </Form.Control>
          </Form.Group>

          <Button
            className="mb-2 ml-2 mt-2 signup_btn"
            variant="secondary"
            type="submit"
          >
            Signup
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default Signup;
