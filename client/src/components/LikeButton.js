import React from 'react'
import { useSelector } from "react-redux";

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  const { theme } = useSelector(state => state);

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ cursor: "pointer" }}>
      {isLike ? (
        <i
          className="fas fa-heart text-danger fs-5"
          style={{ 
            filter: theme ? "invert(1)" : "invert(0)",
            transform: "scale(1.05)",
            transition: "transform 0.1s ease"
          }}
          onClick={handleUnLike}
        />
      ) : (
        <i 
          className="far fa-heart text-secondary hover-text-danger fs-5 transition-all" 
          onClick={handleLike} 
        />
      )}
    </div>
  );
};

export default LikeButton;
