import instance from './aXInstance';

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