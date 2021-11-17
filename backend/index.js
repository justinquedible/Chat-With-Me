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

  socket.on("message", (message) => {
    console.log(socket.id, message);
    io.send(message);
  });

  socket.on("disconnect", (reason) => {
    console.log("disconnected", socket.id, reason);
  });
});

const port = process.env.PORT || 8080;
httpServer.listen(port);

console.log("listening on port 8080");
