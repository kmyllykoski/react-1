import instance from './aXInstance';

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
