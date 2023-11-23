import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../app/reducers/authSlice";
import Toast from "./Toast";
import Spinner from "./Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(reset());
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(formData));
  };

  return (
    <section className="login-sec">
      <Container className="login-container">
        <Form onSubmit={handleSubmit}>
          <h1>LOGIN</h1>
          <Form.Group controlId="email">
            <Form.Label></Form.Label>
            <Form.Control
              className="input login"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label></Form.Label>
            <Form.Control
              className="input  login "
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Button
            className="mb-2  mt-2 btn-1 "
            variant="secondary"
            type="submit"
          >
            Login
          </Button>
        </Form>
        {isLoading && <Spinner />}
        {isSuccess && <Toast isSuccess={isSuccess} message={message} />}
        {isError && <Toast isError={isError} message={message} />}
      </Container>
    </section>
  );
};

export default Login;
