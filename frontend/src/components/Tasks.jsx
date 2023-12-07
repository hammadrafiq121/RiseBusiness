// import React, { useState } from "react";
// import { Table, Modal, Button } from "react-bootstrap";
// import ViewTaskModal from "./ViewTaskModal";
// import EditTaskModal from "./EditTaskModal";
// const Tasks = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);

//   const tasks = [
//     {
//       _id: "6543df12ae08bc589e94e895",
//       title: "Cillum modi temporib",
//       description: "Ipsum vitae aliquip ",
//       estimatedTime: 78,
//       startDate: "2023-11-01T19:00:00.000Z",
//       endDate: "2023-11-02T19:00:00.000Z",
//       comment: "In est commodo temp",
//       taskCategory: "web",
//       assignees: ["653bf33503cda4a906db0137", "653becb4c6e748783eaf7dd7"],
//       priority: "Medium",
//       checklist: [
//         {
//           text: "Omnis commodo omnis ",
//           statuses: [
//             {
//               userId: "653bf33503cda4a906db0137",
//               status: "done",
//             },
//             {
//               userId: "653becb4c6e748783eaf7dd7",
//               status: "",
//             },
//           ],
//         },
//       ],
//       isExpired: false,
//       createdAt: "2023-11-02T17:40:34.840Z",
//       updatedAt: "2023-11-02T17:40:34.840Z",
//       __v: 0,
//     },
//     {
//       _id: "6543df4bae08bc589e94e898",
//       title: "Cillum modi temporib",
//       description: "Ipsum vitae aliquip ",
//       estimatedTime: 78,
//       startDate: "2023-11-01T19:00:00.000Z",
//       endDate: "2023-11-03T19:00:00.000Z",
//       comment: "In est commodo temp",
//       taskCategory: "sale",
//       assignees: ["653bc17fbb97684524048077", "653bc195bb9768452404807c"],
//       priority: "Medium",
//       checklist: [
//         {
//           text: "Omnis commodo omnis ",
//           statuses: [
//             {
//               userId: "653bc17fbb97684524048077",
//               status: "",
//             },
//             {
//               userId: "653bc195bb9768452404807c",
//               status: "in-prgress",
//             },
//           ],
//         },
//         {
//           text: "Ipsam molestias culp",
//           statuses: [
//             {
//               userId: "653bc17fbb97684524048077",
//               status: "done",
//             },
//             {
//               userId: "653bc195bb9768452404807c",
//               status: "",
//             },
//           ],
//         },
//       ],
//       isExpired: false,
//       createdAt: "2023-11-02T17:41:31.720Z",
//       updatedAt: "2023-11-02T17:41:31.720Z",
//       __v: 0,
//     },
//     {
//       _id: "6543df79ae08bc589e94e89b",
//       title: "Cillum modi temporib",
//       description: "Ipsum vitae aliquip ",
//       estimatedTime: 7,
//       startDate: "2023-11-01T19:00:00.000Z",
//       endDate: "2023-11-03T19:00:00.000Z",
//       comment: "In est commodo temp",
//       taskCategory: "lead",
//       assignees: [
//         "652f20ca79548ee488bccfd3",
//         "652f210179548ee488bccfe0",
//         "652f208979548ee488bccfca",
//       ],
//       priority: "Low",
//       checklist: [
//         {
//           text: "Omnis commodo omnis ",
//           statuses: [
//             {
//               userId: "652f20ca79548ee488bccfd3",
//               status: "",
//             },
//             {
//               userId: "652f210179548ee488bccfe0",
//               status: "",
//             },
//             {
//               userId: "652f208979548ee488bccfca",
//               status: "",
//             },
//           ],
//         },
//         {
//           text: "Ipsam molestias culp",
//           statuses: [
//             {
//               userId: "652f20ca79548ee488bccfd3",
//               status: "done",
//             },
//             {
//               userId: "652f210179548ee488bccfe0",
//               status: "in-progress",
//             },
//             {
//               userId: "652f208979548ee488bccfca",
//               status: "",
//             },
//           ],
//         },
//         {
//           text: "Omnis commodo omn asdasd",
//           statuses: [
//             {
//               userId: "652f20ca79548ee488bccfd3",
//               status: "done",
//             },
//             {
//               userId: "652f210179548ee488bccfe0",
//               status: "",
//             },
//             {
//               userId: "652f208979548ee488bccfca",
//               status: "done",
//             },
//           ],
//         },
//       ],
//       isExpired: false,
//       createdAt: "2023-11-02T17:42:17.050Z",
//       updatedAt: "2023-11-02T17:42:17.050Z",
//       __v: 0,
//     },
//     {
//       _id: "6543df8aae08bc589e94e89e",
//       title: "Cillum modi temporib",
//       description: "Ipsum vitae aliquip ",
//       estimatedTime: 10,
//       startDate: "2023-11-01T19:00:00.000Z",
//       endDate: "2023-11-03T19:00:00.000Z",
//       comment: "In est commodo temp",
//       taskCategory: "lead",
//       assignees: [
//         "652f204c79548ee488bccfc1",
//         "652f200c79548ee488bccfb8",
//         "652f1fd979548ee488bccfaf",
//       ],
//       priority: "Low",
//       checklist: [
//         {
//           text: "Ipsam molestias culp",
//           statuses: [
//             {
//               userId: "652f204c79548ee488bccfc1",
//               status: "done",
//             },
//             {
//               userId: "652f200c79548ee488bccfb8",
//               status: "in-progress",
//             },
//             {
//               userId: "652f1fd979548ee488bccfaf",
//               status: "",
//             },
//           ],
//         },
//         {
//           text: "Omnis commodo omn asdasd",
//           statuses: [
//             {
//               userId: "652f204c79548ee488bccfc1",
//               status: "",
//             },
//             {
//               userId: "652f200c79548ee488bccfb8",
//               status: "",
//             },
//             {
//               userId: "652f1fd979548ee488bccfaf",
//               status: "",
//             },
//           ],
//         },
//       ],
//       isExpired: false,
//       createdAt: "2023-11-02T17:42:34.679Z",
//       updatedAt: "2023-11-02T17:42:34.679Z",
//       __v: 0,
//     },
//     {
//       _id: "6543df96ae08bc589e94e8a1",
//       title: "Cillum modi temporib",
//       description: "Ipsum vitae aliquip ",
//       estimatedTime: 10,
//       startDate: "2023-11-01T19:00:00.000Z",
//       endDate: "2023-11-03T19:00:00.000Z",
//       comment: "In est commodo temp",
//       taskCategory: "lead",
//       assignees: [
//         "652f204c79548ee488bccfc1",
//         "652f200c79548ee488bccfb8",
//         "652f1fd979548ee488bccfaf",
//       ],
//       priority: "High",
//       checklist: [
//         {
//           text: "Ipsam molestias culp",
//           statuses: [
//             {
//               userId: "652f204c79548ee488bccfc1",
//               status: "in-progress",
//             },
//             {
//               userId: "652f200c79548ee488bccfb8",
//               status: "",
//             },
//             {
//               userId: "652f1fd979548ee488bccfaf",
//               status: "done",
//             },
//           ],
//         },
//         {
//           text: "Omnis commodo omn asdasd",
//           statuses: [
//             {
//               userId: "652f204c79548ee488bccfc1",
//               status: "done",
//             },
//             {
//               userId: "652f200c79548ee488bccfb8",
//               status: "in-progress",
//             },
//             {
//               userId: "652f1fd979548ee488bccfaf",
//               status: "",
//             },
//           ],
//         },
//       ],
//       isExpired: false,
//       createdAt: "2023-11-02T17:42:46.231Z",
//       updatedAt: "2023-11-02T17:42:46.231Z",
//       __v: 0,
//     },
//   ];

