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
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
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

  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);
  });

  socket.on("client-ready", () => {
    socket.broadcast.emit("get-canvas-state");
  });

  socket.on("canvas-state", (state) => {
    console.log("received canvas state");
    socket.broadcast.emit("canvas-state-from-server", state);
  });

  socket.on("clear", () => io.emit("clear"));

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
