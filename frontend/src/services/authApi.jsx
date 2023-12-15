import axios from "axios";

// const backendUrl = "https://seal-app-u57xr.ondigitalocean.app";
const backendUrl = "http://localhost:3000";

//register
export const signup = async (token, userData) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/user/signup`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // if (response.data) {
    //   localStorage.setItem("user", JSON.stringify(response.data));
    // }
    return response.data;
  } catch (error) {
    console.log("Error while calling signup api ", error);
    throw error;
  }
};

// export const login = async (userData) => {
//   try {
//     const response = await axios.post(`${backendUrl}/api/user/login`, userData);
//     if (response.data) {
//       localStorage.setItem("user", JSON.stringify(response.data));
//     }
//     return response.data;
//   } catch (error) {
//     console.log("Error while calling login api ", error);
//     throw error;
//   }
// };
export const login = async (userData) => {
  try {
    const response = await axios.post(`${backendUrl}/api/user/login`, userData);
    if (response.data) {
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      // Schedule deletion after 1 day
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      setTimeout(() => {
        // Delete user item from localStorage after 1 day
        localStorage.removeItem("user");
        localStorage.setItem("logoutEvent", Date.now().toString());
        window.location.reload(1);
      }, oneDayInMilliseconds);
    }
    return response.data;
  } catch (error) {
    console.log("Error while calling login api ", error);
    throw error;
  }
};

//logout
export const logout = async () => {
  try {
    localStorage.removeItem("user");
    // Dispatch the logout event
    localStorage.setItem("logoutEvent", Date.now().toString());
    return { message: "User logged out successfully" };
  } catch (error) {
    console.log("Error while calling logout api ", error);
    throw error;
  }
};
const authApi = {
  signup,
  logout,
  login,
};
export default authApi;
