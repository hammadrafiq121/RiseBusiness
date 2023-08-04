import axios from "axios";

const backendUrl = "https://rise-business-backend-kcsmg.ondigitalocean.app";

//register
export const signup = async (userData) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/user/signup`,
      userData
    );
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log("Error while calling signup api ", error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${backendUrl}/api/user/login`, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
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
