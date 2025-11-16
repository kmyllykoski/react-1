import instance from './aXInstance';

const authenticate = async (credentials) => {
  const response = await instance.post("/Authentication", credentials);
  console.log('Axios baseURL in Auth:', instance.defaults.baseURL);
  return response.data;
}

export default { authenticate };

