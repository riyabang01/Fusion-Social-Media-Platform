import React, { useState } from 'react'
import Carousel from '../../Carousel';

const CardBody = ({ post, theme }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    
    <div className="card_body p-3" style={{ height: "auto" }}>
      
      {post.images.length > 0 && (
        
        <div 
          className="w-100 rounded-3 border border-light-subtle shadow-sm bg-light mb-3"
          style={{ height: "auto", overflow: "hidden" }}
        >
          <Carousel images={post.images} id={post._id} />
        </div>
      )}

     
      <div
        className="card_body-content mb-0" 
        style={{
          filter: theme ? "invert(1)" : "invert(0)",
          color: theme ? "#ffffff" : "#1e293b",
          fontSize: "0.95rem",
          lineHeight: "1.6"
        }}
      >
        <span className="text-break">
          {post.content.length < 60
            ? post.content
            : readMore
            ? post.content + " "
            : post.content.slice(0, 60) + "..."}
        </span>
        {post.content.length > 60 && (
          <span 
            className="readMore text-primary fw-semibold ms-2" 
            onClick={() => setReadMore(!readMore)}
            style={{ cursor: "pointer", fontSize: "0.88rem" }}
          >
            {readMore ? "Hide content" : "Read more"}
          </span>
        )}
      </div>

    </div>
  );
};

export default CardBody;
