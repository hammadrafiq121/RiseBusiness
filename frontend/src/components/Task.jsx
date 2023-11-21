import React, { useState, useRef } from "react";
import { Col, Form, Row, Container } from "react-bootstrap";
import "react-phone-input-2/lib/style.css";
import { MultiSelect } from "react-multi-select-component";
import DatePicker from "react-datepicker";
import moment from "moment";

const Task = () => {
  const newCommentInputRef = useRef(null);

  const blankForm = {
    TaskTitle: "",
    Description: "",
    Estimate: "",
    comments: [""],
    TaskCategory: "",
    priority: "",
    comment: "",
    watchers: [],
    assignee: [],
  };

  const [formData, setFormData] = useState(blankForm);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleCommentChange = (index, value) => {
    const newComments = [...formData.comments];
    newComments[index] = {
      text: value,
      timestamp: newComments[index]
        ? newComments[index].timestamp
        : moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    setFormData((formData) => ({
      ...formData,
      comments: newComments,
    }));
  };

  const addCommentField = () => {
    setFormData((formData) => ({
      ...formData,
      comments: [
        ...formData.comments,
        { text: "", timestamp: moment().format("YYYY-MM-DD HH:mm:ss") },
      ],
    }));
    if (newCommentInputRef.current) {
      newCommentInputRef.current.focus();
    }
  };

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

  return (
    <main className="AddTask_main">
      <Container className="AddTask-container">
        <Form onSubmit={handleSubmit}>
          <Row className="AddTask_row">
            <Col md={8}>
              <Form.Group as={Row} controlId="TaskTitle" className="mb-2">
                <Form.Label className="Task-label" column sm={3}>
                  Task Title
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className="input"
                    type="text"
                    placeholder=""
                    required
                    name="TaskTitle"
                    value={formData.TaskTitle}
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
                    placeholder=""
                    rows={2}
                    name="Description"
                    value={formData.Description}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2">
                <Form.Label className="Task-label" column sm={3}>
                  Estimate Time
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className="input"
                    type="text"
                    placeholder="Type in Hours"
                    required
                    name="Estimate"
                    value={formData.Estimate}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={3}></Form.Label>
                <Col sm={3}>
                  <Form.Group
                    as={Col}
                    controlId="startDateFilter"
                    className="mb-2"
                  >
                    <Form.Label className="Task-label">Start Date</Form.Label>
                    <DatePicker
                      selected={selectedStartDate}
                      onChange={handleStartDateChange}
                      placeholderText=""
                      dateFormat="yyyy-MM-dd"
                      className="form-control date_picker start"
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
                    <DatePicker
                      selected={selectedEndDate}
                      onChange={handleEndDateChange}
                      placeholderText=""
                      dateFormat="yyyy-MM-dd"
                      className="form-control date_picker start"
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
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        comment: e.target.value,
                      })
                    }
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group as={Row} className="mb-2 submt">
                {/* <button className="btn_f submit" variant="secondary" type="submit">
                  Create Task
                </button> */}
                <button
                  className="btn_f submit Create-task"
                  variant="secondary"
                  type="submit"
                >
                  Create Task
                </button>
              </Form.Group>
              <div className="drop-container">
                <Form.Group className="mb-2">
                  <Col sm={12}>
                    <Form.Select
                      className="input"
                      name="TaskCategory"
                      value={formData.TaskCategory}
                      required
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          TaskCategory: e.target.value,
                        })
                      }
                    >
                      <option value="">Task Category</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Web Design">Web Design</option>
                      <option value="Mobile App Development">
                        Mobile App Development
                      </option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </div>

              <Form.Group className="mb-2">
                <Col sm={12}>
                  <div className="Multiple-selector">
                    <div className="Multiple-option">
                      <MultiSelect
                        name="assignee"
                        options={data}
                        value={formData.assignee}
                        onChange={(selected) =>
                          handleInputChange("assignee", selected)
                        }
                        labelledBy="assignee"
                      />
                    </div>

                    <div className="Multiple-option">
                      <MultiSelect
                        name="watchers"
                        options={data}
                        value={formData.watchers}
                        onChange={(selected) =>
                          handleInputChange("watchers", selected)
                        }
                        labelledBy="watchers"
                      />
                    </div>
                  </div>
                </Col>
              </Form.Group>

              <div className="drop-container">
                <Form.Group className="mb-2">
                  <Col sm={12}>
                    <Form.Select
                      className="input Priority"
                      name="priority"
                      value={formData.priority}
                      required
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priority: e.target.value,
                        })
                      }
                    >
                      <option value="">Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </div>

              {/* <Form.Group as={Row} className="mb-2">
                <Col sm={11}>
                  {formData.comments.map((comment, index) => (
                    <Form.Control
                    key={index}
                      ref={newCommentInputRef}
                      className="input check-list "
                      as="textarea"
                      placeholder="Check-list"
                      
                      value={comment}
                      onChange={(e) => handleCommentChange(index, e.target.value)}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={addCommentField}
                    className="plus-check"
                  >
                    +
                  </button>
                </Col>
              </Form.Group> */}

              <Form.Group as={Row} className="mb-2">
                <Col sm={11}>
                  {formData.comments.map((comment, index) => (
                    <div key={index}>
                      <Form.Control
                        key={index}
                        ref={newCommentInputRef}
                        className="input check-list "
                        as="textarea"
                        placeholder="Check-list"
                        value={comment.text}
                        onChange={(e) =>
                          handleCommentChange(index, e.target.value)
                        }
                      />
                      {comment.text && <p>{comment.timestamp}</p>}
                    </div>
                  ))}
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
          </Row>
        </Form>
      </Container>
    </main>
  );
};

export default Task;
