import React from "react";
import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import { useSelector } from "react-redux";

const Followers = ({ users, setShowFollowers }) => {
  const { auth } = useSelector((state) => state);

  return (
    <div className="follow-modal d-flex align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100" style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", zIndex: 99999 }}>
      <div className="follow_box bg-white rounded-4 shadow-lg border border-light-subtle p-4 position-relative w-100" style={{ maxWidth: "420px", maxHeight: "80vh" }}>
        
        <div className="follow_box-header d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
          <h6 className="m-0 fw-bold text-dark text-uppercase tracking-wider small">Followers Roster</h6>
          <span 
            className="fs-4 text-secondary cursor-pointer close-btn-layer" 
            onClick={() => setShowFollowers(false)}
            style={{ cursor: "pointer", userSelect: "none", lineHeight: "1" }}
          >
            &times;
          </span>
        </div>

        <div className="follow_box-body d-flex flex-column gap-2 overflow-y-auto px-1" style={{ maxHeight: "calc(80vh - 100px)" }}>
          {users && users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="p-1 border border-light-subtle rounded-3 hover-bg-light transition-all">
                <UserCard
                  setShowFollowers={setShowFollowers}
                  user={user}
                >
                  {auth.user._id !== user._id && <FollowBtn user={user} />}
                </UserCard>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted small">
              <i className="fas fa-users d-block fs-3 mb-2 opacity-50"></i>
              No followers on this channel yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Followers;
