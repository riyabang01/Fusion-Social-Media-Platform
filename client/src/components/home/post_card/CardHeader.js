import React from "react";
import Avatar from "../../Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost, reportPost } from "../../../redux/actions/postAction";

const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  const handleDeletePost = () => {
    if(window.confirm("Are you sure you want to delete this post?")){
      dispatch(deletePost({ post, auth, socket }));
      return navigate("/");
    }
  };

  const handleReportPost = () => {
    dispatch(reportPost({post, auth}));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post._id}`);
  };

  return (
    <div className="card_header d-flex align-items-center justify-content-between p-3 bg-white rounded-top-4">
      <div className="d-flex align-items-center">
        <div className="border border-light-subtle rounded-circle p-0.5 bg-white shadow-sm me-3 d-flex align-items-center justify-content-center">
          <Avatar src={post.user.avatar} size="big-avatar" />
        </div>
        <div className="card_name text-start">
          <h6 className="m-0 fw-bold">
            <Link className="text-dark text-decoration-none" to={`/profile/${post.user._id}`}>
              {post.user.username}
            </Link>
          </h6>
          <small className="text-muted" style={{ fontSize: "0.8rem" }}>
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>

      <div className="nav-item dropdown">
        
        <span
          className="text-secondary fs-4 px-2 py-1 fw-bold"
          id="moreLink"
          data-bs-toggle="dropdown"
          style={{ cursor: "pointer", userSelect: "none", lineHeight: "1" }}
        >
          &bull;&bull;&bull;
        </span>

        <div className="dropdown-menu dropdown-menu-end shadow-sm border border-light-subtle rounded-3 py-2" aria-labelledby="moreLink">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item d-flex align-items-center gap-2 py-2 text-secondary cursor-pointer" onClick={handleEditPost}>
                <span className="material-symbols-outlined text-primary fs-5">edit</span>
                <span style={{ fontSize: "0.9rem" }}>Edit Post</span>
              </div>
              <div className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger cursor-pointer" onClick={handleDeletePost}>
                <span className="material-symbols-outlined text-danger fs-5">delete</span>
                <span style={{ fontSize: "0.9rem" }}>Delete Post</span>
              </div>
              <div className="dropdown-divider border-light-subtle"></div>
            </>
          )}

          <div className="dropdown-item d-flex align-items-center gap-2 py-2 text-secondary cursor-pointer" onClick={handleCopyLink}>
            <span className="material-symbols-outlined text-success fs-5">content_copy</span>
            <span style={{ fontSize: "0.9rem" }}>Copy Link</span>
          </div>
          <div className="dropdown-item d-flex align-items-center gap-2 py-2 text-warning cursor-pointer" onClick={handleReportPost}>
            <span className="material-symbols-outlined text-warning fs-5">report</span>
            <span style={{ fontSize: "0.9rem" }}>Report Post</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
