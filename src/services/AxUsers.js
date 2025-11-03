import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7104/api",
});

export const getUsers = async () => {
  const response = await instance.get("/Users");
  return response.data;
};

export const create = async (newUser) => {
  const response = await instance.post("/Users", newUser);
  return response.data;
};

export const remove = async (userId) => {
  const response = await instance.delete(`/Users/${userId}`);
  console.log('Axios Delete response:', response);
  return response;
};

export const update = async (updatedUser) => {
  const response = await instance.put(`/Users/${updatedUser.userId}`, updatedUser);
  return response.data;
};

export default { getUsers, create, remove, update };
