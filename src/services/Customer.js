import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = async () => {
  const response = await instance.get("/posts");
  return response.data;
};

export default { getPosts };
