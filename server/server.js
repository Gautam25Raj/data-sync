const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");

const connectDB = require("./config/db");

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://data-sync-eight.vercel.app"],
  optionsSuccessStatus: 200,
};

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "https://data-sync-eight.vercel.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/ably", require("./routes/ablyRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/token", require("./routes/tokenRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));
app.use("/api/channel", require("./routes/channelRoutes"));
app.use("/api/invite", require("./routes/inviteRoutes"));

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join-room", (roomId) => {
    console.log("Room ID: ", roomId);
    socket.join(roomId);
  });

  socket.on("draw", (data) => {
    console.log(data);
    io.to(data.roomId).emit("draw", data);
  });

  socket.on("client-ready", (roomId) => {
    io.to(roomId).emit("get-canvas-state");
  });

  socket.on("canvas-state", (data) => {
    console.log("received canvas state");
    io.to(data.roomId).emit("canvas-state-from-server", data.state);
  });

  socket.on("clear", (roomId) => {
    io.to(roomId).emit("clear");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`Server running on port ${PORT}`);
});
