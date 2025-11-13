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

export const getCustomers = async () => {
  const response = await instance.get("/Customers");
  return response.data;
};

export const create = async (newCustomer) => {
  const response = await instance.post("/Customers", newCustomer);
  return response.data;
};

export const remove = async (customerId) => {
  const response = await instance.delete(`/Customers/${customerId}`);
  console.log('Axios Delete response:', response);
  return response;
};

export const update = async (updatedCustomer) => {
  const response = await instance.put(`/Customers/${updatedCustomer.customerId}`, updatedCustomer);
  return response.data;
};

export default { getCustomers, create, remove, update };
