import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../../redux/actions/commentAction';

const CommentMenu = ({ post, comment, setOnEdit }) => {
  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleRemove = () => {
    if(post.user._id === auth.user._id || comment.user._id === auth.user._id){
      if(window.confirm("Are you sure you want to delete this comment?")) {
        dispatch(deleteComment({ post, auth, comment, socket }));
      }
    }
  };

  const MenuItem = () => {
    return (
      <>
        <div className="dropdown-item d-flex align-items-center gap-2 py-2 text-secondary cursor-pointer" onClick={() => setOnEdit(true)}>
          <span className="material-symbols-outlined text-primary fs-5">edit</span>
          <span style={{ fontSize: "0.88rem" }}>Edit</span>
        </div>
        <div className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger cursor-pointer" onClick={handleRemove}>
          <span className="material-symbols-outlined text-danger fs-5">delete</span>
          <span style={{ fontSize: "0.88rem" }}>Delete</span>
        </div>
      </>
    );
  };

  return (
    <div className="comment_menu">
      {(post.user._id === auth.user._id || comment.user._id === auth.user._id) && (
        <div className="nav-item dropdown">
          <span
            className="material-symbols-outlined text-muted fs-5"
            id="moreLink"
            data-bs-toggle="dropdown"
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            more_vert
          </span>
          
          <div className="dropdown-menu dropdown-menu-end shadow-sm border border-light-subtle rounded-3 py-1" aria-labelledby="moreLink">
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                MenuItem()
              ) : (
                <div className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger cursor-pointer" onClick={handleRemove}>
                  <span className="material-symbols-outlined text-danger fs-5">delete</span>
                  <span style={{ fontSize: "0.88rem" }}>Delete</span>
                </div>
              )
            ) : (
              comment.user._id === auth.user._id && MenuItem()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentMenu;
