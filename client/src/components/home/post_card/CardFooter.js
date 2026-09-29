import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import LikeButton from '../../LikeButton';
import { useSelector, useDispatch } from "react-redux";
import { likePost, savePost, unLikePost, unSavePost } from "../../../redux/actions/postAction";
import ShareModal from '../../ShareModal';

const CardFooter = ({post}) => {
  const [isLike, setIsLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const dispatch = useDispatch();
  const { auth, theme, socket } = useSelector((state) => state);

  useEffect(() => {
    if (auth?.user?._id && post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth?.user?._id]);

  const handleLike = async () => {
    if(loadLike) return;
    setLoadLike(true);
    await dispatch( likePost({post, auth, socket}) );
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if(loadLike) return;
    setLoadLike(true);
    await dispatch( unLikePost({post, auth, socket}) );
    setLoadLike(false);
  };

  const handleSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  useEffect(() => {
    if (auth?.user?.saved && auth.user.saved.find(id => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [post._id, auth?.user?.saved]);

  return (
    <div className="card_footer p-3 bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-3 fs-5">
          <div className="d-flex align-items-center justify-content-center cursor-pointer transition-all hover-scale">
            <LikeButton
              isLike={isLike}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
            />
          </div>
          
          <Link to={`/post/${post._id}`} className="text-secondary hover-text-primary transition-all d-flex align-items-center">
            <i className="far fa-comments" />
          </Link>
          
          <div 
            className="text-secondary hover-text-success transition-all cursor-pointer d-flex align-items-center"
            onClick={() => setIsShare(!isShare)}
          >
            <i className="fa fa-share" />
          </div>
        </div>

        <div className="fs-5 cursor-pointer">
          {saved ? (
            <i
              className="fas text-primary fa-bookmark transition-all"
              onClick={handleUnSavePost}
            />
          ) : (
            <i
              className="far text-secondary hover-text-primary transition-all"
              onClick={handleSavePost}
            />
          )}
        </div>
      </div>

      <div className="d-flex align-items-center gap-4 text-muted small border-top pt-2.5">
        <span className="fw-semibold cursor-pointer text-dark-hover" style={{ fontSize: "0.85rem" }}>
          {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
        </span>
        <span className="fw-semibold cursor-pointer text-dark-hover" style={{ fontSize: "0.85rem" }}>
          {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
        </span>
      </div>

      {isShare && (
        <ShareModal
          url={`${window.location.origin}/post/${post._id}`}
          theme={theme}
          setIsShare={setIsShare}
        />
      )}
    </div>
  );
}

export default CardFooter;
