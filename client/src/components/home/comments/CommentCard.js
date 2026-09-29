import React, { useState, useEffect } from 'react';
import Avatar from '../../Avatar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import LikeButton from "../../LikeButton";
import CommentMenu from './CommentMenu';
import { likeComment, unLikeComment, updateComment } from '../../../redux/actions/commentAction';
import InputComment from "../InputComment";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) {
      return setOnReply(false);
    }
    setOnReply({ ...comment, commentId });
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  return (
    <div className="comment_card card border-0 bg-transparent mt-3" style={styleCard}>
      <div className="card-body p-0">
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex flex-column flex-fill align-items-start w-100">
            <Link to={`/profile/${comment.user._id}`} className="d-flex align-items-center text-dark text-decoration-none mb-1.5">
              <Avatar src={comment.user.avatar} size="small-avatar" />
              <h6 className="m-0 ms-2 fw-bold text-slate-700" style={{ fontSize: "0.88rem" }}>{comment.user.username}</h6>
            </Link>

            <div
              className="comment_content px-3 py-2 rounded-4 bg-light border border-light-subtle shadow-sm w-100"
              style={{
                filter: theme ? "invert(1)" : "invert(0)",
                color: theme ? "white" : "#1e293b",
                maxWidth: "100%"
              }}
            >
              {onEdit ? (
                <div className="w-100">
                  <textarea
                    className="form-control form-control-sm border border-secondary-subtle bg-white rounded-3 shadow-inner"
                    rows="3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              ) : (
                <div className="text-wrap text-break text-start" style={{ fontSize: "0.88rem", lineHeight: "1.5" }}>
                  {comment.tag && comment.tag._id !== comment.user._id && (
                    <Link
                      to={`/profile/${comment.tag._id}`}
                      className="text-decoration-none me-1 fw-bold text-primary"
                    >
                      @{comment.tag.username}
                    </Link>
                  )}
                  <span>
                    {content.length < 100
                      ? content
                      : readMore
                      ? content + " "
                      : content.slice(0, 100) + "..."}
                  </span>
                  {content.length > 100 && (
                    <span
                      className="text-primary fw-semibold ms-1"
                      style={{ cursor: "pointer", fontSize: "0.82rem" }}
                      onClick={() => setReadMore(!readMore)}
                    >
                      {readMore ? "Hide" : "Read more"}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="d-flex align-items-center mt-1.5 px-2 gap-3">
              <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                {moment(comment.createdAt).fromNow()}
              </small>

              <small className="fw-semibold text-secondary" style={{ fontSize: "0.75rem" }}>
                {comment.likes.length} {comment.likes.length === 1 ? 'like' : 'likes'}
              </small>
              
              {onEdit ? (
                <div className="d-flex gap-2">
                  <small
                    onClick={handleUpdate}
                    className="fw-bold text-primary"
                    style={{ cursor: "pointer", fontSize: "0.75rem" }}
                  >
                    Save
                  </small>
                  <small
                    onClick={() => setOnEdit(false)}
                    className="fw-bold text-secondary"
                    style={{ cursor: "pointer", fontSize: "0.75rem" }}
                  >
                    Cancel
                  </small>
                </div>
              ) : (
                <small
                  className="fw-bold text-primary"
                  style={{ cursor: "pointer", fontSize: "0.75rem" }}
                  onClick={handleReply}
                >
                  {onReply ? "Cancel" : "Reply"}
                </small>
              )}
            </div>
          </div>

          <div className="d-flex align-items-center ms-3 mt-1 flex-shrink-0">
            <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
            <div className="ms-2">
              <LikeButton
                isLike={isLike}
                handleLike={handleLike}
                handleUnLike={handleUnLike}
              />
            </div>
          </div>
        </div>

        {onReply && (
          <div className="ms-4 mt-3 border-start ps-3" style={{ borderLeft: "2px dashed #cbd5e1" }}>
            <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
              <Link
                className="text-decoration-none me-1 fw-bold text-primary"
                to={`/profile/${onReply.user._id}`}
              >
                @{onReply.user.username}
              </Link>
            </InputComment>
          </div>
        )}

        {children && <div className="ms-3 ps-1">{children}</div>}
      </div>
    </div>
  );
};

export default CommentCard;
