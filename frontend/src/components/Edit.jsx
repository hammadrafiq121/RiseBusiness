import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner.jsx";
import {
  updateCustomer,
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
import { reset as resetUsers } from "../app/reducers/userSlice.js";
import { useLocation } from "react-router-dom";

const Edit = () => {
  const location = useLocation();
  const filteredCustomers = location.state || [];

  const [isDisabled, setIsDisabled] = useState(true);
  const blankForm = {
    companyName: "",
    companyPhone: "",
    companyFax: "",
    companyAddress: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    personName: "",
    personPhone: "",
    personEmail: "",
    comments: [{ text: "", name: "", time: new Date() }],
    newComment: { text: "", name: "", time: new Date() },
    status: "",
    products: [],
  };
  const { id } = useParams();
  const [customerId, setCustomerId] = useState(+id);
  const [customers, setCustomers] = useState(filteredCustomers);
  const [formData, setFormData] = useState(blankForm);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { statuses } = useSelector((state) => state.statuses);
  const { products } = useSelector((state) => state.products);
  const { isLoading } = useSelector((state) => state.customers);
  const newCommentInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await dispatch(resetUsers());
        await dispatch(resetCustomer());
        await dispatch(resetStatus());
        await dispatch(resetProduct());

        await dispatch(getAllStatus());
        await dispatch(getProducts());
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const setData = async () => {
      if (user) {
        const customer = customers[customerId];
        const selectedProducts = await products?.filter((product) =>
          customer.products?.includes(product._id)
        );
        const mappedProducts = selectedProducts.map((product) => ({
          label: product.product,
          value: product.slug,
          _id: product._id,
        }));
        setFormData({
          ...customer,
          products: mappedProducts,
          newComment: { text: "", name: "", time: new Date() },
        });
      }
    };
    setData();
  }, [customerId]);

  const productNames = products.map((product) => ({
    label: product.product,
    value: product.slug,
    _id: product._id,
  }));

  const handleEdit = () => {
    setIsDisabled(!isDisabled);
  };

  const handleCommentChange = (index, value) => {
    const newComments = [...formData.comments];
    newComments[index] = { text: value, name: user.fullName, time: new Date() };
    setFormData((formData) => ({
      ...formData,
      comments: newComments,
    }));
  };

  const handleNewCommentChange = (value) => {
    setFormData((formData) => ({
      ...formData,
      newComment: { text: value, name: user.fullName, time: new Date() },
    }));
  };

  const addCommentField = () => {
    if (formData.newComment.text.trim() !== "") {
      const newComments = [...formData.comments, { ...formData.newComment }];
      setFormData((formData) => ({
        ...formData,
        comments: newComments,
        newComment: { text: "", name: "", time: new Date() },
      }));
    } else {
      if (newCommentInputRef.current) {
        newCommentInputRef.current.focus();
      }
    }
  };

  const handleChange = (event) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const newCommentText = formData.newComment.text.trim();

    if (newCommentText !== "") {
      const newComments = [
        ...formData.comments,
        { text: newCommentText, name: user.fullName, time: new Date() },
      ];

      setFormData((formData) => ({
        ...formData,
        comments: newComments,
        newComment: { text: "", name: "", time: new Date() },
      }));
    }

    await dispatch(
      updateCustomer({
        id: formData._id,
        customer: formData,
      })
    );
    console.log(formData.products?.map((product) => product._id));
    setCustomers((prev) =>
      prev.map((item, index) =>
        index === customerId
          ? {
              ...formData,
              products: formData.products?.map((product) => product._id),
            }
          : item
      )
    );
  };
  const handleNext = () => {
    setCustomerId((prevCustomerId) => {
      const nextId = prevCustomerId + 1;
      if (nextId < customers.length) {
        navigate(`/customers/edit/${nextId}`);
        return nextId;
      } else {
        return prevCustomerId;
      }
    });
  };

  const handlePrevious = () => {
    setCustomerId((prevCustomerId) => {
      const previousId = prevCustomerId - 1;
      if (previousId >= 0) {
        navigate(`/customers/edit/${previousId}`);
        return previousId;
      } else {
        return prevCustomerId;
      }
    });
  };

  return (
    <main className=" editcustomer-div">
      <Container className="editcustomer-container">
        <Form onSubmit={handleUpdate}>
          <Row>
            <Col md={8}>
              <Form.Group as={Row} controlId="companyName" className="mb-2">
                <Form.Label column sm={3}>
                  Company Name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled={isDisabled}
                    type="text"
                    placeholder=""
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="companyPhone" className="mb-2">
                <Form.Label column sm={3}>
                  Phone
                </Form.Label>
                <Col sm={9}>
                  <PhoneInput
                    disabled={isDisabled}
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={(value) =>
                      handleInputChange("companyPhone", value)
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="companyFax" className="mb-2">
                <Form.Label column sm={3}>
                  Fax
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled={isDisabled}
                    type="text"
                    placeholder=""
                    name="companyFax"
                    value={formData.companyFax}
                    onChange={handleChange}
                    // required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="companyAddress" className="mb-2">
                <Form.Label column sm={3}>
                  Address
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled={isDisabled}
                    type="text"
                    placeholder=""
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    // required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="country" className="mb-2">
                <Form.Label column sm={3}>
                  Country
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled
                    as="select"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    // required
                  >
                    <option value={formData.country} key={formData.country}>
                      {formData.country}
                    </option>
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="SCZ" className="mb-2">
                <Form.Label column sm={3}></Form.Label>
                <Col sm={3}>
                  <Form.Group as={Col} controlId="state" className="mb-2">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      className="form-control"
                      disabled
                      as="select"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    >
                      <option value={formData.state} key={formData.state}>
                        {formData.state}
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col sm={3}>
                  <Form.Group as={Col} controlId="city" className="mb-2">
                    <Form.Label>City</Form.Label>

                    <Form.Control
                      disabled={isDisabled}
                      type="text"
                      placeholder=""
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      // required
                    />
                  </Form.Group>
                </Col>

                <Col sm={3}>
                  <Form.Group as={Col} controlId="zipCode" className="mb-2">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      disabled={isDisabled}
                      type="number"
                      style={{ backgroundColor: "#ced4da" }}
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      // required
                    />
                  </Form.Group>
                </Col>
              </Form.Group>

              <h5>Contact Person</h5>
              <Form.Group as={Row} controlId="personName" className="mb-2">
                <Form.Label column sm={3}>
                  Name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled={isDisabled}
                    type="text"
                    placeholder=""
                    name="personName"
                    value={formData.personName}
                    onChange={handleChange}
                    // required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="personPhone" className="mb-2">
                <Form.Label column sm={3}>
                  Phone
                </Form.Label>
                <Col sm={9}>
                  <PhoneInput
                    disabled={isDisabled}
                    name="personPhone"
                    value={formData.personPhone}
                    onChange={(value) =>
                      handleInputChange("personPhone", value)
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="personEmail" className="mb-2">
                <Form.Label column sm={3}>
                  Email
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled={isDisabled}
                    type="email"
                    placeholder=""
                    name="personEmail"
                    value={formData.personEmail}
                    onChange={handleChange}
                    // required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="comments" className="mb-2">
                <Form.Label column sm={3}>
                  Comments
                </Form.Label>
                {formData.comments?.length > 0 && (
                  <Col
                    sm={9}
                    style={{
                      maxHeight: "175px",
                      overflow: "auto",
                    }}
                  >
                    {formData.comments?.map((comment, index) => (
                      <div key={index} className="comment-container">
                        <Form.Control
                          disabled={comment.text[index]}
                          className="Select-status mb-1"
                          as="textarea"
                          placeholder=""
                          rows={2}
                          value={comment.text}
                          onChange={(e) =>
                            handleCommentChange(index, e.target.value)
                          }
                        />
                        <div className="comment-details">
                          {comment.name && (
                            <span className="comment-time">
                              {comment.name}
                              {" •"}
                            </span>
                          )}
                          <span className="comment-time">
                            {new Date(comment.time).toLocaleString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </Col>
                )}
                {formData.comments?.length > 0 && <Col sm={3}></Col>}
                <Col sm={9}>
                  <Form.Control
                    ref={newCommentInputRef}
                    disabled={isDisabled}
                    className="Select-status mt-3"
                    as="textarea"
                    placeholder=""
                    rows={2}
                    value={formData.newComment.text}
                    onChange={(e) => handleNewCommentChange(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={addCommentField}
                    className="plus-check"
                  >
                    +
                  </button>
                </Col>
              </Form.Group>
            </Col>

            <Col md={4} className="mr-5">
              <div className="drop-container">
                <Form.Group className="d-flex justify-content-end text-center edit-btns">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handlePrevious}
                    disabled={customerId === 0}
                    className="mb-2"
                  >
                    Previuos
                  </Button>
                  {isDisabled && (
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={handleEdit}
                      className="mb-2"
                    >
                      Edit
                    </Button>
                  )}

                  {!isDisabled && (
                    <Button variant="secondary" type="submit" className="mb-2">
                      Save
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleNext}
                    disabled={customerId === customers.length - 1}
                    className="mb-2 "
                  >
                    Next
                  </Button>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                  <Col sm={12}>
                    <Form.Select
                      disabled={isDisabled}
                      value={formData.status}
                      name="status"
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      {statuses.map((status) => (
                        <option
                          key={status._id}
                          value={status._id}
                          defaultValue={status._id === formData.status}
                        >
                          {status.status}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 drop">
                  <Col sm={12}>
                    <MultiSelect
                      disabled={isDisabled}
                      name="products"
                      options={productNames}
                      value={formData.products}
                      onChange={(selected) =>
                        handleInputChange("products", selected)
                      }
                      labelledBy="Select"
                    />
                  </Col>
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Form>
        {isLoading && <Spinner />}
      </Container>
    </main>
  );
};

export default Edit;
