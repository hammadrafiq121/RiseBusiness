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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
    setCurrentPage(1);
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

<<<<<<< HEAD
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
=======
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
>>>>>>> 2f3abf0e79cf8e5a373b7513b3108dac8b52142d

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const renderCustomers = currentItems.map((customer) => (
    <tr key={customer._id} className="atim">
      <td className="td">{customer.companyName}</td>
      <td className="td">{customer.state}</td>
      <td className="td">{customer.city}</td>
      <td className="td">{customer.status}</td>
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

  const renderPageNumbers = Array.from({ length: totalPages }, (_, index) => (
    <li
      key={index}
      className={index + 1 === currentPage ? "active" : ""}
      onClick={() => setCurrentPage(index + 1)}
    >
      {index + 1}
    </li>
  ));

  return (
    <div className="customer_div">
      <section className="customer-sec">
        <Container className="customer-container">
          <Form>
            <Row className="customer-row">
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
                      className="mb-2 mr-2 upload"
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
            <Table>
              <thead>
                <tr>
<<<<<<< HEAD
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
=======
                  <th className="custoner-col-name">Business Name</th>
                  <th className="custoner-col-name">State</th>
                  <th className="custoner-col-name">City</th>
                  <th className="custoner-col-name">Status</th>
                  <th className="custoner-col-name">Action</th>
>>>>>>> 2f3abf0e79cf8e5a373b7513b3108dac8b52142d
                </tr>
              </thead>
              <tbody className="tbody">{renderCustomers}</tbody>
            </Table>
          )}

          <div className="pagination-controls">
            <Button className="previous_btn"
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous Page
            </Button>
            <ul className="page-numbers-list">{renderPageNumbers}</ul>
            <Button className="next_btn"
              variant="secondary"
              disabled={indexOfLastItem >= filteredCustomers.length}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next Page
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Customers;
