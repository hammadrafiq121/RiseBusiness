import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../app/reducers/authSlice";
import Spinner from "./Spinner";
import { reset } from "../app/reducers/authSlice.js";
import { reset as resetCustomer } from "../app/reducers/customerSlice.js";
import { reset as resetStatus } from "../app/reducers/statusSlice.js";
import { reset as resetProduct } from "../app/reducers/productSlice.js";
import { getUsers, reset as resetUsers } from "../app/reducers/userSlice.js";
import Toast from "./Toast";
import { MultiSelect } from "react-multi-select-component";

const Signup = () => {
  const blankForm = {
    fullName: "",
    userName: "",
    email: "",
    password: "",
    userRole: "",
    manager: [],
  };
  const [formData, setFormData] = useState(blankForm);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const { users } = useSelector((state) => state.users);
  const admin = user && user.userRole === "admin";

  const managers = users
    .filter((user) => user.userRole === "manager")
    .map((user) => ({
      _id: user._id,
      value: user.userName,
      label: user.fullName,
    }));

  useEffect(() => {
    const clearData = async () => {
      await dispatch(reset());
      await dispatch(resetUsers());
      await dispatch(resetCustomer());
      await dispatch(resetStatus());
      await dispatch(resetProduct());

      await dispatch(getUsers());
    };
    clearData();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setFormData(blankForm);
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.userRole === "manager") {
      const updatedForm = {
        ...formData,
        manager: [user._id],
        userRole: "agent",
      };
      await dispatch(signup(updatedForm));
    } else {
      const ids = formData.manager.map((user) => user._id);
      await dispatch(signup({ ...formData, manager: ids }));
    }
  };

  return (
    <section className="signup_tab">
      <Container className="signup_container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="signup_group" controlId="fullName">
            <Form.Control
              className="signup_name pll"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Full Name"
            />
          </Form.Group>

          <Form.Group className="signup_group" controlId="userName">
            <Form.Label></Form.Label>
            <Form.Control
              className="signup_name pl"
              placeholder="User Name"
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="signup_group" controlId="email">
            <Form.Label></Form.Label>
            <Form.Control
              className="signup_name pl"
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="signup_group" controlId="password">
            <Form.Label></Form.Label>
            <Form.Control
              className="signup_name pl"
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {admin && (
            <Form.Group className="signup_group" controlId="userRole">
              <Form.Label></Form.Label>
              <Form.Control
                className="signup_name pl"
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
          )}
          {formData.userRole === "agent" && admin && (
            <Form.Group className="" controlId="manager">
              <Form.Label></Form.Label>

              <Form.Group controlId="manager" className="role">
                <MultiSelect
                  name="manager"
                  options={managers}
                  value={formData.manager}
                  onChange={(selected) =>
                    handleInputChange("manager", selected)
                  }
                  labelledBy="Select"
                />
              </Form.Group>
            </Form.Group>
          )}
          <Button
            className="mb-2 mt-2 signup_btn"
            variant="secondary"
            type="submit"
          >
            Signup
          </Button>
        </Form>
        {isLoading && <Spinner />}
        {isSuccess && <Toast isSuccess={isSuccess} message={message} />}
        {isError && <Toast isError={isError} message={message} />}
      </Container>
    </section>
  );
};

export default Signup;
