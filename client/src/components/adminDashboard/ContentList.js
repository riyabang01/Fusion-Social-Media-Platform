import React from 'react'
import Avatar from '../Avatar';
import { deleteSpamPost } from '../../redux/actions/adminAction'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const ContentList = ({content}) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeletePost = (post) => {
    if (window.confirm("Are you absolute sure you want to enforce compliance and delete this post system-wide?")) {
      dispatch(deleteSpamPost({ post, auth, socket }));
    }
  };

  return (
    <div className="admin_content_list d-flex flex-column gap-3 w-100 text-start">
      {content && content.length > 0 ? (
        content.map((post) => (
          <div key={post._id} className="d-flex flex-column flex-md-row align-items-md-center justify-content-between p-3 bg-white border border-light-subtle rounded-4 shadow-sm gap-3">
            <div className="d-flex align-items-center flex-grow-1 overflow-hidden">
              <div className="border border-light-subtle rounded-circle p-0.5 bg-white shadow-sm flex-shrink-0 d-flex align-items-center justify-content-center">
                <Avatar size="big-avatar" src={post.user?.avatar} />
              </div>
              
              <div className="d-flex flex-column ms-3 overflow-hidden">
                <div className="d-flex flex-wrap align-items-center gap-2">
                  <span className="fw-bold text-dark text-truncate" style={{ fontSize: "0.95rem" }}>
                    {post.user?.username || "Unknown Account"}
                  </span>
                  <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1 rounded fw-bold small" style={{ fontSize: "0.75rem" }}>
                    Reports: {post.reports?.length || 0}
                  </span>
                </div>
                <span className="text-muted small text-truncate mt-0.5" style={{ fontSize: "0.82rem" }}>
                  {post.user?.email || "No Email Provided"}
                </span>
                <small className="text-muted small mt-1 d-block" style={{ fontSize: "0.78rem" }}>
                  Registered {moment(post.createdAt).fromNow()}
                </small>
              </div>
            </div>

            <div className="flex-shrink-0 align-self-end align-self-md-center ms-auto">
              <button
                type="button"
                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-2 px-3 py-1.5 rounded-pill fw-semibold shadow-sm transition-all fs-7"
                onClick={() => handleDeletePost(post)}
                style={{ fontSize: "0.82rem" }}
              >
                <span className="material-symbols-outlined fs-5" style={{ lineHeight: "1" }}>delete</span>
                Enforce Removal
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-5 bg-white border border-light-subtle rounded-4 shadow-sm w-100">
          <div className="bg-light text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-inner" style={{ width: "70px", height: "70px" }}>
            <i className="fa-solid fa-shield-check fs-2" />
          </div>
          <h5 className="text-dark fw-bold m-0">Compliance Queue Clear</h5>
          <p className="text-muted small m-0 mt-1 px-4">There are currently zero flag reports items floating inside the tracking system namespace.</p>
        </div>
      )}
    </div>
  );
}

export default ContentList;
