import React from "react";
import { useSelector } from "react-redux";

import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import RightSideBar from "../components/home/RightSideBar";

import LoadIcon from "../images/loading.gif";

const Home = () => {
  const { homePosts } = useSelector((state) => state);

  return (
    <div className="container-fluid home py-3">
      <div className="row g-3">

        {/* Main Feed */}
        <div className="col-12 col-lg-8">
          <div className="card bg-transparent border-0">
            <div className="card-body p-0">
              <Status />
            </div>
          </div>

          {homePosts.loading ? (
            <div className="d-flex justify-content-center my-4">
              <img src={LoadIcon} alt="loading" width="40" />
            </div>
          ) : homePosts.result === 0 ? (
            <h5 className="text-center text-white mt-3">
              No Post Available
            </h5>
          ) : (
            <Posts />
          )}
        </div>

        {/* Right Sidebar */}
        <div className="col-12 col-lg-4">
          <div className="position-sticky" style={{ top: "80px" }}>
            <RightSideBar />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
