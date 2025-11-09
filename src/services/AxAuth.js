import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7104/api",
});

const authenticate = async (credentials) => {
  const response = await instance.post("/Authentication", credentials);
  return response.data;
}

export default { authenticate };

