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

const userMessagesSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  friendsMessages: {
    type: Map,
    of: {
      type: [
        new Schema(
          {
            sender: String,
            receiver: String,
            message: String,
            timestamp: String,
          },
          { _id: false }
        ),
      ],
      default: () => ({}),
    },
    required: true,
  },
});

const UserCredentials = mongoose.model(
  "UserCredentials",
  userCredentialSchema,
  "usercredentials"
);
const UserMessages = mongoose.model(
  "UserMessages",
  userMessagesSchema,
  "usermessage"
);
const User = mongoose.model("User", userSchema, "users");

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
  const errors = {};
  if (username.length < 3) {
    errors["username"] = "Username must consist of at least 3 characters";
  }

  if (password.length < 6) {
    errors["password"] = "Password must consist of at least 6 characters";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ message: errors });
  }

  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(409)
        .json({ message: "The username is already in use" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      friends: [],
    });
    const newUserCredentials = new UserCredentials({
      username,
      password: hashedPassword,
      friendMessage: [],
    });
    const newUserMessages = new UserMessages({
      username,
      friendsMessages: {},
      chats: [],
    });
    await newUserCredentials.save();
    await newUser.save();
    await newUserMessages.save();
    res.status(201).json({ message: "Account created successfully" });
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

app.post("/send-message", async (req, res) => {
  const { sender, receiver, message } = req.body;
  try {
    const senderUser = await UserMessages.findOne({ username: sender });
    const receiverUser = await UserMessages.findOne({ username: receiver });
    if (!senderUser.friendsMessages.get(receiver)) {
      senderUser.friendsMessages.set(receiver, []);
    }
    if (!receiverUser.friendsMessages.get(sender)) {
      receiverUser.friendsMessages.set(sender, []);
    }

    const senderMessages = senderUser.friendsMessages.get(receiver);
    const receiverMessages = receiverUser.friendsMessages.get(sender);
    let timestamp = new Date().toISOString();
    timestamp = timestamp.slice(11, 16);
    senderMessages.push({
      sender,
      receiver,
      message,
      timestamp,
    });
    receiverMessages.push({
      sender,
      receiver,
      message,
      timestamp,
    });
    await senderUser.save();
    await receiverUser.save();
    res.json({ success: true, message: "vrode kak norm" });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.post("/get-messages", async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    const senderUser = await UserMessages.findOne({ username: sender });
    if (!senderUser.friendsMessages.get(receiver)) {
      return res.json({ success: true, messages: [] });
    }

    const messages = senderUser.friendsMessages.get(receiver);
    if (messages) {
      return res.json({ success: true, messages });
    }
    res.json({ success: false, messages: [] });
  } catch (err) {
    res.json({ success: false, messages: err.message });
  }
});

app.post("/get-chats", async (req, res) => {
  const { sender } = req.body;
  try {
    const senderUser = await UserMessages.findOne({ username: sender });
    if (!senderUser) {
      return res.json({ success: false, error: "User not found" });
    }
    const chats = [];

    for (const [key, value] of senderUser.friendsMessages.entries()) {
      chats.push([key, value[value.length - 1]]);
    }

    res.json({ success: true, chats: chats });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

const userSocketMap = {};
io.on("connection", (socket) => {
  socket.on("register-id", (username) => {
    userSocketMap[username] = socket.id;
  });
  socket.on("sending-message", (data) => {
    const { sender, receiver, message } = data;
    const receiverId = userSocketMap[receiver];
    if (receiverId) {
      io.to(receiverId).emit("receive-message", {
        sender,
        receiver,
        message,
        timestamp: new Date().toISOString().slice(11, 16),
      });
    } else {
    }
  });
});
server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
