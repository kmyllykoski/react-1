import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7104/api",
});

// get token from local storage and set Authorization header
instance.interceptors.request.use((config) => {
  // config.headers = config.headers || {};  // not needed, headers should be always defined in axios
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = async () => {
  const response = await instance.get("/Products");
  return response.data;
};

export const create = async (newProduct) => {
  const response = await instance.post("/Products", newProduct);
  return response.data;
};

export const remove = async (productId) => {
  const response = await instance.delete(`/Products/${productId}`);
  console.log('Axios Delete response:', response);
  return response;
};

export const update = async (updatedProduct) => {
  const response = await instance.put(`/Products/${updatedProduct.productId}`, updatedProduct);
  return response.data;
};

export default { getProducts, create, remove, update };