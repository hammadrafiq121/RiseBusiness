import React from "react";
import { Modal, Button } from "react-bootstrap";

function EditTaskModal({
  showModal,
  closeModal,
  selectedTask,
  selectedUserId,
  getUserStatus,
  handleDescriptionChange,
  handleStatusChange,
  saveChanges,
}) {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Description:</h5>
        <textarea
          value={selectedTask && selectedTask.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
        />
        <h5>Checklist:</h5>
        {selectedTask &&
          selectedTask.checklist.map((item, i) => (
            <div key={i}>
              {item.text} - Status:
              <select
                value={getUserStatus(item, selectedUserId) || ""}
                onChange={(e) => handleStatusChange(item, e.target.value)}
              >
                <option value="">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={saveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTaskModal;
