import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getDiscoverPosts, DISCOVER_TYPES } from "../redux/actions/discoverAction";
import LoadIcon from '../images/loading.gif';
import PostThumb from "../components/PostThumb";
import LoadMoreBtn from '../components/LoadMoreBtn';
import { getDataAPI } from '../utils/fetchData';

const Discover = () => {
    const { auth, discover } = useSelector(state => state);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    useEffect(() => {
      if (!discover.firstLoad) {
        dispatch(getDiscoverPosts(auth.token));
      }
    }, [dispatch, auth.token, discover.firstLoad]);

    const handleLoadMore = async () => {
        setLoad(true);
        const res = await getDataAPI(`post_discover?num=${discover.page * 8}`, auth.token);
        dispatch({ type: DISCOVER_TYPES.UPDATE_POSTS, payload: res.data });
        setLoad(false);
    };

    return (
      <div className="discover_page container-fluid py-4 px-3 px-md-4">
        <div className="mb-4 text-start">
          <h4 className="fw-bold text-dark m-0 tracking-tight">Explore Content</h4>
          <p className="text-muted small m-0 mt-1">Discover trending creator feeds across integrated platforms</p>
        </div>

        {discover.loading ? (
          <div className="d-flex justify-content-center my-5 py-5">
            <img
              src={LoadIcon}
              alt="Loading..."
              width="45"
            />
          </div>
        ) : (
          <div className="discover_feed_grid border rounded-4 bg-white p-3 p-md-4 shadow-sm">
            <PostThumb posts={discover.posts} result={discover.result} />
          </div>
        )}

        {load && (
          <div className="d-flex justify-content-center my-4">
            <img src={LoadIcon} alt="Loading..." width="40" />
          </div>
        )}

        <div className="d-flex justify-content-center mt-4">
          {!discover.loading && (
            <LoadMoreBtn
              result={discover.result}
              page={discover.page}
              load={load}
              handleLoadMore={handleLoadMore}
            />
          )}
        </div>
      </div>
    );
}

export default Discover;
