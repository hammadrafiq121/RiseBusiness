// import React from "react";
// import { Modal, Button } from "react-bootstrap";

// function EditTaskModal({ showModal, closeModal, selectedTask }) {
//   return (
//     <Modal show={showModal} onHide={closeModal}>
//       <Modal.Header closeButton>
//         <Modal.Title>View Task</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p>Description: {selectedTask.description}</p>
//         <h5>Checklist:</h5>
//         {selectedTask.checklist.map((item, index) => (
//           <div key={index}>
//             {item.text} - {item.status || "Not started"}
//           </div>
//         ))}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={closeModal}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default EditTaskModal;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { updateTask } from "../app/reducers/taskSlice.js";

function EditTaskModal({ show, onHide, selectedTask }) {
  const [editedChecklist, setEditedChecklist] = useState([
    ...selectedTask.checklist,
  ]);
  const dispatch = useDispatch();

  const handleStatusChange = (index, newStatus) => {
    setEditedChecklist((prevChecklist) =>
      prevChecklist.map((item, itemIndex) => ({
        ...item,
        status: itemIndex === index ? newStatus : item.status,
      }))
    );
  };

  const handleCancel = () => {
    onHide();
    setEditedChecklist([...selectedTask.checklist]);
  };

  const handleSave = async () => {
    await dispatch(
      updateTask({
        taskId: selectedTask._id,
        taskData: {
          assignee: selectedTask.assignee,
          checklist: editedChecklist,
        },
      })
    );
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Description: {selectedTask.description}</p>
        <h5>Checklist:</h5>
        {editedChecklist.map((item, index) => (
          <>
            <hr />
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "75%" }}>
                {index + 1}. {item.text}
              </div>
              <Form.Select
                style={{ width: "25%" }}
                value={item.status}
                onChange={(e) => handleStatusChange(index, e.target.value)}
              >
                <option value="">Not started</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </Form.Select>
            </div>
          </>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTaskModal;
