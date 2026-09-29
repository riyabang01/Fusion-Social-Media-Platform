import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../PostCard";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { POST_TYPES } from "../../redux/actions/postAction";

const Posts = () => {
  const { homePosts, auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token);
    dispatch({ type: POST_TYPES.GET_POSTS, payload: { ...res.data, page: homePosts.page + 1 } });
    setLoad(false);
  };

  return (
    <div className="posts-container d-flex flex-column gap-4">
      <div className="row g-4">
        {homePosts.posts.map((post) => (
          <div key={post._id} className="col-12">
            <PostCard post={post} theme={theme} />
          </div>
        ))}
      </div>

      {load && (
        <div className="d-flex justify-content-center my-4">
          <img src={LoadIcon} alt="Loading..." width="40" />
        </div>
      )}

      <div className="d-flex justify-content-center mt-3">
        <LoadMoreBtn
          result={homePosts.result}
          page={homePosts.page}
          load={load}
          handleLoadMore={handleLoadMore}
        />
      </div>
    </div>
  );
};

export default Posts;
