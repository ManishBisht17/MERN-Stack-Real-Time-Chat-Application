const socketIo = (io) => {
  //store connected users with their room information using socket.id as thier key

  const connectedUsers = new Map();
  //Handle new socket connections
  io.on("connection", (socket) => {
    //Get user from authentication
    const user = socket.handshake.auth.user;
    //*Start  join room handler
    socket.on("join room", (groupId) => {
      //add socket to the specified romm
      socket.join(groupId);
      //store user and romm info in connectedUsers map
      connectedUsers.set(socket.id, { user, room: groupId });
      //get list of all users currently in the room
      const usersInRoom = Array.from(connectedUsers.values())
        .filter((u) => u.room === groupId)
        .map((u) => u.user);
      //emit updated users list to all client in the room
      io.in(groupId).emit("users in room", usersInRoom);
      //Broadcast join notification to all other users in the room
      socket.to(groupId).emit("notification", {
        type: "USER_JOINED",
        message: `${user?.username} has joined`,
        user: user,
      });
    });
    //*End  join room handler

    //*Start  leave room handler

    //Triggered when user manually leaves a room
    socket.on("leave room", (groupId) => {
      console.log(`${user?.username} leaving room : `, groupId);
      //Remove socket from the room
      socket.leave(groupId);
      if (connectedUsers.has(socket.id)) {
        //remove userfrom connected users and notify others
        connectedUsers.delete(socket.id);
        socket.to(groupId).emit("user left", user?.id);
      }
    });

    //*End  Leave room handler

    //*Start  New Message room handler
    //Triggered when user sends a new message
    socket.on("new message", (message) => {
      //broadcast message to all other users in the room
      socket.to(message.groupId).emit("message recieved", message);
    });

    //*End  New Message handler

    //*Start  Disconnect  handler

    //Triggered when user closes the connection
    socket.on("disconnect", () => {
      if (connectedUsers.has(socket.id)) {
        //Get user's room info before removing
        const userData = connectedUsers.get(socket.id);
        //Notify others in the room about user's departure
        socket.to(userData.room).emit("user left", user?._id);
        //remove user from connected users
        connectedUsers.delete(socket.id);
      }
    });

    //*End  Disconnect  handler

    //*Start  Typing  indicator
    //Triggered when user starts typing
    socket.on("typing", ({ groupId, username }) => {
      //broadcast typing status to users in the room
      socket.to(groupId).emit("user typing", { username });
    });
    socket.on("stop typing", ({ groupId }) => {
      //broadcast typing status to users in the room
      socket.to(groupId).emit("user stop typing", { username: user?.username });
    });
    //*End  Tying  indicator
  });
};
module.exports = socketIo;
