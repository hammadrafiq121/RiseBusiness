import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ViewCustomerModal from "./ViewCustomerModal";
import DeleteCustomer from "./DeleteCustomer";
import { PencilSquare } from "react-bootstrap-icons";
import { getCustomers } from "../app/reducers/customerSlice.js";
import { toast } from "react-toastify";
// import { getUsers } from "../app/reducers/userSlice.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, isBefore, startOfDay, endOfDay } from "date-fns";
import { getStatus, getAllStatus } from "../services/statusApi";
import { getSelectedProducts } from "../services/productApi";

const Customers = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { customers, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.customers
  );
  // const { users } = useSelector((state) => state.users);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [statusData, setStatusData] = useState({});
  const [productsData, setProductsData] = useState({});
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (user) {
        const fetchedCustomers = await dispatch(getCustomers());
        for (const customer of fetchedCustomers.payload) {
          if (customer.status?.length > 0) {
            const status = await getStatus(customer.status);
            setStatusData((statusData) => ({
              ...statusData,
              [customer._id]: status,
            }));
          }
          if (customer.products?.length > 0) {
            const products = await getSelectedProducts(customer.products);
            setProductsData((productsData) => ({
              ...productsData,
              [customer._id]: products,
            }));
          }
        }
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Fetch statuses from your API
    async function fetchStatuses() {
      const data = await getAllStatus();
      setStatusOptions(data);
    }
    fetchStatuses();
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

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     if (isError) {
  //       console.log(message);
  //     }
  //     await dispatch(getUsers());
  //   };
  //   fetchUsers();
  // }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
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

  const renderCustomers = currentItems.map((customer) => (
    <tr key={customer._id} className="atim">
      <td className="td">{customer.companyName}</td>
      <td className="td">{customer.state}</td>
      <td className="td">{customer.city}</td>
      <td className="td">
        {statusData[customer._id] ? statusData[customer._id] : "Unknown"}
      </td>
      <td className="td">
        {new Date(customer.createdAt).toLocaleDateString()}
      </td>
      <td className="td">
        <ViewCustomerModal
          customer={customer}
          statusData={statusData}
          productsData={productsData}
        />
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
        <DeleteCustomer className="tdd" customer={customer} />
      </td>
    </tr>
  ));

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
              <Col lg={9}>
                <Row>
                  <Col Lg={3}>
                    <Form.Group controlId="companyName" className="mb-2 ">
                      <Form.Control
                        type="text"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        placeholder="Search Business ..."
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={3}>
                    <Form.Group controlId="statusFilter" className="mb-2  ">
                      <Form.Control
                        className="col_7"
                        as="select"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                      >
                        <option value="">Select Status</option>
                        {statusOptions.map((status) => (
                          <option key={status._id} value={status._id}>
                            {status.status}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={3}>
                    <Form.Group controlId="startDateFilter" className="mb-2">
                      <DatePicker
                        selected={selectedStartDate}
                        onChange={handleStartDateChange}
                        placeholderText="Start Date"
                        dateFormat="yyyy-MM-dd"
                        className="form-control date_picker"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={3}>
                    <Form.Group controlId="endDateFilter" className="mb-2">
                      <DatePicker
                        selected={selectedEndDate}
                        onChange={handleEndDateChange}
                        placeholderText="End Date"
                        dateFormat="yyyy-MM-dd"
                        className="form-control date_picker"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col lg={3}>
                <Row>
                  <Col Lg={9}>
                    <Form.Group className="mb-2 create ">
                      <Link to="/addCustomers">
                        <Button
                          className=" mr-3 "
                          variant="secondary"
                          type="submit"
                        >
                          Create Customer
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
