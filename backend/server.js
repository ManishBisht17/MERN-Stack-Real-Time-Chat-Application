const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const socketIo = require("./socket");
const userRouter = require("./routes/userRoutes");
const groupRouter = require("./routes/groupRoute");
const messageRouter = require("./routes/messageRoute");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    Credentials: true,
  },
});
//middleware
app.use(cors());
app.use(express.json());
//connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to the DB");
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });
//initialize

socketIo(io);
//our routes
app.use("/api/users", userRouter);
app.use("/api/groups", groupRouter);
app.use("/api/messages", messageRouter);

//start the server

const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`Server is running on ${PORT}`));
