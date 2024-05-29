let userData;

const socket = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected to socket.io", socket.id);

    socket.on("setup", (data) => {
      userData = data;
      socket.join(userData?._id);
      console.log(`User Id ${userData?._id}`);
      socket.emit("connected");
    });

    socket.on("join_chat", (room) => {
      socket.join(room);
      console.log(`User Joined Room ${room}`);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop_typing", (room) => socket.in(room).emit("stop_typing"));
    socket.on("new_message", (newMessageRecived) => {
      const chat = newMessageRecived?.chat;
      if (!chat?.users) {
        return console.log("chat.user is not found");
      }

      chat?.users?.forEach((user) => {
        if (user?._id == newMessageRecived?.sender?._id) return;

        socket.in(user?._id).emit("message_recieved", newMessageRecived);
      });
    });

    socket.off("setup", () => {
      socket.leave(userData?._id);
    });
  });
};

module.exports = socket;
