import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import DeleteCustomer from "./DeleteCustomer";
import { PencilSquare } from "react-bootstrap-icons";
import "../style.css";
import { getUsers } from "../app/reducers/userSlice.js";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import DeleteUser from "./DeleteUser";

const Users = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (user) {
      dispatch(getUsers());
    }
  }, [user, dispatch]);

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(keyword) ||
      user.userName.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.userRole.toLowerCase().includes(keyword)
    );
  });

  const allUsers =
    filteredUsers &&
    filteredUsers.map((user) => (
      <tr key={user._id} className="atim">
        <td>{user.fullName}</td>
        <td>{user.userName}</td>
        <td>{user.email}</td>
        <td>{user.userRole}</td>
        <td>
          <Button
            variant="link"
            className="symbol-button  "
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="tab">
        <Container className="tab_div1">
          <Form>
            <Row className="table_1">
              <Col lg={6}>
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
                <Form.Group className="mb-2">
                  <Link to="/signup">
                    <Button
                      className=" mr-5"
                      variant="secondary"
                      type="submit"
                    >
                      Create User
                    </Button>
                  </Link>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Link to="/uploadCSV">
                    <Button
                      className=" mr-5"
                      variant="secondary"
                      type="submit"
                    >
                      Upload
                    </Button>
                  </Link>
                </Form.Group>
              </Col>
             
            </Row>
          </Form>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table className="user_list" >
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="tbody">{allUsers}</tbody>
            </Table>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Users;
