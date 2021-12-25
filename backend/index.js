const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected", socket.id);

  socket.on("join", (roomName) => {
    console.log(socket.id, "join", roomName);
    socket.join(roomName);
  });

  socket.on("message", (roomName, message) => {
    console.log(socket.id, roomName, message);
    io.to(roomName).emit("message", message);
  });

  socket.on("disconnect", (reason) => {
    console.log("disconnected", socket.id, reason);
  });
});

const port = process.env.PORT || 8080;
httpServer.listen(port);

console.log("listening on port 8080");
