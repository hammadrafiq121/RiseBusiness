import axios from "axios";

// const backendUrl = "https://rise-business-backend-kcsmg.ondigitalocean.app";
const backendUrl = "http://localhost:3000";

export const getProducts = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.get(`${backendUrl}/api/products/all`, config);
  } catch (error) {
    console.log(`Error while calling getProducts api ${error}`);
    throw error;
  }
};

export const getSelectedProducts = async (token, productIds) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.post(
      `${backendUrl}/api/products/selectedProducts`,
      { productIds },
      config
    );
  } catch (error) {
    console.log(`Error while calling getSelectedProducts api ${error}`);
    throw error;
  }
};

export const updateProduct = async (token, id, product) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.put(
      `${backendUrl}/api/products/update/${id}`,
      { product },
      config
    );
  } catch (error) {
    console.log(`Error while calling updateProduct api ${error}`);
    throw error;
  }
};

export const addProduct = async (token, product) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.post(`${backendUrl}/api/products/add`, product, config);
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
export const deleteProduct = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.delete(
      `${backendUrl}/api/products/delete/${id}`,
      config
    );
  } catch (error) {
    console.log(`Error while calling add status api ${error}`);
    throw error;
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
