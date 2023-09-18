import axios from "axios";

// const backendUrl = "https://rise-business-backend-kcsmg.ondigitalocean.app";
const backendUrl = "http://localhost:3000";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/products/all`);
    return response.data;
  } catch (error) {
    console.log(`Error while calling getProducts api ${error}`);
    // throw error;
    return error;
  }
};

export const getSelectedProducts = async (productIds) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/products/selectedProducts`,
      { productIds } // Include the array in the request body
    );
    return response.data;
  } catch (error) {
    console.log(`Error while calling getSelectedProducts api ${error}`);
    // throw error;
    return error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    return await axios.put(`${backendUrl}/api/products/update/${id}`, product);
  } catch (error) {
    console.log(`Error while calling updateProduct api ${error}`);
    return error;
  }
};

export const addProduct = async (product) => {
  try {
    return await axios.post(`${backendUrl}/api/products/add`, product);
  } catch (error) {
    console.log(`Error while calling addProduct api ${error}`);
    return error;
  }
};
export const deleteProduct = async (id) => {
  try {
    return await axios.delete(`${backendUrl}/api/products/delete/${id}`);
  } catch (error) {
    console.log(`Error while calling add status api ${error}`);
    return error;
  }
};

const productApi = {
  addProduct,
  getProducts,
  getSelectedProducts,
  updateProduct,
  deleteProduct,
};

export default productApi;
