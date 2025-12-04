let users = [];
let admins = [];

const SocketServer = (socket) => {

  //#region //!Connection
  socket.on("joinUser", (id) => {
    // Avoid duplicates
    if (!users.find(user => user.id === id)) {
      users.push({ id, socketId: socket.id });
    }
  });

  socket.on("joinAdmin", (id) => {
    if (!admins.find(admin => admin.id === id)) {
      admins.push({ id, socketId: socket.id });
    }

    const admin = admins.find((admin) => admin.id === id);
    if (admin) {
      const totalActiveUsers = users.length;
      socket.emit("activeUsers", totalActiveUsers);
    }
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    admins = admins.filter((admin) => admin.socketId !== socket.id);
  });
  //#endregion

  //#region //!Like
  const notifyFollowers = (eventName, newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    clients.forEach((client) => {
      socket.to(client.socketId).emit(eventName, newPost);
    });
  };

  socket.on("likePost", (newPost) => notifyFollowers("likeToClient", newPost));
  socket.on("unLikePost", (newPost) => notifyFollowers("unLikeToClient", newPost));
  //#endregion

  //#region //!Comment
  socket.on("createComment", (newPost) => notifyFollowers("createCommentToClient", newPost));
  socket.on("deleteComment", (newPost) => notifyFollowers("deleteCommentToClient", newPost));
  //#endregion

  //#region //!Follow
  socket.on("follow", (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user && socket.to(user.socketId).emit("followToClient", newUser);
  });

  socket.on("unFollow", (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user && socket.to(user.socketId).emit("unFollowToClient", newUser);
  });
  //#endregion

  //#region //!Notifications
  const notifyRecipients = (eventName, msg) => {
    const clients = users.filter(user => msg.recipients.includes(user.id));
    clients.forEach(client => socket.to(client.socketId).emit(eventName, msg));
  };

  socket.on("createNotify", (msg) => notifyRecipients("createNotifyToClient", msg));
  socket.on("removeNotify", (msg) => notifyRecipients("removeNotifyToClient", msg));
  //#endregion

  //#region //!Active Users for Admin
  socket.on("getActiveUsers", (id) => {
    const admin = admins.find((admin) => admin.id === id);
    if (admin) {
      const totalActiveUsers = users.length;
      socket.to(admin.socketId).emit("getActiveUsersToClient", totalActiveUsers);
    }
  });
  //#endregion

  //#region //!Messages
  socket.on("addMessage", (msg) => {
    const user = users.find(u => u.id === msg.recipient);
    user && socket.to(user.socketId).emit("addMessageToClient", msg);
  });
  //#endregion
};

module.exports = SocketServer;
