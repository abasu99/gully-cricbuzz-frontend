import axios from "axios";

// const vercelBaseURL = 'https://gully-cricbuzz-backend.vercel.app/';
// const localBaseURL = 'http://localhost:3001/';
const matchApi = axios.create({
  matchBaseURL: "https://gully-cricbuzz-backend.vercel.app/api/v1/match",
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  }
});
const authApi = axios.create({
  authBaseURL: "https://gully-cricbuzz-backend.vercel.app/api/v1/auth"
});

export { matchApi, authApi };
