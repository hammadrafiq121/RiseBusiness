import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../app/reducers/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!user) {
      dispatch(reset());
    }
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
    }
  }, [isLoading, isError, isSuccess]);

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
      </Container>
    </section>
  );
};

export default Login;
