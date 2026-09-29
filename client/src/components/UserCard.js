import React from 'react';
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg
}) => {
    const handleCloseAll = () => {
    alert("Target URL ID: " + (msg ? (user.user?._id || user.user || user._id) : user._id));
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };


  const profileId = msg ? (user.user?._id || user.user || user._id) : user._id;
  const userAvatar = msg ? (user.user?.avatar || user.avatar) : user.avatar;
  const usernameText = msg ? (user.user?.username || user.username) : user.username;

  return (
    <div className={`d-flex justify-content-between align-items-center p-2.5 w-100 rounded-3 transition-all ${border}`}>
      <div className="flex-grow-1 overflow-hidden">
        <Link
          to={`/profile/${profileId}`}
          onClick={handleCloseAll}
          className="d-flex align-items-center text-decoration-none"
        >
          <div className="d-flex align-items-center justify-content-center flex-shrink-0 border border-light-subtle rounded-circle p-0.5 bg-white shadow-sm">
            <Avatar src={userAvatar} size="big-avatar" />
          </div>
          
          <div className="ms-3 overflow-hidden text-start">
            <span className="d-block fw-semibold text-dark text-truncate" style={{ fontSize: "0.95rem" }}>
              {usernameText}
            </span>

            <small className="d-flex align-items-center text-muted text-truncate gap-2 mt-0.5" style={{ fontSize: "0.82rem" }}>
              {msg ? (
                <div className="d-flex align-items-center gap-1.5 w-100 text-truncate">
                  <span className="text-truncate flex-grow-1">{user.text}</span>
                  {user.media && user.media.length > 0 && (
                    <span className="badge bg-light text-secondary border d-flex align-items-center gap-1 py-1 px-1.5 rounded">
                      {user.media.length} <i className="fas fa-image text-primary" style={{ fontSize: "0.75rem" }} />
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-truncate">{user.fullname}</span>
              )}
            </small>
          </div>
        </Link>
      </div>
      <div className="flex-shrink-0 ms-2">
        {children}
      </div>
    </div>
  );
};

export default UserCard;