//   const openModal = (task) => {
//     setSelectedTask(task);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setSelectedTask(null);
//     setShowModal(false);
//   };

//   function getUserStatus(item, userId) {
//     const userStatus = item.statuses.find((status) => status.userId === userId);
//     return userStatus ? userStatus.status : "";
//   }
//   return (
//     <div>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Assignees</th>
//             <th>Priority</th>
//             <th>Checklist</th>
//             <th>Due Date</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task) => (
//             <tr key={task._id}>
//               <td>{task.title}</td>
//               <td>{task.assignees.map((assignee) => assignee).join(", ")}</td>
//               <td>{task.priority}</td>
//               <td>
//                 {task.checklist.map((item, i) => (
//                   <div key={i}>{item.text}</div>
//                 ))}
//               </td>
//               <td>{task.endDate}</td>
//               <td>
//                 <Button variant="primary" onClick={() => openModal(task)}>
//                   View
//                 </Button>
//                 <Button variant="primary" onClick={() => openModal(task)}>
//                   Edit
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <ViewTaskModal
//         selectedTask={selectedTask}
//         closeModal={closeModal}
//         showModal={showModal}
//         getUserStatus={getUserStatus}
//       />
//       <EditTaskModal
//         selectedTask={selectedTask}
//         closeModal={closeModal}
//         showModal={showModal}
//         getUserStatus={getUserStatus}
//       />
//     </div>
//   );
// };

