import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ViewCustomerModal from "./ViewCustomerModal";
import DeleteCustomer from "./DeleteCustomer";
import { PencilSquare } from "react-bootstrap-icons";
import { getCustomers, reset } from "../app/reducers/customerSlice.js";
import { toast } from "react-toastify";
import { getUsers } from "../app/reducers/userSlice.js";

const Customers = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { customers, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.customers
  );
  const { users } = useSelector((state) => state.users);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(getCustomers());
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
  };

  const filteredCustomers = customers.filter((customer) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      customer.companyName.toLowerCase().includes(keyword) ||
      customer.state.toLowerCase().includes(keyword) ||
      customer.city.toLowerCase().includes(keyword) ||
      customer.status.toLowerCase().includes(keyword)
    );
  });

  const allCustomers =
    filteredCustomers &&
    filteredCustomers.map((customer) => (
      <tr key={customer._id} className="atim">
        <td className="td">{customer.companyName}</td>
        <td className="td">{customer.state}</td>
        <td className="td">{customer.city}</td>
        <td className="td">{customer.status}</td>
        {user.userRole === "admin" && (
          // <td className="td">{customer.user}</td>
          <td className="td">
            {users.map((u) => {
              if (u._id === customer.user) {
                return u.fullName; // Return the full name here
              }

              return null; // Return null if no match found
            })}
          </td>
        )}
        <td className="td">
          <ViewCustomerModal customer={customer} />
          <Button
            variant="link"
            className="symbol-button tdd"
            as={Link}
            to={{
              pathname: `/customers/editCustomer/${customer._id}`,
            }}
          >
            <PencilSquare className="tdd" />
          </Button>
          <DeleteCustomer className="tdd" customer={customer} />
        </td>
      </tr>
    ));

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <div className="customer_list">
      <section className="tab">
        <Container className="tab_div1">
          <Form>
            <Row className="table_1">
              <Col lg={6}>
                <Form.Group controlId="companyName" className="mb-2">
                  <Form.Control
                    className="input_fo"
                    type="text"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                  />
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group className="mb-2">
                  <Link to="/addCustomers">
                    <Button
                      className="mb-2 mr-2 create"
                      variant="secondary"
                      type="submit"
                    >
                      Create Customer
                    </Button>
                  </Link>
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group className="mb-2">
                  <Link to="/customers/upload">
                    <Button
                      className="mb-2 mr-2 upload "
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
          ) : customers.length === 0 ? (
            <p>No Customer</p>
          ) : (
            <Table className="tabletd">
              <thead>
                <tr>
                  <th className="tr">Business Name</th>
                  <th className="tr">State</th>
                  <th className="tr">City</th>
                  <th className="tr">Status</th>
                  {user?.userRole === "admin" ? (
                    <th className="tr">Agent</th>
                  ) : (
                    ""
                  )}
                  <th className="tr">Action</th>
                </tr>
              </thead>
              <tbody className="tbody">{allCustomers}</tbody>
            </Table>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Customers;
