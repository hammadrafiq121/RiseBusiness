import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PencilSquare, EyeFill } from "react-bootstrap-icons";
import "../style.css";
import Spinner from "./Spinner";
// import DeleteUser from "./DeleteUser";
import { reset as resetCustomer } from "../app/reducers/customerSlice.js";
import { getUsers, reset as resetUsers } from "../app/reducers/userSlice.js";
import { reset as resetStatus } from "../app/reducers/statusSlice.js";
import { reset as resetProduct } from "../app/reducers/productSlice.js";
import AssignUsers from "./AssignUsers";

const Users = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.users
  );
  const admin = user && user.userRole === "admin";
  const managers = users.filter((user) => user.userRole === "manager");

  const [searchKeyword, setSearchKeyword] = useState("");
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

  const filteredUsers = managers.filter((user) => {
    const keyword = searchKeyword.toLowerCase();

    return (
      user.fullName.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword)
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
        {admin && (
          <AssignUsers users={users} _id={user._id} fullName={user.fullName} />
        )}
        {/* <DeleteUser user={user} /> */}
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
              <tbody className="tbody">{renderUsers}</tbody>
            </Table>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Users;
