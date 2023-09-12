import axios from "axios";
const backendUrl = "https://rise-business-backend-kcsmg.ondigitalocean.app";
// const backendUrl = "http://localhost:3000";

//converting above api call to async

export const getCustomers = async (token) => {
  try {
    return await axios.get(`${backendUrl}/api/customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(`Error while calling get customers api ${error}`);
    throw error;
  }
};

export async function getCustomer(token, id) {
  try {
    return await axios.get(`${backendUrl}/api/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(`Error while calling get customer api ${error}`);
    throw error;
  }
}

export const addCustomer = async (token, data) => {
  try {
    return await axios.post(`${backendUrl}/api/customers`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(`Error while calling add user api ${error}`);
    throw error;
  }
};

export const updateCustomer = async (token, id, customer) => {
  try {
    return await axios.put(`${backendUrl}/api/customers/${id}`, customer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(`Error while calling eidt customer api ${error}`);
    throw error;
  }
};

export async function deleteCustomer(token, id) {
  try {
    return await axios.delete(`${backendUrl}/api/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(`Error while calling delete customer api ${error}`);
    throw error;
  }
}

export const uploadCustomers = async (token, customers) => {
  try {
    return await axios.post(`${backendUrl}/api/customers/upload`, customers, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log("Error upload customers from CSV : ", error);
    throw error;
  }
};

const customerApi = {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomer,
  uploadCustomers,
};
export default customerApi;
