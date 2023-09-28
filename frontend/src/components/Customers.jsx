import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import ViewCustomerModal from "./ViewCustomerModal";
import DeleteCustomer from "./DeleteCustomer";
import { PencilSquare } from "react-bootstrap-icons";
import { getUsers } from "../app/reducers/userSlice.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, isBefore, startOfDay, endOfDay } from "date-fns";
import {
  getCustomers,
  reset as resetCustomer,
} from "../app/reducers/customerSlice.js";
import {
  getAllStatus,
  reset as resetStatus,
} from "../app/reducers/statusSlice.js";
import {
  getProducts,
  reset as resetProduct,
} from "../app/reducers/productSlice.js";

const Customers = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { customers, isLoading } = useSelector((state) => state.customers);
  const { statuses } = useSelector((state) => state.statuses);
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.users);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const admin = user && user.userRole === "admin";

  useEffect(() => {
    const fetchData = async () => {
      if (admin) {
        await dispatch(getUsers());
      }
      if (user) {
        await dispatch(resetCustomer());
        await dispatch(resetStatus());
        await dispatch(resetProduct());

        await dispatch(getAllStatus());
        await dispatch(getProducts());
        await dispatch(getCustomers());
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
    setCurrentPage(1);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setCurrentPage(1);
  };
  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    setCurrentPage(1);
  };
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setCurrentPage(1);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    setCurrentPage(1);
  };

  const filteredCustomers = customers.filter((customer) => {
    const keyword = searchKeyword.toLowerCase();
    const isStatusMatch =
      selectedStatus === "" || customer.status === selectedStatus;
    const isUserMatch = selectedUser === "" || customer.user === selectedUser;
    const creationDate = parseISO(customer.createdAt);
    const startOfSelectedStartDate = startOfDay(selectedStartDate);
    const endOfSelectedEndDate = endOfDay(selectedEndDate);
    const isStartDateMatch =
      !selectedStartDate || isBefore(creationDate, endOfSelectedEndDate);
    const isEndDateMatch =
      !selectedEndDate || isBefore(startOfSelectedStartDate, creationDate);

    return (
      (customer.companyName.toLowerCase().includes(keyword) ||
        customer.state.toLowerCase().includes(keyword) ||
        customer.city.toLowerCase().includes(keyword)) &&
      isStatusMatch &&
      isUserMatch &&
      isStartDateMatch &&
      isEndDateMatch
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const renderCustomers = currentItems.map((item) => {
    const customer = {
      ...item,
      status:
        statuses.find((status) => status._id === item.status)?.status ||
        "Unknown",
      user: users.find((user) => user._id === item.user)?.userName || "Unknown",
      products: products.filter((product) =>
        item.products.includes(product._id)
      ),
    };

    return (
      <tr key={customer._id} className="atim">
        <td className="td">{customer.companyName}</td>
        <td className="td">{customer.state}</td>
        <td className="td">{customer.city}</td>
        {admin && <td className="td">{customer.user}</td>}
        <td className="td">{customer.status}</td>
        <td className="td">
          {new Date(customer.createdAt).toLocaleDateString()}
        </td>
        <td className="td">
          {/* <ViewCustomerModal customer={customer} /> */}
          <Button
            variant="link"
            className="symbol-button tdd"
            as={Link}
            to={{
              pathname: `/customers/editCustomer/${customer._id}`,
            }}
          >
            <PencilSquare />
          </Button>
          {admin && <DeleteCustomer className="tdd" customer={customer} />}
        </td>
      </tr>
    );
  });

  const renderPageNumbers = Array.from({ length: totalPages }, (_, index) => (
    <div
      key={index}
      className={`pagination-number ${
        index + 1 === currentPage ? "active" : ""
      }`}
      onClick={() => setCurrentPage(index + 1)}
      style={{
        border:
          index + 1 === currentPage ? "1px solid #007bff" : "1px solid #ccc",
        backgroundColor: index + 1 === currentPage ? "#007bff" : "white",
        color: index + 1 === currentPage ? "white" : "black",
      }}
    >
      {index + 1}
    </div>
  ));

  return (
    <div className="customer_div">
      <section className="customer-sec">
        <Container className="customer-container">
          <Form>
            <Row className="customer-row">
              <Col lg={10}>
                <Row>
                  <Col lg={4}>
                    <Form.Group controlId="companyName" className="mb-2">
                      <Form.Control
                        type="text"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        placeholder="Search Business ..."
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2}>
                    <Form.Group controlId="statusFilter" className="mb-2">
                      <Form.Control
                        className="col_7 Select-status"
                        as="select"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                      >
                        <option value="">Select Status</option>
                        {statuses.map((status) => (
                          <option key={status._id} value={status._id}>
                            {status.status}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  {admin && (
                    <Col lg={2}>
                      <Form.Group controlId="userFilter" className="mb-2">
                        <Form.Control
                          className="col_7 Select-status"
                          as="select"
                          value={selectedUser}
                          onChange={handleUserChange}
                        >
                          <option value="">Select User</option>
                          {users.map((user) => (
                            <option key={user._id} value={user._id}>
                              {user.userName}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  )}
                  <Col lg={2}>
                    <Form.Group controlId="startDateFilter" className="mb-2">
                      <DatePicker
                        selected={selectedStartDate}
                        onChange={handleStartDateChange}
                        placeholderText="Start Date"
                        dateFormat="yyyy-MM-dd"
                        className="form-control date_picker start"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2}>
                    <Form.Group
                      controlId="endDateFilter"
                      className="mb-2 end_date "
                    >
                      <DatePicker
                        selected={selectedEndDate}
                        onChange={handleEndDateChange}
                        placeholderText="End Date"
                        dateFormat="yyyy-MM-dd"
                        className="form-control date_picker start"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col lg={2}>
                <Row>
                  <Col lg={12}>
                    <Form.Group className="mb-1">
                      <Link to="/addCustomers">
                        <Button variant="secondary" type="submit">
                          Create Customer
                        </Button>
                      </Link>
                    </Form.Group>
                    <Form.Group className="mb-1">
                      <Link to="/customers/upload">
                        <Button variant="secondary" type="submit">
                          Upload
                        </Button>
                      </Link>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>

          <Table className="customers_table">
            <thead>
              <tr>
                <th className="custoner-col-name">Business Name</th>
                <th className="custoner-col-name">State</th>
                <th className="custoner-col-name">City</th>
                {admin && <th className="custoner-col-name">User</th>}
                <th className="custoner-col-name">Status</th>
                <th className="custoner-col-name">Date</th>
                <th className="custoner-col-name">Action</th>
              </tr>
            </thead>
            <tbody className="tbody">{renderCustomers}</tbody>
          </Table>

          <div className="pagination-controls">
            <Button
              className="pagination-btn previous_btn"
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <ul className="page-numbers-list">{renderPageNumbers}</ul>
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
