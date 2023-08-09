import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ViewCustomerModal from "./ViewCustomerModal";
import DeleteCustomer from "./DeleteCustomer";
import { PencilSquare } from "react-bootstrap-icons";
import { getCustomers } from "../app/reducers/customerSlice.js";
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
  const [selectedStatus, setSelectedStatus] = useState("");
  const itemsPerPage = 11;

  useEffect(() => {
    if (user) {
      dispatch(getCustomers());
    }
  }, [user, dispatch]);

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

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setCurrentPage(1);
  };

  const filteredCustomers = customers.filter((customer) => {
    const keyword = searchKeyword.toLowerCase();
    const statusMatch =
      selectedStatus === "" || customer.status === selectedStatus;
    return (
      (customer.companyName.toLowerCase().includes(keyword) ||
        customer.state.toLowerCase().includes(keyword) ||
        customer.city.toLowerCase().includes(keyword)) &&
      statusMatch
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
      className={`pagination-number ${
        index + 1 === currentPage ? "active" : ""
      }`}
      onClick={() => setCurrentPage(index + 1)}
      style={{
        cursor: "pointer",
        margin: "0 5px",
        padding: "5px 10px",
        border: index + 1 === currentPage ? "1px solid #007bff" : "1px solid #ccc",
        backgroundColor: index + 1 === currentPage ? "#007bff" : "white",
        color: index + 1 === currentPage ? "white" : "black",
        borderRadius: "5px",
      }}
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
              <Col lg={6}>
                <Form.Group className="mb-2 create ">
                  <Link to="/addCustomers">
                    <Button className=" mr-3 " variant="secondary" type="submit">
                      Create Customer
                    </Button>
                  </Link>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Link to="/customers/upload">
                    <Button className=" mr-3 create" variant="secondary" type="submit">
                      Upload
                    </Button>
                  </Link>
                </Form.Group>
                <Form.Group controlId="statusFilter" className="mb-2">
                  <Form.Control className="status"
                    as="select"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                  >
                    <option value="">All</option>
                    <option value="Active">Active</option>
                    <option value="Interested">Interested</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <Table className="customers_table">
            <thead>
              <tr>
                <th className="custoner-col-name">Business Name</th>
                <th className="custoner-col-name">State</th>
                <th className="custoner-col-name">City</th>
                <th className="custoner-col-name">Status</th>
                <th className="custoner-col-name">Action</th>
              </tr>
            </thead>
            <tbody className="tbody">{renderCustomers}</tbody>
          </Table>

          <div className="pagination-controls" style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              className="pagination-btn previous_btn"
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <ul className="page-numbers-list" style={{ display: "inline-block", listStyle: "none", padding: 0 }}>
              {renderPageNumbers}
            </ul>
            <Button
              className="pagination-btn next_btn"
              variant="secondary"
              disabled={indexOfLastItem >= filteredCustomers.length}
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

export default Customers;
