import React from "react";
import { useSelector } from "react-redux";
import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import RightSideBar from "../components/home/RightSideBar";
import LoadIcon from "../images/loading.gif";

const Home = () => {
  const homePosts = useSelector((state) => state.homePosts);

  return (
    <div className="container-fluid home py-4 px-3 px-md-4">
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card bg-transparent border-0 mb-4">
            <div className="card-body p-0">
              <Status />
            </div>
          </div>

          {homePosts?.loading ? (
            <div className="d-flex justify-content-center my-5">
              <img src={LoadIcon} alt="loading" width="45" />
            </div>
          ) : homePosts?.result === 0 ? (
            <div className="text-center py-5 border rounded bg-light mt-3">
              <i className="fas fa-folder-open fs-1 text-muted mb-2"></i>
              <h5 className="text-muted fw-normal m-0">No Posts Available</h5>
            </div>
          ) : (
            <Posts />
          )}
        </div>

        <div className="col-12 col-lg-4">
          <div className="position-sticky" style={{ top: "90px" }}>
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
