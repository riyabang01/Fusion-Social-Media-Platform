import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard'

const CommentDisplay = ({ comment, post, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <div className="comment_display border-start border-light-subtle ms-2 mt-2">
      <CommentCard post={post} comment={comment} commentId={comment._id}>
        <div className="ps-4 mt-2 d-flex flex-column gap-2" style={{ borderLeft: "2px dashed #e2e8f0" }}>
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentCard
                  comment={item}
                  key={index}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}

          {replyCm.length - next > 0 ? (
            <div
              onClick={() => setNext(next + 10)}
              className="text-primary fw-semibold small my-1 cursor-pointer"
              style={{ cursor: "pointer", fontSize: "0.82rem" }}
            >
              View more replies ({replyCm.length - next} remaining)
            </div>
          ) : (
            replyCm.length > 1 && (
              <div
                onClick={() => setNext(1)}
                className="text-secondary fw-semibold small my-1 cursor-pointer"
                style={{ cursor: "pointer", fontSize: "0.82rem" }}
              >
                Hide replies
              </div>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
