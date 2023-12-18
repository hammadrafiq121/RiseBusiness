import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row, Container, Button } from "react-bootstrap";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { MultiSelect } from "react-multi-select-component";
import { createTask } from "../app/reducers/taskSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { reset as resetCustomer } from "../app/reducers/customerSlice.js";
import { reset as resetStatus } from "../app/reducers/statusSlice.js";
import { reset as resetProduct } from "../app/reducers/productSlice.js";
import { getUsers } from "../app/reducers/userSlice.js";
import {
  getTaskCategories,
  reset as resetTaskCategory,
} from "../app/reducers/taskCategorySlice.js";
import Toast from "./Toast";
import Spinner from "./Spinner";

const AddTask = () => {
  const blankForm = {
    title: "",
    description: "",
    estimatedTime: "",
    startDate: "",
    endDate: "",
    comments: [{ text: "", time: new Date() }],
    taskCategory: "",
    assignee: "",
    priority: "",
    checklist: [
      {
        text: "",
        status: "",
      },
    ],
    createdBy: {
      name: "",
      id: "",
    },
  };

  const dispatch = useDispatch();
  const newCommentInputRef = useRef(null);

  const [formData, setFormData] = useState(blankForm);
  const { taskCategories } = useSelector((state) => state.taskCategories);

  const [taskChecklist, setTaskChecklist] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  const { user } = useSelector((state) => state.auth);
  const admin = user && user.userRole === "admin";
  const manager = user && user.userRole === "manager";
  const { users } = useSelector((state) => state.users);
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    const fetchData = async () => {
      if (admin || manager) {
        await dispatch(getUsers());
      }
      if (user) {
        await dispatch(resetTaskCategory());
        await dispatch(resetCustomer());
        await dispatch(resetStatus());
        await dispatch(resetProduct());

        await dispatch(getTaskCategories());
      }
    };
    fetchData();
  }, []);

  function addItem() {
    if (inputValue) {
      setTaskChecklist((prevChecklist) => [...prevChecklist, inputValue]);
      setInputValue(""); // Clear the input field
    }
  }
  function editItem(index) {
    setEditingIndex(index);
    setEditedValue(taskChecklist[index]);
  }

  function saveEdit() {
    setTaskChecklist((prevChecklist) =>
      prevChecklist.map((item, index) =>
        index === editingIndex ? editedValue : item
      )
    );
    setEditingIndex(null);
    setEditedValue("");
  }

  function deleteItem(indexToDelete) {
    setTaskChecklist((prevChecklist) =>
      prevChecklist.filter((_, index) => index !== indexToDelete)
    );
    setEditingIndex(null); // Cancel editing when deleting an item
  }

  // const assigneesList = users
  //   .filter(
  //     (item) =>
  //       item.userRole !== "admin" &&
  //       item.userRole !== "manager" &&
  //       item._id !== user._id
  //   )
  //   .map((user) => ({
  //     _id: user._id,
  //     value: user.userName,
  //     label: user.fullName,
  //   }));

  const assigneesList = users.filter(
    (item) => item.userRole !== "admin" && item._id !== user._id
  );

  const handleCommentChange = (index, value) => {
    const newComments = [...formData.comments];
    newComments[index] = { text: value, time: new Date() };
    setFormData((formData) => ({
      ...formData,
      comments: newComments,
    }));
  };

  const addCommentField = () => {
    const lastComment = formData.comments[formData.comments.length - 1];
    if (lastComment.text.trim() !== "") {
      setFormData((formData) => ({
        ...formData,
        comments: [...formData.comments, { text: "", time: new Date() }],
      }));
    } else {
      if (newCommentInputRef.current) {
        // Focus on the newly added comment field
        newCommentInputRef.current[formData.comments.length]?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract assignee IDs from the selected assignees
    // const assignees = await formData.assignees.map((assignee) => assignee._id);

    // Prepare checklist based on the new structure
    // const checklist = await taskChecklist.map((item) => ({
    //   text: item,
    //   statuses: assignees.map((assigneeId) => ({
    //     userId: assigneeId,
    //     status: "",
    //   })),
    // }));

    // Filter out comments with empty text
    const nonEmptyComments = formData.comments.filter(
      (comment) => comment.text.trim() !== ""
    );

    // Create a new array with comments containing only text and time properties
    const commentsForSubmission = nonEmptyComments.map(({ text, time }) => ({
      text,
      time,
    }));

    if (taskChecklist.length === 0) {
      alert("Add Task Check List");
    } else {
      const checklist = await taskChecklist.map((item) => ({
        text: item,
        status: "",
      }));

      await dispatch(
        createTask({
          ...formData,
          checklist: checklist,
          createdBy: { name: user.fullName, id: user._id },
          comments: commentsForSubmission,
        })
      );
      setFormData(blankForm);
      setTaskChecklist([]);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectorChange = (name, value) => {
    if (name === "startDate" || name === "endDate") {
      const { _d } = value;
      setFormData({
        ...formData,
        [name]: _d,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
                      name="estimatedTime"
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
                      onChange={(date) =>
                        handleSelectorChange("startDate", date)
                      }
                      required
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
                      onChange={(date) => handleSelectorChange("endDate", date)}
                      dateFormat="YYYY-MM-DD"
                      timeFormat="hh:mm A"
                      required
                      inputProps={{ step: 15 }}
                    />
                  </Form.Group>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2">
                <Form.Label className="label" column sm={3}>
                  Comments
                </Form.Label>
                <Col
                  sm={9}
                  style={{
                    maxHeight: "200px",
                    overflow: "auto",
                  }}
                >
                  {formData.comments.map((comment, index) => (
                    <Form.Control
                      key={index}
                      ref={newCommentInputRef}
                      className="input"
                      as="textarea"
                      placeholder=""
                      rows={2}
                      value={comment.text}
                      onChange={(e) =>
                        handleCommentChange(index, e.target.value)
                      }
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
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group as={Row} className="mb-2 submt">
                <button className="btn_f submit" variant="" type="submit">
                  Create
                </button>
              </Form.Group>
              <div className="drop-container">
                <Form.Group className="mb-2 p-10">
                  <Col sm={12}>
                    <Form.Select
                      className="input Priority"
                      name="taskCategory"
                      value={formData.taskCategory}
                      required
                      placeholder="taskCategory"
                      onChange={handleChange}
                    >
                      <option disabled value="">
                        Task Category
                      </option>
                      {taskCategories?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.taskCategory}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </div>
              {/* <Form.Group className="mb-2">
                <Col sm={12}>
                  <div className="Multiple-selector">
                    <div className="Multiple-option">
                      <MultiSelect
                        name="assignees"
                        options={assigneesList}
                        value={formData.assignees}
                        onChange={(selected) =>
                          handleSelectorChange("assignees", selected)
                        }
                        labelledBy="Select"
                      />
                    </div>
                  </div>
                </Col>
              </Form.Group> */}
              <div className="drop-container">
                <Form.Group className="mb-2 p-10">
                  <Col sm={12}>
                    <Form.Select
                      className="input Priority"
                      name="assignee"
                      value={formData.assignee}
                      required
                      placeholder="Assignee"
                      onChange={handleChange}
                    >
                      <option disabled value="">
                        Assignee
                      </option>
                      {assigneesList?.map((item) => (
                        <option value={item._id}>{item.fullName}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </div>
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
                <Col sm={10}>
                  <Form.Control
                    className="input check-list"
                    type="text"
                    value={inputValue}
                    placeholder="checklist"
                    required={taskChecklist.length === 0}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </Col>
                <Col sm={2}>
                  <button
                    onClick={addItem}
                    type="button"
                    className="plus-check mt-3"
                  >
                    +
                  </button>
                </Col>
                <Form.Group as={Row} className="mb-2">
                  <Col sm={12}>
                    <ol
                      style={{
                        maxHeight: "150px",
                        overflow: "auto",
                      }}
                    >
                      {taskChecklist?.map((item, index) => (
                        <li
                          style={{ padding: "5px 10px", margin: "5px" }}
                          key={index}
                        >
                          {index === editingIndex ? (
                            <>
                              <input
                                type="text"
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                              />
                              <button
                                type="button"
                                style={{
                                  padding: "0px 5px",
                                  marginLeft: "5px",
                                }}
                                onClick={saveEdit}
                              >
                                ✔
                              </button>
                            </>
                          ) : (
                            <>
                              {item}
                              <button
                                type="button"
                                style={{
                                  padding: "0px 4px",
                                  marginLeft: "5px",
                                }}
                                onClick={() => editItem(index)}
                              >
                                ✎
                              </button>
                              <button
                                type="button"
                                style={{
                                  padding: "0px 5px",
                                  marginLeft: "5px",
                                }}
                                onClick={() => deleteItem(index)}
                              >
                                ✖
                              </button>
                            </>
                          )}
                        </li>
                      ))}
                    </ol>
                  </Col>
                </Form.Group>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        {isLoading && <Spinner />}
        {isSuccess && <Toast isSuccess={isSuccess} message={message} />}
        {isError && <Toast isError={isError} message={message} />}
      </Container>
    </main>
  );
};

export default AddTask;
