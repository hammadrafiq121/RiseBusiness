import axios from "axios";

const baseURL = "http://localhost:3000"; // Replace with your server URL

const api = axios.create({
  baseURL,
});

// Create a new task
export const createTask = async (token, taskData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.post("/tasks/add", taskData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all tasks
export const getAllTasks = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get("/tasks/all", config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a single task by ID
export const getTask = async (token, taskId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get(`/api/tasks/${taskId}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update a task by ID
export const updateTask = async (token, taskId, taskData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.put(`/tasks/${taskId}`, taskData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a task by ID
export const deleteTask = async (token, taskId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.delete(`/tasks/${taskId}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const taskApi = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};

export default taskApi;
