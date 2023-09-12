import axios from "axios";

const backendUrl = "https://rise-business-backend-kcsmg.ondigitalocean.app";
//const backendUrl = "http://localhost:3000";

//logout
export const getStatus = async (id) => {
  try {
    const response = await axios.get(`${backendUrl}/api/statuses/get/${id}`);
    return response.data.status;
  } catch (error) {
    console.log(`Error while calling get status api ${error}`);
    throw error;
    // return error;
  }
};

const statusApi = {
  getStatus,
};

export default statusApi;
