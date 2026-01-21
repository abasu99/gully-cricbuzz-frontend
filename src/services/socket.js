import { io } from "socket.io-client";

// const socket = io("http://localhost:3001");
const socket = io("https://gully-cricbuzz-backend.vercel.app");

export default socket;
