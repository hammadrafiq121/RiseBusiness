import axios from "axios";

const backendUrl = "http://localhost:3000";

export const logUserLogin = async (userId) => {
  try {
    const response = await axios.post(`${backendUrl}/api/log`, {
      userId,
      action: "login",
      details: "User logged in",
    });

    return response.data; // Adjust this based on your API response
  } catch (error) {
    console.log("Error while calling logUserLogin API", error);
    throw error;
  }
};

const logApi = {
  logUserLogin,
};
export default logApi;
