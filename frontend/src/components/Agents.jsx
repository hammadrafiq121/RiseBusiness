import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PencilSquare, EyeFill } from "react-bootstrap-icons";
import "../style.css";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import DeleteUser from "./DeleteUser";
import { reset as resetCustomer } from "../app/reducers/customerSlice.js";
import { getUsers, reset as resetUsers } from "../app/reducers/userSlice.js";
import { reset as resetStatus } from "../app/reducers/statusSlice.js";
import { reset as resetProduct } from "../app/reducers/productSlice.js";
import Pagination from "./Pagination.jsx";

const Users = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const admin = user && user.userRole === "admin";

  const { users, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.users
  );
  const agents = users.filter((user) => user.userRole === "agent");

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

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
  };

  const filteredUsers = agents.filter((user) => {
    const keyword = searchKeyword.toLowerCase();
    const role = selectedRole.toLowerCase(); // Convert selectedRole to lowercase

    return (
      (user.fullName.toLowerCase().includes(keyword) ||
        user.userName.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)) &&
      (role === "" || user.userRole.toLowerCase() === role)
    );
  });

  const renderUsers = filteredUsers.map((user) => (
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
          <EyeFill />
        </Button>
        {admin && <DeleteUser user={user} />}
      </td>
    </tr>
  ));

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = renderUsers.slice(indexOfFirstUser, indexOfLastUser);

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
              {/* <Col lg={2}>
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
              </Col> */}
              <Col lg={6}>
                <Form.Group className="mb-2 user_btn">
                  <Link to="/signup">
                    <Button className="mr-5" variant="secondary" type="submit">
                      Create User
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
              <tbody className="tbody">
                {currentUsers.length === 0 ? "No Users" : currentUsers}
              </tbody>
            </Table>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </Container>
      </section>
    </div>
  );
};

export default Users;
