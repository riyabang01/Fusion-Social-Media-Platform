import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTotalUsers,
  getTotalPosts,
  getTotalComments,
  getTotalLikes,
  getTotalActiveUsers,
  getTotalSpamPosts,
} from "../../../redux/actions/adminAction";

const Main = () => {
    const { auth, admin, socket } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getTotalUsers(auth.token));
      dispatch(getTotalPosts(auth.token));
      dispatch(getTotalComments(auth.token));
      dispatch(getTotalLikes(auth.token));
      dispatch(getTotalSpamPosts(auth.token));
      dispatch(getTotalActiveUsers({ auth, socket }));
    }, [dispatch, auth.token, socket, auth]);

  return (
    <div className="main_admin_dashboard w-100 text-start animate-fade-in">
      <div className="p-4 p-md-5 bg-white border border-light-subtle rounded-4 shadow-sm mb-4 position-relative overflow-hidden">
        <div className="position-absolute end-0 top-50 translate-middle-y opacity-5 d-none d-lg-block me-5" style={{ pointerEvents: "none", userSelect: "none" }}>
          <i className="fa-solid fa-chart-line" style={{ fontSize: "11rem" }} />
        </div>

        <div className="position-relative" style={{ zIndex: 1 }}>
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2.5 py-1 rounded fw-bold small text-uppercase tracking-wider mb-3.5" style={{ fontSize: "0.72rem" }}>
            Operational Summary Node
          </span>
          <h2 className="fw-black text-dark tracking-tight m-0" style={{ fontSize: "2.2rem" }}>
            Hello, {auth?.user?.username || "Administrator"}
          </h2>
          <p className="text-muted m-0 mt-2 fs-6 max-w-xl" style={{ lineHeight: "1.5" }}>
            Review real-time dynamic traffic statistics, platform metrics aggregation, and user transmission logs across integrated cluster instances.
          </p>
        </div>
      </div>

      <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-xl-3 mt-2">
        <div className="col">
          <div className="card h-100 border border-light-subtle rounded-4 p-3.5 d-flex flex-row align-items-center gap-3 bg-white shadow-sm transition-all hover-translate-y">
            <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3 d-flex align-items-center justify-content-center" style={{ width: "56px", height: "56px" }}>
              <i className="fa-solid fa-users fs-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-secondary small fw-semibold text-uppercase tracking-wider m-0" style={{ fontSize: "0.75rem" }}>Total Users</p>
              <h3 className="fw-extrabold text-dark tracking-tight m-0 mt-1">{admin.total_users}</h3>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100 border border-light-subtle rounded-4 p-3.5 d-flex flex-row align-items-center gap-3 bg-white shadow-sm transition-all hover-translate-y">
            <div className="bg-success bg-opacity-10 text-success rounded-3 p-3 d-flex align-items-center justify-content-center" style={{ width: "56px", height: "56px" }}>
              <i className="fa-solid fa-comments fs-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-secondary small fw-semibold text-uppercase tracking-wider m-0" style={{ fontSize: "0.75rem" }}>Total Comments</p>
              <h3 className="fw-extrabold text-dark tracking-tight m-0 mt-1">{admin.total_comments}</h3>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100 border border-light-subtle rounded-4 p-3.5 d-flex flex-row align-items-center gap-3 bg-white shadow-sm transition-all hover-translate-y">
            <div className="bg-info bg-opacity-10 text-info rounded-3 p-3 d-flex align-items-center justify-content-center" style={{ width: "56px", height: "56px" }}>
              <i className="fa-solid fa-images fs-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-secondary small fw-semibold text-uppercase tracking-wider m-0" style={{ fontSize: "0.75rem" }}>Total Posts</p>
              <h3 className="fw-extrabold text-dark tracking-tight m-0 mt-1">{admin.total_posts}</h3>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100 border border-light-subtle rounded-4 p-3.5 d-flex flex-row align-items-center gap-3 bg-white shadow-sm transition-all hover-translate-y">
            <div className="bg-danger bg-opacity-10 text-danger rounded-3 p-3 d-flex align-items-center justify-content-center" style={{ width: "56px", height: "56px" }}>
              <i className="fa-solid fa-triangle-exclamation fs-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-secondary small fw-semibold text-uppercase tracking-wider m-0" style={{ fontSize: "0.75rem" }}>Reported Spams</p>
              <h3 className="fw-extrabold text-dark tracking-tight m-0 mt-1">{admin.total_spam_posts}</h3>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100 border border-light-subtle rounded-4 p-3.5 d-flex flex-row align-items-center gap-3 bg-white shadow-sm transition-all hover-translate-y">
            <div className="bg-warning bg-opacity-10 text-warning rounded-3 p-3 d-flex align-items-center justify-content-center" style={{ width: "56px", height: "56px" }}>
              <i className="fa-solid fa-heart fs-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-secondary small fw-semibold text-uppercase tracking-wider m-0" style={{ fontSize: "0.75rem" }}>Total Likes Engagement</p>
              <h3 className="fw-extrabold text-dark tracking-tight m-0 mt-1">{admin.total_likes}</h3>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100 border border-light-subtle rounded-4 p-3.5 d-flex flex-row align-items-center gap-3 bg-white shadow-sm transition-all hover-translate-y">
            <div className="bg-purple bg-opacity-10 text-purple rounded-3 p-3 d-flex align-items-center justify-content-center" style={{ width: "56px", height: "56px", color: "#6f42c1" }}>
              <i className="fa-solid fa-circle-check fs-4" style={{ color: "#6f42c1" }} />
            </div>
            <div className="overflow-hidden">
              <p className="text-secondary small fw-semibold text-uppercase tracking-wider m-0" style={{ fontSize: "0.75rem" }}>Active Streams Users</p>
              <h3 className="fw-extrabold text-dark tracking-tight m-0 mt-1">{admin.total_active_users}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
