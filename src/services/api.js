import axios from "axios";

const matchApi = axios.create({
  baseURL: "http://localhost:3001/api/v1/match",
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  }
});
const authApi = axios.create({
  baseURL: "http://localhost:3001/api/v1/auth"
});

export {matchApi,authApi};
