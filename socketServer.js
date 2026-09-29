
let users = new Map();  
let admins = new Map(); 

const SocketServer = (socket) => {
  
 
  const addClient = (map, id, socketId) => {
    if (!map.has(id)) {
      map.set(id, new Set());
    }
    map.get(id).add(socketId);
  };

 
  const removeClient = (map, socketId) => {
    for (let [id, socketIds] of map.entries()) {
      if (socketIds.has(socketId)) {
        socketIds.delete(socketId);
        if (socketIds.size === 0) {
          map.delete(id);
        }
        break;
      }
    }
  };

  
  const getSocketIdsByUsers = (userIds) => {
    let socketIds = [];
    userIds.forEach(id => {
      if (users.has(id)) {
        socketIds.push(...users.get(id));
      }
    });
    return socketIds;
  };

  

  socket.on("joinUser", (id) => {
    addClient(users, id, socket.id);
  });

  socket.on("joinAdmin", (id) => {
    addClient(admins, id, socket.id);
    
    socket.emit("activeUsers", users.size);
  });

  socket.on("disconnect", () => {
    removeClient(users, socket.id);
    removeClient(admins, socket.id);
  });



  const notifyFollowers = (eventName, newPost) => {
    if (!newPost || !newPost.user) return;
    const followersList = newPost.user.followers || [];
    const ids = [...followersList, newPost.user._id];
    
    const targetSockets = getSocketIdsByUsers(ids);
    targetSockets.forEach((socketId) => {
      socket.to(socketId).emit(eventName, newPost);
    });
  };

  socket.on("likePost", (newPost) => notifyFollowers("likeToClient", newPost));
  socket.on("unLikePost", (newPost) => notifyFollowers("unLikeToClient", newPost));
  socket.on("createComment", (newPost) => notifyFollowers("createCommentToClient", newPost));
  socket.on("deleteComment", (newPost) => notifyFollowers("deleteCommentToClient", newPost));

  socket.on("follow", (newUser) => {
    if (!newUser || !users.has(newUser._id)) return;
    users.get(newUser._id).forEach(socketId => {
      socket.to(socketId).emit("followToClient", newUser);
    });
  });

  socket.on("unFollow", (newUser) => {
    if (!newUser || !users.has(newUser._id)) return;
    users.get(newUser._id).forEach(socketId => {
      socket.to(socketId).emit("unFollowToClient", newUser);
    });
  });

  const notifyRecipients = (eventName, msg) => {
    if (!msg || !msg.recipients) return;
    const targetSockets = getSocketIdsByUsers(msg.recipients);
    targetSockets.forEach(socketId => {
      socket.to(socketId).emit(eventName, msg);
    });
  };

  socket.on("createNotify", (msg) => notifyRecipients("createNotifyToClient", msg));
  socket.on("removeNotify", (msg) => notifyRecipients("removeNotifyToClient", msg));



  socket.on("getActiveUsers", (id) => {
    
    if (admins.has(id)) {
      socket.emit("getActiveUsersToClient", users.size);
    }
  });

  socket.on("addMessage", (msg) => {
    if (!msg || !users.has(msg.recipient)) return;
    users.get(msg.recipient).forEach(socketId => {
      socket.to(socketId).emit("addMessageToClient", msg);
    });
  });
};

module.exports = SocketServer;
