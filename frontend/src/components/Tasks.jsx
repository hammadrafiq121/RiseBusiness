import React, { useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import ViewTaskModal from "./ViewTaskModal";
import EditTaskModal from "./EditTaskModal";
const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const tasks = [
    {
      _id: "6543df12ae08bc589e94e895",
      title: "Cillum modi temporib",
      description: "Ipsum vitae aliquip ",
      estimatedTime: 78,
      startDate: "2023-11-01T19:00:00.000Z",
      endDate: "2023-11-02T19:00:00.000Z",
      comment: "In est commodo temp",
      taskCategory: "web",
      assignees: ["653bf33503cda4a906db0137", "653becb4c6e748783eaf7dd7"],
      priority: "Medium",
      checklist: [
        {
          text: "Omnis commodo omnis ",
          statuses: [
            {
              userId: "653bf33503cda4a906db0137",
              status: "done",
            },
            {
              userId: "653becb4c6e748783eaf7dd7",
              status: "",
            },
          ],
        },
      ],
      isExpired: false,
      createdAt: "2023-11-02T17:40:34.840Z",
      updatedAt: "2023-11-02T17:40:34.840Z",
      __v: 0,
    },
    {
      _id: "6543df4bae08bc589e94e898",
      title: "Cillum modi temporib",
      description: "Ipsum vitae aliquip ",
      estimatedTime: 78,
      startDate: "2023-11-01T19:00:00.000Z",
      endDate: "2023-11-03T19:00:00.000Z",
      comment: "In est commodo temp",
      taskCategory: "sale",
      assignees: ["653bc17fbb97684524048077", "653bc195bb9768452404807c"],
      priority: "Medium",
      checklist: [
        {
          text: "Omnis commodo omnis ",
          statuses: [
            {
              userId: "653bc17fbb97684524048077",
              status: "",
            },
            {
              userId: "653bc195bb9768452404807c",
              status: "in-prgress",
            },
          ],
        },
        {
          text: "Ipsam molestias culp",
          statuses: [
            {
              userId: "653bc17fbb97684524048077",
              status: "done",
            },
            {
              userId: "653bc195bb9768452404807c",
              status: "",
            },
          ],
        },
      ],
      isExpired: false,
      createdAt: "2023-11-02T17:41:31.720Z",
      updatedAt: "2023-11-02T17:41:31.720Z",
      __v: 0,
    },
    {
      _id: "6543df79ae08bc589e94e89b",
      title: "Cillum modi temporib",
      description: "Ipsum vitae aliquip ",
      estimatedTime: 7,
      startDate: "2023-11-01T19:00:00.000Z",
      endDate: "2023-11-03T19:00:00.000Z",
      comment: "In est commodo temp",
      taskCategory: "lead",
      assignees: [
        "652f20ca79548ee488bccfd3",
        "652f210179548ee488bccfe0",
        "652f208979548ee488bccfca",
      ],
      priority: "Low",
      checklist: [
        {
          text: "Omnis commodo omnis ",
          statuses: [
            {
              userId: "652f20ca79548ee488bccfd3",
              status: "",
            },
            {
              userId: "652f210179548ee488bccfe0",
              status: "",
            },
            {
              userId: "652f208979548ee488bccfca",
              status: "",
            },
          ],
        },
        {
          text: "Ipsam molestias culp",
          statuses: [
            {
              userId: "652f20ca79548ee488bccfd3",
              status: "done",
            },
            {
              userId: "652f210179548ee488bccfe0",
              status: "in-progress",
            },
            {
              userId: "652f208979548ee488bccfca",
              status: "",
            },
          ],
        },
        {
          text: "Omnis commodo omn asdasd",
          statuses: [
            {
              userId: "652f20ca79548ee488bccfd3",
              status: "done",
            },
            {
              userId: "652f210179548ee488bccfe0",
              status: "",
            },
            {
              userId: "652f208979548ee488bccfca",
              status: "done",
            },
          ],
        },
      ],
      isExpired: false,
      createdAt: "2023-11-02T17:42:17.050Z",
      updatedAt: "2023-11-02T17:42:17.050Z",
      __v: 0,
    },
    {
      _id: "6543df8aae08bc589e94e89e",
      title: "Cillum modi temporib",
      description: "Ipsum vitae aliquip ",
      estimatedTime: 10,
      startDate: "2023-11-01T19:00:00.000Z",
      endDate: "2023-11-03T19:00:00.000Z",
      comment: "In est commodo temp",
      taskCategory: "lead",
      assignees: [
        "652f204c79548ee488bccfc1",
        "652f200c79548ee488bccfb8",
        "652f1fd979548ee488bccfaf",
      ],
      priority: "Low",
      checklist: [
        {
          text: "Ipsam molestias culp",
          statuses: [
            {
              userId: "652f204c79548ee488bccfc1",
              status: "done",
            },
            {
              userId: "652f200c79548ee488bccfb8",
              status: "in-progress",
            },
            {
              userId: "652f1fd979548ee488bccfaf",
              status: "",
            },
          ],
        },
        {
          text: "Omnis commodo omn asdasd",
          statuses: [
            {
              userId: "652f204c79548ee488bccfc1",
              status: "",
            },
            {
              userId: "652f200c79548ee488bccfb8",
              status: "",
            },
            {
              userId: "652f1fd979548ee488bccfaf",
              status: "",
            },
          ],
        },
      ],
      isExpired: false,
      createdAt: "2023-11-02T17:42:34.679Z",
      updatedAt: "2023-11-02T17:42:34.679Z",
      __v: 0,
    },
    {
      _id: "6543df96ae08bc589e94e8a1",
      title: "Cillum modi temporib",
      description: "Ipsum vitae aliquip ",
      estimatedTime: 10,
      startDate: "2023-11-01T19:00:00.000Z",
      endDate: "2023-11-03T19:00:00.000Z",
      comment: "In est commodo temp",
      taskCategory: "lead",
      assignees: [
        "652f204c79548ee488bccfc1",
        "652f200c79548ee488bccfb8",
        "652f1fd979548ee488bccfaf",
      ],
      priority: "High",
      checklist: [
        {
          text: "Ipsam molestias culp",
          statuses: [
            {
              userId: "652f204c79548ee488bccfc1",
              status: "in-progress",
            },
            {
              userId: "652f200c79548ee488bccfb8",
              status: "",
            },
            {
              userId: "652f1fd979548ee488bccfaf",
              status: "done",
            },
          ],
        },
        {
          text: "Omnis commodo omn asdasd",
          statuses: [
            {
              userId: "652f204c79548ee488bccfc1",
              status: "done",
            },
            {
              userId: "652f200c79548ee488bccfb8",
              status: "in-progress",
            },
            {
              userId: "652f1fd979548ee488bccfaf",
              status: "",
            },
          ],
        },
      ],
      isExpired: false,
      createdAt: "2023-11-02T17:42:46.231Z",
      updatedAt: "2023-11-02T17:42:46.231Z",
      __v: 0,
    },
  ];

  const openModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  function getUserStatus(item, userId) {
    const userStatus = item.statuses.find((status) => status.userId === userId);
    return userStatus ? userStatus.status : "";
  }
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Assignees</th>
            <th>Priority</th>
            <th>Checklist</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.assignees.map((assignee) => assignee).join(", ")}</td>
              <td>{task.priority}</td>
              <td>
                {task.checklist.map((item, i) => (
                  <div key={i}>{item.text}</div>
                ))}
              </td>
              <td>{task.endDate}</td>
              <td>
                <Button variant="primary" onClick={() => openModal(task)}>
                  View
                </Button>
                <Button variant="primary" onClick={() => openModal(task)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ViewTaskModal
        selectedTask={selectedTask}
        closeModal={closeModal}
        showModal={showModal}
        getUserStatus={getUserStatus}
      />
      <EditTaskModal
        selectedTask={selectedTask}
        closeModal={closeModal}
        showModal={showModal}
        getUserStatus={getUserStatus}
      />
    </div>
  );
};

export default Tasks;
