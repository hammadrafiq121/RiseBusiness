import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { MultiSelect } from "react-multi-select-component";
import { connect, useSelector } from "react-redux";
import { addCustomer, reset } from "../app/reducers/customerSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import statusApi from "../services/statusApi";
import productApi from "../services/productApi";

const AddCustomer = () => {
  const dispatch = useDispatch();
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
    comments: "",
    status: "",
    products: [],
  };
  const [formData, setFormData] = useState(blankForm);
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.customers
  );
  const [statusOptions, setStatusOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    // Fetch statuses from your API
    async function fetchStatuses() {
      const data = await statusApi.getAllStatus();
      setStatusOptions(data);
    }
    fetchStatuses();

    async function fetchProducts() {
      const data = await productApi.getProducts();
      setProductOptions(data);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      toast.loading(message);
    }
    if (isSuccess) {
      toast.dismiss();
      toast.success(message);
      setFormData(blankForm);
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
  }, [isError, isLoading, isSuccess, message]);

  // const productNames = [
  //   { label: "Hospital Stretchers", value: "hospital-stretchers" },
  //   { label: "Defibrillators", value: "defibrillators" },
  //   { label: "Anesthesia Machines", value: "anesthesia-machines" },
  //   { label: "Patient Monitors", value: "patient-monitors" },
  // ];

  const products = productOptions.map((product) => ({
    label: product.product,
    value: product.slug,
    _id: product._id,
  }));

  const handleChange = async (event) => {
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
  // const handleProductChange = (name, value) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  //   console.log(formData.products);
  // };

  // const handleProductChange = (name, value) => {
  //   const productIds = value.map((product) => product._id);

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: productIds, // Assign the array of _id values to the products field
  //   }));

  //   console.log(formData.products);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    await dispatch(addCustomer(formData)); // Dispatch the addCustomer action
  };

  return (
    <main className="Addcustomer_main">
      <Container className="Addcustomer-container">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <Form.Group as={Row} controlId="companyName" className="mb-2">
                <Form.Label className="label" column sm={3}>
                  Company Name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className="input"
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
                <Form.Label className="label" column sm={3}>
                  Phone
                </Form.Label>
                <Col sm={9}>
                  <PhoneInput
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={(value) =>
                      handleInputChange("companyPhone", value)
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="companyFax" className="mb-2">
                <Form.Label className="label" column sm={3}>
                  Fax
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className="input"
                    type="text"
                    placeholder=""
                    name="companyFax"
                    value={formData.companyFax}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="companyAddress" className="mb-2">
                <Form.Label className="label" column sm={3}>
                  Address
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className="input"
                    type="text"
                    placeholder=""
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="country" className="mb-2">
                <Form.Label className="label" column sm={3}>
                  Country
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className="input"
                    type="text"
                    placeholder=""
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="SCZ" className="mb-2">
                <Form.Label column sm={3}></Form.Label>
                <Col sm={3}>
                  <Form.Group as={Col} controlId="state" className="mb-2">
                    <Form.Label className="label">State</Form.Label>
                    <Form.Control
                      className="input"
                      type="text"
                      placeholder=""
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={3}>
                  <Form.Group as={Col} controlId="city" className="mb-2">
                    <Form.Label className="label">City</Form.Label>
                    <Form.Control
                      className="input"
                      type="text"
                      placeholder=""
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={3}>
                  <Form.Group as={Col} controlId="zipCode" className="mb-2">
                    <Form.Label className="label">Zip Code</Form.Label>
                    <Form.Control
                      className="input"
                      type="number"
                      placeholder=""
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Form.Group>
              <h5 className="label">Contact Person</h5>
              <Form.Group as={Row} controlId="personName" className="mb-2">
                <Form.Label className="label" column sm={3}>
                  Name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className="input"
                    type="text"
                    placeholder=""
                    name="personName"
                    value={formData.personName}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="personPhone" className="mb-2">
                <Form.Label className="label" column sm={3}>
                  Phone
                </Form.Label>
                <Col sm={9}>
                  <PhoneInput
                    name="personPhone"
                    value={formData.personPhone}
                    onChange={(value) =>
                      handleInputChange("personPhone", value)
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="personEmail" className="mb-2">
                <Form.Label className="label" column sm={3}>
                  Email
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className="input"
                    type="email"
                    placeholder=""
                    name="personEmail"
                    value={formData.personEmail}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="comments" className="mb-2">
                <Form.Label className="label" column sm={3}>
                  Comments
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className="input"
                    as="textarea"
                    placeholder=""
                    rows={3}
                    value={formData.comments}
                    name="comments"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md={4}>
              <div className="drop-container">
                <Form.Group as={Row} className="mb-2">
                  <Col sm={12}>
                    <Form.Select
                      className="input"
                      value={formData.status}
                      name="status"
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select Status
                      </option>

                      {statusOptions?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.status}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                  <Col sm={12}>
                    <MultiSelect
                      name="products"
                      options={products}
                      value={formData.products}
                      onChange={(selected) =>
                        handleInputChange("products", selected)
                      }
                      labelledBy="Select"
                    />
                  </Col>
                </Form.Group>
              </div>
              <Form.Group as={Row} className="mb-2">
                <button
                  className="mb-2 mr-2 mt-3 btn_f "
                  variant="secondary"
                  type="submit"
                >
                  Submit
                </button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </main>
  );
};

export default connect(null)(AddCustomer);
