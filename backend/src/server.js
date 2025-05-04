// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (in production, restrict properly)
    methods: ["GET", "POST"]
  }
});

// To store users
const users = new Map();

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  const username = socket.handshake.auth.username;
  if (!username) {
    return;
  }

  const user = {
    userId: socket.id,
    username: username,
  };

  users.set(socket.id, user);

  // Send back session info
  socket.emit("session", user);

  // Send all connected users to the new user
  socket.emit("users", Array.from(users.values()));

  // Notify others that new user connected
  socket.broadcast.emit("user connected", user);

  socket.on("new message", (data) => {
    console.log("Message received: ", data);
    // Broadcast message to everyone (except sender)
    socket.broadcast.emit("new message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
    users.delete(socket.id);
    // Notify others that user disconnected
    socket.broadcast.emit("user disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
