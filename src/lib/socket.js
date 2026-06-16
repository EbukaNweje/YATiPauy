import { io } from "socket.io-client";

const SERVER_URL =
  import.meta.env.VITE_BACKEND_URL || "https://yaticare-backend.onrender.com";

const socket = io(SERVER_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"],
});

export const connectSocket = (auth = {}) => {
  if (!socket.connected) {
    socket.auth = auth;
    socket.connect();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
  }
};

export default socket;
