import axios from "axios";

const backendUrl = "https://rise-business-backend-kcsmg.ondigitalocean.app";
// const backendUrl = "http://localhost:3000";

export const getAllStatus = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/statuses/all`);
    return response.data;
  } catch (error) {
    console.log(`Error while calling get status api ${error}`);
    // throw error;
    return error;
  }
};
export const getStatus = async (id) => {
  try {
    const response = await axios.get(`${backendUrl}/api/statuses/get/${id}`);
    return response.data.status;
  } catch (error) {
    console.log(`Error while calling get status api ${error}`);
    return error;
  }
};

export const updateStatus = async (id, status) => {
  try {
    return await axios.put(`${backendUrl}/api/statuses/update/${id}`, {
      status,
    });
  } catch (error) {
    console.log(`Error while calling edit status api ${error}`);
    return error;
  }
};

export const addStatus = async (status) => {
  try {
    return await axios.post(`${backendUrl}/api/statuses/add`, status);
  } catch (error) {
    console.log(`Error while calling add status api ${error}`);
    return error;
  }
};

export const deleteStatus = async (id) => {
  try {
    return await axios.delete(`${backendUrl}/api/statuses/delete/${id}`);
  } catch (error) {
    console.log(`Error while calling add status api ${error}`);
    return error;
  }
};

const statusApi = {
  getStatus,
  getAllStatus,
  updateStatus,
  addStatus,
  deleteStatus,
};

export default statusApi;
