import axios from "axios";

const baseURL = 'https://gully-cricbuzz-backend.vercel.app/';
// const baseURL = 'http://localhost:3001/';

const matchApi = axios.create({
  baseURL: `${baseURL}api/v1/match`,
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  }
});
const authApi = axios.create({
  baseURL: `${baseURL}api/v1/auth`
});

export {matchApi,authApi};
