import axios from "axios";

const vercelBaseURL = 'https://gully-cricbuzz-backend.vercel.app/';
// const localBaseURL = 'http://localhost:3001/';

const matchApi = axios.create({
  baseURL: `${vercelBaseURL}api/v1/match`,
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  }
});
const authApi = axios.create({
  baseURL: `${vercelBaseURL}api/v1/auth`
});

export {matchApi,authApi};
