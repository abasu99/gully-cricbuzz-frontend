import { io } from "socket.io-client";

// const SERVER_URL = "http://localhost:3002";
const SERVER_URL = "https://gully-cricbuzz-backend.vercel.app";

const socket =io(SERVER_URL, 
    {
    path: "/score-path/"
  }
);

export default socket;
