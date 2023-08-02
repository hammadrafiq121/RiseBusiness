import axios from "axios";

const backendUrl = "https://seashell-app-6wepd.ondigitalocean.app";

export const getUsers = async () => {
  try {
    // const { token } = store.getState().auth.user;
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    // return await axios.get(`${backendUrl}/api/user/all`, config);
    return await axios.get(`${backendUrl}/api/users/`);
  } catch (error) {
    console.log(`Error while calling get users api ${error}`);
  }
};

export const getUser = async (id) => {
  try {
    return await axios.get(`${backendUrl}/api/users/${id}`);
  } catch (error) {
    console.log(`Error while calling get users api ${error}`);
  }
};

export const updateUser = async (id, user) => {
  try {
    return await axios.put(`${backendUrl}/api/users/${id}`, user);
  } catch (error) {
    console.log(`Error while calling  edit user api ${error}`);
  }
};
const userApi = {
  getUsers,
  getUser,
  updateUser,
};
export default userApi;
