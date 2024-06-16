const express = require("express");
const app = express();
const fs = require("fs");
app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/registration", async (req, res) => {
  const registered_users = await fs.readFile(
    "./data/registered_users.json",
    "utf-8"
  );
  const username = req.body;
  
});

const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("sending-message", (message) => {
    socket.broadcast.emit("receive-message", message);
  });
});
