import axios from "axios";

// const backendUrl = "https://seal-app-u57xr.ondigitalocean.app";
const backendUrl = "http://localhost:3000";

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

export const assignUsers = async (token, _id, users) => {
  try {
    return await axios.put(
      `${backendUrl}/api/users/asignUsers`,
      {
        _id,
        users,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(`Error while calling asignUsers api ${error}`);
    throw error;
  }
};

export const removeUsers = async (token, _id, users) => {
  try {
    return await axios.put(
      `${backendUrl}/api/users/removeUsers`,
      {
        _id,
        users,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(`Error while calling removeUsers api ${error}`);
    throw error;
  }
};

const userApi = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  assignUsers,
  removeUsers,
};
export default userApi;
