import React, { useState, useEffect } from "react";
import PostThumb from "../PostThumb";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { PROFILE_TYPES } from "../../redux/actions/profileAction";

const Posts = ({ auth, profile, dispatch, id }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setResult(data.result);
        setPage(data.page);
      }
    });
  }, [profile.posts, id]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `user_posts/${id}?limit=${page * 9}`,
      auth.token
    );
    const newData = { ...res.data, page: page + 1, _id: id };
    dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData });
    setLoad(false);
  };

  return (
    <div className="profile_posts_wrapper p-3 p-md-4 bg-white border border-light-subtle rounded-4 shadow-sm">
      <PostThumb posts={posts} result={result} />

      {load && (
        <div className="d-flex justify-content-center my-4">
          <img src={LoadIcon} alt="Loading..." width="40" />
        </div>
      )}

      <div className="d-flex justify-content-center mt-3">
        <LoadMoreBtn
          result={result}
          page={page}
          load={load}
          handleLoadMore={handleLoadMore}
        />
      </div>
    </div>
  );
};

export default Posts;
