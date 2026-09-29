import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_TYPES } from "./redux/actions/postAction";
import { ADMIN_TYPES } from "./redux/actions/adminAction";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import { NOTIFY_TYPES } from "./redux/actions/notifyAction";
import { MESSAGE_TYPES } from "./redux/actions/messageAction";

import audioTone from './audio/pristine-609.mp3';

const spawnNotification = (body, icon, url, title) => {
  if (!("Notification" in window)) return;

  const showNotification = () => {
    const options = { body, icon };
    const n = new Notification(title, options);
    n.onclick = (e) => {
      e.preventDefault();
      window.open(url, "_blank");
    };
  };

  if (Notification.permission === "granted") {
    showNotification();
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") showNotification();
    });
  }
};

const SocketClient = () => {
  const { auth, socket: rawSocket, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const audioRef = useRef();

  const socket = rawSocket && typeof rawSocket.emit === 'function' ? rawSocket : null;

  useEffect(() => {
    if (!socket || !auth.user) return;
    if (auth.user.role === "user") socket.emit("joinUser", auth.user._id);
    if (auth.user.role === "admin") socket.emit("joinAdmin", auth.user._id);
  }, [socket, auth.user]);

  useEffect(() => {
    if (!socket) return;
    const handleActiveUsers = (totalActiveUsers) => {
      dispatch({ type: ADMIN_TYPES.GET_TOTAL_ACTIVE_USERS, payload: totalActiveUsers });
    };
    socket.on("getActiveUsersToClient", handleActiveUsers);
    return () => socket.off("getActiveUsersToClient", handleActiveUsers);
  }, [socket, dispatch]);

  useEffect(() => {
    if (!socket) return;
    const updatePost = (newPost) => dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.on("likeToClient", updatePost);
    socket.on("unLikeToClient", updatePost);

    return () => {
      socket.off("likeToClient", updatePost);
      socket.off("unLikeToClient", updatePost);
    };
  }, [socket, dispatch]);

  useEffect(() => {
    if (!socket) return;
    const updatePost = (newPost) => dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.on("createCommentToClient", updatePost);
    socket.on("deleteCommentToClient", updatePost);

    return () => {
      socket.off("createCommentToClient", updatePost);
      socket.off("deleteCommentToClient", updatePost);
    };
  }, [socket, dispatch]);

  useEffect(() => {
    if (!socket) return;
    const followHandler = (newUser) => dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    socket.on("followToClient", followHandler);
    socket.on("unFollowToClient", followHandler);

    return () => {
      socket.off("followToClient", followHandler);
      socket.off("unFollowToClient", followHandler);
    };
  }, [socket, dispatch, auth]);

  useEffect(() => {
    if (!socket) return;

    const createNotifyHandler = (msg) => {
      dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg });
      if (notify.sound && audioRef.current) audioRef.current.play();
      spawnNotification(msg.user.username + " " + msg.text, msg.user.avatar, msg.url, "CAMPUS CONNECT");
    };

    const removeNotifyHandler = (msg) => {
      dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg });
    };

    socket.on("createNotifyToClient", createNotifyHandler);
    socket.on("removeNotifyToClient", removeNotifyHandler);

    return () => {
      socket.off("createNotifyToClient", createNotifyHandler);
      socket.off("removeNotifyToClient", removeNotifyHandler);
    };
  }, [socket, dispatch, notify.sound]);

  useEffect(() => {
    if (!socket) return;

    const addMessageHandler = (msg) => dispatch({ type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg });

    socket.on("addMessageToClient", addMessageHandler);

    return () => socket.off("addMessageToClient", addMessageHandler);
  }, [socket, dispatch]);

  return (
    <audio controls ref={audioRef} style={{ display: "none" }}>
      <source src={audioTone} type="audio/mp3" />
    </audio>
  );
};

export default SocketClient;
