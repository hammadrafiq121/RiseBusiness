import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { reset as resetCustomer } from "../app/reducers/customerSlice.js";
import { reset as resetStatus } from "../app/reducers/statusSlice.js";
import { reset as resetProduct } from "../app/reducers/productSlice.js";
import {
  updateUser,
  getUser,
  getUsers,
  reset as resetUsers,
} from "../app/reducers/userSlice.js";

const EditUser = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    userRole: "",
    manager: null,
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { users, isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await dispatch(resetUsers());
        await dispatch(resetCustomer());
        await dispatch(resetStatus());
        await dispatch(resetProduct());

        const { payload: users } = await dispatch(getUsers());
        const selectedUser = await users.find((user) => user._id === id);
        setFormData({ ...selectedUser, manager: selectedUser.manager || null });
      }
    };
    fetchData();
  }, []);

  const managers = users
    .filter((item) => item.userRole === "manager" && item._id !== id)
    .map((manager) => ({ _id: manager._id, fullName: manager.fullName }));

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

    if (formData.userRole === "manager" || formData.userRole === "admin") {
      dispatch(
        updateUser({
          id: formData._id,
          user: { ...formData, manager: null },
        })
      );
      console.log(formData);
    } else {
      await dispatch(updateUser({ id: formData._id, user: formData }));
    }
    navigate("/users/");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="user_main">
      <div className="edit_user_container">
        <Form onSubmit={handleUpdate}>
          <Row>
            <Col lg={4}>
              <Form.Label column sm={12}>
                Full Name
              </Form.Label>

              <Form.Label column sm={12}>
                Username
              </Form.Label>

              <Form.Label column sm={12}>
                Email
              </Form.Label>

              <Form.Label column sm={12}>
                Role
              </Form.Label>
              {formData.userRole === "agent" && (
                <Form.Label column sm={12}>
                  Manager
                </Form.Label>
              )}
            </Col>

            <Col lg={6}>
              <Form.Group as={Row} controlId="fullName" className="mb-2">
                <Form.Control
                  disabled={isDisabled}
                  type="text"
                  placeholder=""
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Row} controlId="userName" className="mb-2">
                <Form.Control
                  disabled={isDisabled}
                  type="text"
                  placeholder=""
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Row} controlId="email" className="mb-2">
                <Form.Control
                  disabled={isDisabled}
                  type="email"
                  placeholder=""
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Row} controlId="userRole" className="mb-2 role">
                <Form.Select
                  disabled={isDisabled}
                  value={formData.userRole}
                  name="userRole"
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="agent">Agent</option>
                </Form.Select>
              </Form.Group>
              {formData.userRole === "agent" && (
                <Form.Group as={Row} controlId="manager" className="mb-2 role">
                  <Form.Select
                    disabled={isDisabled}
                    value={formData.manager}
                    name="manager"
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Manager
                    </option>
                    {managers.map((manager) => (
                      <option key={manager._id} value={manager._id}>
                        {manager.fullName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}
              <Form.Group as={Row} className="mb-2  ">
                {isDisabled && (
                  <Button
                    className="mb-2 mr-2 edit_user_btn "
                    variant="secondary"
                    type="button"
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  className="mb-2 mr-2 update_user_btn "
                  variant="secondary"
                  type="submit"
                >
                  Update
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  );
};

export default EditUser;
