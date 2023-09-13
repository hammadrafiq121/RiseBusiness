import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PencilSquare } from "react-bootstrap-icons";
import "../style.css";
import { getUsers } from "../app/reducers/userSlice.js";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import DeleteUser from "./DeleteUser";

const Users = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { users, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.users
  );

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (user) {
      dispatch(getUsers());
    }
  }, [user, dispatch]);

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
  }, [isError, isLoading, isSuccess, message]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (isError) {
        console.log(message);
      }
      await dispatch(getUsers());
    };
    fetchUsers();
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
    setCurrentPage(1);
  };

  const handleRoleFilterChange = (event) => {
    setSelectedRole(event.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) => {
    const keyword = searchKeyword.toLowerCase();
    const role = selectedRole.toLowerCase(); // Convert selectedRole to lowercase

    // Filter by keyword and role if role is selected
    return (
      (user.fullName.toLowerCase().includes(keyword) ||
        user.userName.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)) &&
      (role === "" || user.userRole.toLowerCase() === role)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const renderUsers = currentUsers.map((user) => (
    <tr key={user._id} className="atim">
      <td>{user.fullName}</td>
      <td>{user.userName}</td>
      <td>{user.email}</td>
      <td>{user.userRole}</td>
      <td>
        <Button
          variant="link"
          className="symbol-button"
          as={Link}
          to={{
            pathname: `/users/editUser/${user._id}`,
          }}
        >
          <PencilSquare />
        </Button>
        <DeleteUser user={user} />
      </td>
    </tr>
  ));

  return (
    <div>
      <section className="tab">
        <Container className="tab_div1">
          <Form>
            <Row className="table_1">
              <Col lg={4}>
                <Form.Group controlId="companyName" className="mb-2">
                  <Form.Control
                    type="text"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                  />
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group controlId="roleFilter" className="mb-2">
                  <Form.Control
                    className="role_agent"
                    as="select"
                    value={selectedRole}
                    onChange={handleRoleFilterChange}
                  >
                    <option value="">Select Roles</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="agent">Agent</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group className="mb-2">
                  <Link to="/signup">
                    <Button className="mr-5" variant="secondary" type="submit">
                      Create User
                    </Button>
                  </Link>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Link to="/customers/upload">
                    <Button className="mr-5" variant="secondary" type="submit">
                      Upload
                    </Button>
                  </Link>
                </Form.Group>
              </Col>
            </Row>
          </Form>

          {isLoading ? (
            <Spinner />
          ) : (
            <Table className="user_list">
              <thead>
                <tr className="user_col_name">
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="tbody">{renderUsers}</tbody>
            </Table>
          )}

          <div className="pagination-controls">
            <Button
              className="pagination-btn previous_btn"
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{
                marginRight: "10px",
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              Previous
            </Button>
            <ul className="page-numbers-list">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`pagination-number ${
                    index + 1 === currentPage ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                  style={{
                    border:
                      index + 1 === currentPage
                        ? "1px solid #007bff"
                        : "1px solid #ccc",
                    backgroundColor:
                      index + 1 === currentPage ? "#007bff" : "white",
                    color: index + 1 === currentPage ? "white" : "black",
                  }}
                >
                  {index + 1}
                </li>
              ))}
            </ul>
            <Button
              className="pagination-btn next_btn"
              variant="secondary"
              disabled={indexOfLastItem >= filteredUsers.length}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Users;
