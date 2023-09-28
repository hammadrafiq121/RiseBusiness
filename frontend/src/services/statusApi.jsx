import axios from "axios";

// const backendUrl = "https://rise-business-backend-kcsmg.ondigitalocean.app";
const backendUrl = "http://localhost:3000";

export const getAllStatus = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.get(`${backendUrl}/api/statuses/all`, config);
  } catch (error) {
    console.log(`Error while calling get status api ${error}`);
    throw error;
  }
};
export const getStatus = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.get(`${backendUrl}/api/statuses/get/${id}`, config);
  } catch (error) {
    console.log(`Error while calling get status api ${error}`);
    throw error;
  }
};

export const updateStatus = async (token, id, status) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.put(
      `${backendUrl}/api/statuses/update/${id}`,
      {
        status,
      },
      config
    );
  } catch (error) {
    console.log(`Error while calling edit status api ${error}`);
    throw error;
  }
};

export const addStatus = async (token, status) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${backendUrl}/api/statuses/add`,
      status,
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
      console.log(`Error while calling add status api ${error}`);
      throw error;
    }
  }
};

export const deleteStatus = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.delete(
      `${backendUrl}/api/statuses/delete/${id}`,
      config
    );
  } catch (error) {
    console.log(`Error while calling add status api ${error}`);
    throw error;
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
