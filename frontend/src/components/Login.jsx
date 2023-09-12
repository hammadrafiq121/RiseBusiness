import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../app/reducers/authSlice";
import Spinner from "./Spinner";
import logApi from "../services/logApi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(reset());
  }, []);

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
    }
    if (user) {
      const a = async () => {
        await logApi.logUserLogin(user.userName);
        navigate("/");
      };
      a();
    }
  }, [user, isSuccess, isError, message, isLoading]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="login-sec">
      <Container className="login-container">
        <Form onSubmit={handleSubmit}>
          {/* <Form.Group controlId="userName">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
      </Form.Group> */}
          <h1>LOGIN</h1>
          <Form.Group controlId="email">
            <Form.Label></Form.Label>
            <Form.Control
              className="input"
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
              className="input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Button
            className="mb-2  mt-2 btn-1"
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