// export default Tasks;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "./Spinner";
import Pagination from "./Pagination";
import { reset as resetCustomer } from "../app/reducers/customerSlice.js";
import { reset as resetStatus } from "../app/reducers/statusSlice.js";
import { reset as resetProduct } from "../app/reducers/productSlice.js";
import { getUsers, reset as resetUsers } from "../app/reducers/userSlice.js";
import { getAllTasks, reset as resetTasks } from "../app/reducers/taskSlice.js";
import {
  getTaskCategories,
  reset as resetTaskCat,
} from "../app/reducers/taskCategorySlice.js";
// import ViewTaskModal from "./ViewTaskModal";
import { EyeFill, PencilSquare } from "react-bootstrap-icons";
import DeleteTask from "./DeleteTask";
import EditTaskModal from "./EditTaskModal";

const Tasks = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { taskCategories } = useSelector((state) => state.taskCategories);
  const { tasks, isLoading } = useSelector((state) => state.tasks);
  const { users } = useSelector((state) => state.users);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selecteCategory, setSelectedCategory] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalType, setModalType] = useState("");

  const openModal = (type, task) => {
    setModalType(type);
    setSelectedTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalType("");
    setSelectedTask(null);
    setShowModal(false);
  };

  const admin = user && user.userRole === "admin";
  const manager = user && user.userRole === "manager";
  const agent = user && user.userRole === "agent";

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await dispatch(resetCustomer());
        await dispatch(resetStatus());
        await dispatch(resetProduct());
        await dispatch(resetUsers());
        await dispatch(resetTaskCat());
        await dispatch(resetTasks());

        await dispatch(getTaskCategories());
        await dispatch(getAllTasks());
      }
      if (admin || manager) {
        await dispatch(getUsers());
      }
    };
    fetchData();
  }, [user, dispatch]);

  const filteredTasks = tasks.filter((task) => {
    const keyword = searchKeyword.toLowerCase();
    const isAssigneeMatch =
      selectedAssignee === "" || task.assignee === selectedAssignee;
    const isCategoryMatch =
      selecteCategory === "" || task.taskCategory === selecteCategory;
    const isPriorityMatch =
      selectedPriority === "" ||
      task.priority.toLowerCase() === selectedPriority.toLowerCase();

    return (
      task.title.toLowerCase().includes(keyword) &&
      isAssigneeMatch &&
      isCategoryMatch &&
      isPriorityMatch
    );
  });

  const renderTasks = filteredTasks.map((item) => {
    const task = {
      ...item,
      taskCategory:
        taskCategories.find(
          (taskCategory) => taskCategory._id === item.taskCategory
        )?.taskCategory || "Unknown",
      assignee:
        // users.find((user) => user._id === item.assignee)?.userName || "Unknown",
        agent
          ? user._id
          : users.find((u) => u._id === item.assignee)?.userName || "Unknown",
    };

    return (
      <tr key={task._id} className="atim">
        <td className="td">{task.title}</td>
        <td className="td">{task.taskCategory}</td>
        {(admin || manager) && <td className="td">{task.assignee}</td>}
        {(admin || manager || agent) && (
          <td className="td">{task.createdBy.name}</td>
        )}
        <td className="td">
          {new Date(task.startDate).toLocaleDateString()}
          <br />
          {new Date(task.startDate).toLocaleTimeString()}
        </td>
        <td className="td">
          {new Date(task.endDate).toLocaleDateString()}
          <br />
          {new Date(task.endDate).toLocaleTimeString()}
        </td>

        <td className="td">
          {/* <Button
            variant="link"
            className="symbol-button tdd"
            onClick={() => openModal("view", task)}
          >
            <EyeFill />
          </Button> */}
          <Button
            variant="link"
            className="symbol-button tdd"
            onClick={() => openModal("edit", task)}
          >
            <PencilSquare />
          </Button>
          {admin && <DeleteTask className="tdd" task={task} />}
        </td>
      </tr>
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = renderTasks.slice(indexOfFirstTask, indexOfLastTask);

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
                        onChange={(event) =>
                          setSearchKeyword(event.target.value)
                        }
                        placeholder="Search Task ..."
                      />
                    </Form.Group>
                  </Col>

                  {(admin || manager) && (
                    <Col lg={2}>
                      <Form.Group controlId="userFilter" className="mb-2">
                        <Form.Control
                          className="col_7 Select-status"
                          as="select"
                          value={selectedAssignee}
                          onChange={(event) =>
                            setSelectedAssignee(event.target.value)
                          }
                        >
                          <option value="">Select Assignee</option>
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
                    <Form.Group controlId="userFilter" className="mb-2">
                      <Form.Control
                        className="col_7 Select-status"
                        as="select"
                        value={selecteCategory}
                        onChange={(event) =>
                          setSelectedCategory(event.target.value)
                        }
                      >
                        <option value="">Select Category</option>
                        {taskCategories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.taskCategory}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={2}>
                    <Form.Group controlId="userFilter" className="mb-2">
                      <Form.Control
                        className="col_7 Select-status"
                        as="select"
                        value={selectedPriority}
                        onChange={(event) =>
                          setSelectedPriority(event.target.value)
                        }
                      >
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              {(admin || manager) && (
                <Col lg={2}>
                  <Form.Group className="mb-1">
                    <Link to="/addtask">
                      <Button variant="secondary" type="submit">
                        Create Task
                      </Button>
                    </Link>
                  </Form.Group>
                </Col>
              )}
            </Row>
          </Form>
          <Table className="customers_table">
            <thead>
              <tr>
                <th className="custoner-col-name">Title </th>
                <th className="custoner-col-name">Category</th>
                {(admin || manager) && (
                  <th className="custoner-col-name">Assignee</th>
                )}
                {(admin || manager || agent) && (
                  <th className="custoner-col-name">Assigned By</th>
                )}
                <th className="custoner-col-name">Start Date</th>
                <th className="custoner-col-name">Due Date</th>
                <th className="custoner-col-name">Action</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {currentTasks.length === 0 ? "No Tasks" : currentTasks}
            </tbody>
          </Table>

          {/* {selectedTask && modalType === "view" && (
            <ViewTaskModal
              show={showModal}
              onHide={closeModal}
              selectedTask={selectedTask}
            />
          )} */}

          {selectedTask && modalType === "edit" && (
            <EditTaskModal
              show={showModal}
              onHide={closeModal}
              selectedTask={selectedTask}
            />
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredTasks.length / itemsPerPage)}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />

          {isLoading && <Spinner />}
        </Container>
      </section>
    </div>
  );
};

export default Tasks;
