import React, { useState, useEffect} from 'react'
import CommentDisplay from './comments/CommentDisplay'

const Comments = ({post}) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);
  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const newCm = post.comments.filter((cm) => !cm.reply);
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post.comments, next]);

  useEffect(() => {
    const newReply = post.comments.filter((cm) => cm.reply);
    setReplyComments(newReply);
  }, [post.comments]);

  return (
    <div className="comments d-flex flex-column gap-2 mt-2">
      
      {comments.length - next > 0 ? (
        <div
          onClick={() => setNext(next + 10)}
          className="py-1 px-1 text-primary fw-semibold small border-bottom border-light-subtle pb-2 mb-1"
          style={{ cursor: "pointer", transition: "all 0.2s ease" }}
        >
          View all {comments.length} comments ({comments.length - next} hidden)
        </div>
      ) : (
        comments.length > 2 && (
          <div
            onClick={() => setNext(2)}
            className="py-1 px-1 text-secondary fw-semibold small border-bottom border-light-subtle pb-2 mb-1"
            style={{ cursor: "pointer", transition: "all 0.2s ease" }}
          >
            Hide comments
          </div>
        )
      )}

      
      <div 
        className="comments-list-container d-flex flex-column gap-2 pe-1" 
        style={{ 
          maxHeight: "300px", 
          overflowY: "auto",
          scrollBehavior: "smooth"
        }}
      >
        {showComments.map((comment, index) => (
          <CommentDisplay
            key={index}
            comment={comment}
            post={post}
            replyCm={replyComments.filter((item) => item.reply === comment._id)}
          />
        ))}
      </div>
      
    </div>
  );
}

export default Comments;
