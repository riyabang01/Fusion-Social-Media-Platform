import React, { useState, useEffect } from "react";
import PostThumb from "../PostThumb";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Saved = ({ auth, dispatch }) => {
  const [savePosts, setSavePosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getDataAPI(`getSavePosts`, auth.token)
    .then(res => { 
        setSavePosts(res.data.savePosts) 
        setResult(res.data.result)
        setLoad(false)
    })  
    .catch(err => {
        setLoad(false);
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response?.data?.msg || err.message}});
    })

    return () => setSavePosts([]);
  }, [dispatch, auth.token]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token);
    setSavePosts(res.data.savePosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoad(false);
  };

  return (
    <div className="saved_posts_container p-3 p-md-4 bg-white border border-light-subtle rounded-4 shadow-sm">
      <PostThumb posts={savePosts} result={result} />

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

export default Saved;
