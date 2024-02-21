const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/ably", require("./routes/ablyRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/token", require("./routes/tokenRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));
app.use("/api/channel", require("./routes/channelRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`Server running on port ${PORT}`);
});
