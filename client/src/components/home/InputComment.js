import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createComment } from '../../redux/actions/commentAction';
import Icons from '../Icons';

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");

  const { auth, socket, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()){
      if(setOnReply){return setOnReply(false)}
      return;
    }

    setContent("");

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user
    };
    dispatch(createComment({ post, newComment, auth, socket }));
    if (setOnReply) {
      return setOnReply(false);
    }
  };

  return (
    <form className="d-flex align-items-center gap-2 p-2 bg-light border border-light-subtle rounded-3 mt-2" onSubmit={handleSubmit}>
      {children}
      <div className="d-flex align-items-center flex-fill position-relative bg-white border border-light-subtle rounded-pill px-3 py-1.5 shadow-sm">
        <input
          type="text"
          className="form-control form-control-sm border-0 bg-transparent p-0 flex-fill outline-none"
          placeholder={onReply ? "Write a reply..." : "Add a comment..."}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
            color: theme ? "white" : "#1e293b",
            boxShadow: "none"
          }}
        />
        <div className="d-flex align-items-center flex-shrink-0 ms-2">
          <Icons setContent={setContent} content={content} theme={theme} />
        </div>
      </div>
      <button 
        type="submit" 
        className="btn btn-sm btn-primary px-3 py-1.5 rounded-pill fw-semibold shadow-sm transition-all text-uppercase tracking-wider"
        disabled={!content.trim()}
        style={{ fontSize: "0.78rem" }}
      >
        Send
      </button>
    </form>
  );
};

export default InputComment;
