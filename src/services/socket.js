import { io } from "socket.io-client";

// const SERVER_URL = "http://localhost:3001";
const SERVER_URL = "https://gully-cricbuzz-backend.vercel.app";

const socket =io(SERVER_URL, 
    {
    path: "/score-path/",
    transports: ["websocket"]
  }
);

export default socket;
