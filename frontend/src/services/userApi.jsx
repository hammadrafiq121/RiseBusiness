import axios from "axios";

const backendUrl = "https://rise-business-backend-kcsmg.ondigitalocean.app";
// const backendUrl = "http://localhost:3000";

export const getUsers = async (token) => {
  try {
    return await axios.get(`${backendUrl}/api/users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(`Error while calling get users api ${error}`);
    throw error;
  }
};

export const getUser = async (token, id) => {
  try {
    return await axios.get(`${backendUrl}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(`Error while calling get users api ${error}`);
    throw error;
  }
};

export const updateUser = async (token, id, user) => {
  try {
    return await axios.put(`${backendUrl}/api/users/${id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(`Error while calling edit user API: ${error}`);
    throw error; // Rethrow the error to propagate it to the createAsyncThunk catch block
  }
};

export const deleteUser = async (token, id) => {
  try {
    return await axios.delete(`${backendUrl}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(`Error while calling delete user api ${error}`);
    throw error;
  }
};

const userApi = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
export default userApi;
