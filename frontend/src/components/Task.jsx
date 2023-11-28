import React, { useState, useRef } from "react";
import { Col, Form, Row, Container } from "react-bootstrap";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { MultiSelect } from "react-multi-select-component";

const Task = () => {
  const blankForm = {
    title: "",
    description: "",
    estimatedTime: "",
    startDate: Date,
    endDate: Date,
    comments: [""],
    taskCategory: "",
    assignee: [],
    priority: "",
    isExpired: false,
  };

  const [formData, setFormData] = useState(blankForm);

  const data = [
    {
      label: "product",
      value: " product",
    },
    {
      label: "slug",
      value: " slug",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Data:", formData);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectorChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <main className="AddTask_main">
      <Container className="AddTask-container">
        <Form onSubmit={handleSubmit}>
          <Row className="AddTask_row">
            <Col md={8}>
              <Form.Group as={Row} controlId="TaskTitle" className="mb-2">
                <Form.Label className="Task-label" column sm={3}>
                  Title
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className="input"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2">
                <Form.Label className="Task-label" column sm={3}>
                  Description
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className="input Task-field"
                    as="textarea"
                    rows={2}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              {/* <Form.Group as={Row} className="mb-2">
                <Form.Label className="Task-label" column sm={3}>
                  Estimate Time (Hours)
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className="input"
                    type="number"
                    required
                    name="Estimate"
                    value={formData.estimatedTime}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group> */}

              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={3}></Form.Label>

                <Col sm={3}>
                  <Form.Group
                    as={Col}
                    controlId="startDateFilter"
                    className="mb-2"
                  >
                    <Form.Label className="Task-label">
                      Est.Time - Hrs
                    </Form.Label>
                    <Form.Control
                      className="input"
                      type="number"
                      required
                      name="Estimate"
                      value={formData.estimatedTime}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col sm={3}>
                  <Form.Group
                    as={Col}
                    controlId="startDateFilter"
                    className="mb-2"
                  >
                    <Form.Label className="Task-label">Start Date</Form.Label>
                    <DateTime
                      value={formData.startDate}
                      onChange={handleChange}
                      dateFormat="YYYY-MM-DD"
                      timeFormat="hh:mm A"
                      inputProps={{ step: 15 }}
                    />
                  </Form.Group>
                </Col>

                <Col sm={3}>
                  <Form.Group
                    as={Col}
                    controlId="endDateFilter"
                    className="mb-2"
                  >
                    <Form.Label className="Task-label">End Date</Form.Label>
                    <DateTime
                      value={formData.endDate}
                      onChange={handleChange}
                      dateFormat="YYYY-MM-DD"
                      timeFormat="hh:mm A"
                      inputProps={{ step: 15 }}
                    />
                  </Form.Group>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2">
                <Form.Label className="Task-label" column sm={3}>
                  Comments
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className="input"
                    type="text"
                    placeholder=""
                    required
                    name="comment"
                    value={formData.comments}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group as={Row} className="mb-2 submt">
                <button className="btn_f submit" variant="" type="submit">
                  Create
                </button>
              </Form.Group>

              <Form.Group className="mb-2">
                <Col sm={12}>
                  <div className="Multiple-selector">
                    <div className="Multiple-option">
                      <MultiSelect
                        name="assignee"
                        options={data}
                        value={formData.assignee}
                        onChange={(selected) =>
                          handleSelectorChange("assignee", selected)
                        }
                        labelledBy="Select"
                      />
                    </div>
                  </div>
                </Col>
              </Form.Group>
              <div className="drop-container">
                <Form.Group className="mb-2 p-10">
                  <Col sm={12}>
                    <Form.Select
                      className="input Priority"
                      name="priority"
                      value={formData.priority}
                      required
                      onChange={handleChange}
                    >
                      <option disabled value="">
                        Priority
                      </option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </div>
              <Form.Group as={Row} className="mb-2">
                <Col sm={11}>
                  {formData.comments.map((comment, index) => (
                    <Form.Control
                      key={index}
                      className="input check-list "
                      as="textarea"
                      value={comment}
                      onChange={(e) =>
                        handleSelectorChange(index, e.target.value)
                      }
                    />
                  ))}
                  <button type="button" className="plus-check">
                    +
                  </button>
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </main>
  );
};

export default Task;
