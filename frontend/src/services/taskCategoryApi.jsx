import axios from "axios";

// const backendUrl = "https://seal-app-u57xr.ondigitalocean.app";
const backendUrl = "http://localhost:3000";

export const getTaskCategories = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.get(`${backendUrl}/api/taskCategory/all`, config);
  } catch (error) {
    console.log(`Error while calling get taskCategory api ${error}`);
    throw error;
  }
};
export const getTaskCategory = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.get(`${backendUrl}/api/taskCategory/get/${id}`, config);
  } catch (error) {
    console.log(`Error while calling get taskCategory api ${error}`);
    throw error;
  }
};

export const updateTaskCategory = async (token, id, taskCategory) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.put(
      `${backendUrl}/api/taskCategory/update/${id}`,
      {
        taskCategory,
      },
      config
    );
  } catch (error) {
    console.log(`Error while calling edit taskCategory api ${error}`);
    throw error;
  }
};

export const addTaskCategory = async (token, taskCategory) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${backendUrl}/api/taskCategory/add`,
      taskCategory,
      config
    );
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    if (error.response.status === 400) {
      console.log(error.response.data.error);
      throw error;
    } else {
      console.log(`Error while calling add taskCategory api ${error}`);
      throw error;
    }
  }
};

export const deleteTaskCategory = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.delete(
      `${backendUrl}/api/taskCategory/delete/${id}`,
      config
    );
  } catch (error) {
    console.log(`Error while calling add taskCategory api ${error}`);
    throw error;
  }
};

const taskCategoryApi = {
  getTaskCategories,
  getTaskCategory,
  updateTaskCategory,
  addTaskCategory,
  deleteTaskCategory,
};

export default taskCategoryApi;
