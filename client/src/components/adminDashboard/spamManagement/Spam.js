import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentList from "../ContentList";
import { getSpamPosts } from '../../../redux/actions/adminAction';

const Spam = () => {
  const { auth, admin } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpamPosts(auth.token));
  }, [dispatch, auth.token]);

  return (
    <div className="spam_management_panel w-100 text-start animate-fade-in">
      <div className="p-4 p-md-5 bg-white border border-light-subtle rounded-4 shadow-sm mb-4 position-relative overflow-hidden">
        <div className="position-absolute end-0 top-50 translate-middle-y opacity-5 d-none d-lg-block me-5" style={{ pointerEvents: "none", userSelect: "none" }}>
          <i className="fa-solid fa-shield-halved" style={{ fontSize: "11rem" }} />
        </div>

        <div className="position-relative" style={{ zIndex: 1 }}>
          <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2.5 py-1 rounded fw-bold small text-uppercase tracking-wider mb-3.5" style={{ fontSize: "0.72rem" }}>
            Compliance Operations Node
          </span>
          <h2 className="fw-black text-dark tracking-tight m-0" style={{ fontSize: "2.2rem" }}>
            Hello, {auth?.user?.username || "Administrator"}
          </h2>
          <p className="text-muted m-0 mt-2 fs-6 max-w-xl" style={{ lineHeight: "1.5" }}>
            Audit platform report logs, inspect content flagged by community networks, and execute global moderation protocols from the secure pipeline below.
          </p>
        </div>
      </div>

      <div className="spam_queue_wrapper mt-4">
        <ContentList content={admin.spam_posts} />
      </div>
    </div>
  );
};

export default Spam;
