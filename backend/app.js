const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const db = require("../smt.env");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
    required: true,
  },
});

const userCredentialSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friendMessage: {
    type: Array,
    required: true,
  },
});

const UserCredentials = mongoose.model("UserCredentials", userCredentialSchema);

const User = mongoose.model("User", userSchema);

async function toMongoose() {
  await mongoose.connect(db);
  console.log("connected");
}

toMongoose();

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

app.post("/search-users", async (req, res) => {
  const { typed } = req.body;
  try {
    const regex = new RegExp(typed, "i");
    const users = await User.find({ username: regex });

    if (users.length > 0) {
      res.json({ users });
    } else {
      res.json({
        users: [],
      });
    }
  } catch (err) {
    res.json({ users: [] });
  }
});

app.post("/create-account", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      res.status(409).json({ message: "The username is already in use" });
    } else {
      const hashedPassword = await hashPassword(password);
      const newUser = new User({
        username,
        friends: [],
      });
      const newUserCredentials = new UserCredentials({
        username,
        password: hashedPassword,
        friends: [],
      });
      await newUserCredentials.save();
      await newUser.save();
      res.status(201).json({ message: "Account created successfully" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserCredentials.findOne({ username: username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.json({ message: "Auth successful" });
      } else {
        res.json({ message: "Incorrect password" });
      }
    } else {
      res.json({ message: "User not found" });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.post("/get-user-information", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username: username });
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.post("/add-friend", async (req, res) => {
  const { username, friend } = req.body;
  try {
    const result = await User.updateOne(
      { username },
      { $addToSet: { friends: friend } }
    );
    if (result.nModified === 1) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "ne proshel nmodified" });
    }
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("sending-message", (message) => {
    socket.broadcast.emit("receive-message", message);
  });
});
server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
