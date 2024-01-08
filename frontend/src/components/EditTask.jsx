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
import { useNavigate, useParams } from "react-router-dom";
import {
  updateTask,
  getTask,
  reset as resetTasks,
} from "../app/reducers/taskSlice.js";
import {
  getTaskCategories,
  reset as resetTaskCategory,
} from "../app/reducers/taskCategorySlice.js";
import Spinner from "./Spinner";

const EditTask = () => {
  const { id } = useParams();
  const blankForm = {
    title: "",
    description: "",
    estimatedTime: "",
    startDate: "",
    endDate: "",
    comments: [{ text: "", name: "", time: new Date() }],
    newComment: { text: "", name: "", time: new Date() },
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
  const navigate = useNavigate();

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
  const { isLoading } = useSelector((state) => state.tasks);
  const [isDisabled, setIsDisabled] = useState(true);

  const canEdit = user._id === formData.assignee;

  const handleEdit = () => {
    setIsDisabled(!isDisabled);
  };

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
        await dispatch(resetTasks());

        await dispatch(getTaskCategories());

        const { payload } = await dispatch(getTask(id));

        setFormData({
          ...payload,
          newComment: { text: "", name: "", time: new Date() },
          startDate: { _d: "2023-11-09T19:00:00.000Z" },
          endDate: { _d: "2023-11-16T19:00:00.000Z" },
        });
        setTaskChecklist(payload.checklist);
      }
    };
    fetchData();
  }, []);

  function addItem() {
    if (inputValue) {
      setTaskChecklist((prevChecklist) => [
        ...prevChecklist,
        { text: inputValue, status: "" },
      ]);
      setInputValue(""); // Clear the input field
    }
  }

  function editItem(index) {
    setEditingIndex(index);
    setEditedValue(taskChecklist[index].text);
  }

  function saveEdit() {
    setTaskChecklist((prevChecklist) =>
      prevChecklist.map((item, index) => {
        if (index === editingIndex) {
          return { ...item, text: editedValue };
        } else {
          return item;
        }
      })
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

  const assigneesList = users.filter(
    (item) => item.userRole !== "admin" && item._id !== user._id
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCommentText = formData.newComment.text.trim();

    if (newCommentText !== "") {
      const newComments = [
        ...formData.comments,
        { text: newCommentText, name: user.fullName, time: new Date() },
      ];

      setFormData((prevFormData) => ({
        ...prevFormData,
        comments: newComments,
        newComment: { text: "", name: "", time: new Date() },
      }));
    }
    // console.log("Updated Task Form Data:", {
    //   ...formData,
    //   comments: formData.comments,
    //   checklist: taskChecklist,
    //   startDate: formData.startDate._d,
    //   endDate: formData.endDate._d,
    // });
    await dispatch(
      updateTask({
        taskId: formData._id,
        taskData: {
          ...formData,
          comments: formData.comments,
          checklist: taskChecklist,
          startDate: formData.startDate._d,
          endDate: formData.endDate._d,
        },
      })
    );
    // console.log({
    //   ...formData,
    //   comments: formData.comments,
    //   checklist: taskChecklist,
    //   startDate: formData.startDate._d,
    //   endDate: formData.endDate._d,
    // });
    navigate("/tasks/");
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

  const handleStatusChange = (index, newStatus) => {
    setTaskChecklist((prevChecklist) =>
      prevChecklist.map((item, itemIndex) => ({
        ...item,
        status: itemIndex === index ? newStatus : item.status,
      }))
    );
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
                    disabled={canEdit}
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
                    disabled={canEdit}
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
                      disabled={canEdit}
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
                      inputProps={{ step: 15, disabled: canEdit }}
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
                      inputProps={{ step: 15, disabled: canEdit }}
                    />
                  </Form.Group>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="comments" className="mb-2">
                <Form.Label column sm={3}>
                  Comments
                </Form.Label>
                {formData.comments.length > 0 && (
                  <Col
                    sm={9}
                    style={{
                      maxHeight: "175px",
                      overflow: "auto",
                    }}
                  >
                    {formData.comments.map((comment, index) => (
                      <div key={index} className="comment-container">
                        <Form.Control
                          disabled={comment.text[index]}
                          className="Select-status"
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
                {formData.comments.length > 0 && <Col sm={3}></Col>}

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

            <Col md={4}>
              <Form.Group as={Row} className="mb-2 submt">
                {isDisabled && (
                  <Button
                    className="mb-2 mr-2 btn_f"
                    variant="secondary"
                    type="button"
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                )}
                {!isDisabled && (
                  <Button
                    className="mb-2 mr-2 btn_f "
                    variant="secondary"
                    type="submit"
                  >
                    Update
                  </Button>
                )}
              </Form.Group>
              <div className="drop-container">
                <Form.Group className="mb-2 p-10">
                  <Col sm={12}>
                    <Form.Select
                      className="input Priority"
                      name="taskCategory"
                      value={formData.taskCategory}
                      required
                      disabled={canEdit}
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

              {(admin || manager) && (
                <div className="drop-container">
                  <Form.Group className="mb-2 p-10">
                    <Col sm={12}>
                      <Form.Select
                        className="input Priority"
                        name="assignee"
                        value={formData.assignee}
                        required
                        disabled={canEdit}
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
              )}
              <div className="drop-container">
                <Form.Group className="mb-2 p-10">
                  <Col sm={12}>
                    <Form.Select
                      className="input Priority"
                      name="priority"
                      value={formData.priority}
                      required
                      onChange={handleChange}
                      disabled={canEdit}
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
                {(admin || manager) && (
                  <>
                    <Col sm={10}>
                      <Form.Control
                        className="input check-list"
                        type="text"
                        value={inputValue}
                        placeholder="checklist"
                        required={taskChecklist.length === 0}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={canEdit}
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
                  </>
                )}

                <Form.Group as={Row} className="mb-2">
                  <Col sm={12}>
                    <ol
                      style={{
                        maxHeight: "150px",
                        overflow: "auto",
                      }}
                    >
                      {taskChecklist.map((item, index) => (
                        <>
                          <hr />
                          <div
                            key={index}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {index === editingIndex ? (
                              <>
                                <input
                                  type="text"
                                  value={editedValue}
                                  onChange={(e) =>
                                    setEditedValue(e.target.value)
                                  }
                                />
                                <button
                                  disabled={canEdit}
                                  type="button"
                                  style={{
                                    padding: "0px 5px",
                                    marginLeft: "5px",
                                  }}
                                  onClick={() => saveEdit()}
                                >
                                  ✔
                                </button>
                              </>
                            ) : (
                              <>
                                <div style={{ width: "50%" }}>
                                  {index + 1}. {item.text}
                                </div>

                                <div style={{ width: "20%" }}>
                                  <button
                                    disabled={canEdit}
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
                                    disabled={canEdit}
                                    type="button"
                                    style={{
                                      padding: "0px 5px",
                                      marginLeft: "5px",
                                    }}
                                    onClick={() => deleteItem(index)}
                                  >
                                    ✖
                                  </button>
                                </div>
                                <Form.Select
                                  style={{ width: "30%" }}
                                  value={item.status}
                                  onChange={(e) =>
                                    handleStatusChange(index, e.target.value)
                                  }
                                  disabled={isDisabled}
                                >
                                  <option value="">Not started</option>
                                  <option value="in-progress">
                                    In Progress
                                  </option>
                                  <option value="done">Done</option>
                                </Form.Select>
                              </>
                            )}
                          </div>
                        </>
                      ))}
                    </ol>
                  </Col>
                </Form.Group>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        {isLoading && <Spinner />}
      </Container>
    </main>
  );
};

export default EditTask;
