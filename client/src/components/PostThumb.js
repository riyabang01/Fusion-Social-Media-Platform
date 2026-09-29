import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PostThumb = ({ posts, result }) => {
  const { theme } = useSelector((state) => state);

  if (result === 0 || !posts || posts.length === 0){
    return (
      <div className="text-center py-5">
        <i className="fas fa-camera fs-1 text-muted mb-2"></i>
        <h5 className="text-muted fw-normal m-0">No Posts Available</h5>
      </div>
    );
  }

  return (
    <div className="post_thumb_grid row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      {posts.map((post) => (
        <div key={post._id} className="col">
          <Link to={`/post/${post._id}`} className="text-decoration-none">
            <div className="post_thumb_display position-relative overflow-hidden rounded-3 shadow-sm bg-black ratio ratio-1x1 border" style={{ cursor: "pointer" }}>
              <div className="w-100 h-100 overflow-hidden d-flex align-items-center justify-content-center">
                {post.images && post.images[0]?.url.match(/video/i) ? (
                  <video
                    src={post.images[0].url}
                    style={{ filter: theme ? "invert(1)" : "invert(0)", objectFit: "cover" }}
                    className="w-100 h-100"
                  />
                ) : (
                  post.images && (
                    <img
                      src={post.images[0]?.url}
                      alt="Thumbnail Grid Item"
                      style={{ filter: theme ? "invert(1)" : "invert(0)", objectFit: "cover" }}
                      className="w-100 h-100 transition-all"
                    />
                  )
                )}
              </div>

              <div className="post_thumb_menu position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center gap-4 text-white opacity-0 transition-all hover-opacity-100" style={{ background: "rgba(0, 0, 0, 0.5)", zIndex: 2 }}>
                <span className="d-flex align-items-center gap-2 fw-bold fs-5">
                  <i className="fas fa-heart" /> {post.likes.length}
                </span>
                <span className="d-flex align-items-center gap-2 fw-bold fs-5">
                  <i className="fas fa-comment" /> {post.comments.length}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostThumb;
