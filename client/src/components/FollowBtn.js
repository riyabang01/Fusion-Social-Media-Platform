import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../redux/actions/profileAction";

const FollowBtn = ({user}) => {
    const [followed, setFollowed] = useState(false);
    const { auth, profile, socket } = useSelector(state => state);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    useEffect(() => {
      if (auth.user.following.find((item) => item._id === user._id)) {
        setFollowed(true);
      }
      return () => setFollowed(false);
    }, [auth.user.following, user._id]);

    const handleFollow = async () => {
        if(load) return;
        setFollowed(true);
        setLoad(true);
        await dispatch(follow({ users: profile.users, user, auth, socket }));
        setLoad(false);
    };

    const handleUnFollow = async () => {
      if (load) return;
      setFollowed(false);
      setLoad(true);
      await dispatch(unfollow({ users: profile.users, user, auth, socket }));
      setLoad(false);
    };

    return (
      <>
        {followed ? (
          <button 
            className="btn btn-sm btn-outline-primary px-3 py-1.5 rounded-pill fw-medium transition-all shadow-sm" 
            onClick={handleUnFollow}
            disabled={load}
            style={{ fontSize: "0.85rem", minWidth: "90px" }}
          >
            Following
          </button>
        ) : (
          <button 
            className="btn btn-sm btn-primary px-3 py-1.5 rounded-pill fw-semibold transition-all shadow-sm" 
            onClick={handleFollow}
            disabled={load}
            style={{ fontSize: "0.85rem", minWidth: "90px" }}
          >
            Follow
          </button>
        )}
      </>
    );
}

export default FollowBtn;
