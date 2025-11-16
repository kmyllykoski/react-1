import instance from './aXInstance';

const authenticate = async (credentials) => {
  const response = await instance.post("/Authentication", credentials);
  return response.data;
}

export default { authenticate };

