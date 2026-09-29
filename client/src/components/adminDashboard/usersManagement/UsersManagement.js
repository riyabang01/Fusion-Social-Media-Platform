import React from "react";
import { useSelector } from "react-redux";

const UsersManagement = () => {
  const { auth } = useSelector((state) => state);

  return (
    <div className="users_management_panel w-100 text-start animate-fade-in">
      <div className="p-4 p-md-5 bg-white border border-light-subtle rounded-4 shadow-sm mb-4 position-relative overflow-hidden">
        <div className="position-absolute end-0 top-50 translate-middle-y opacity-5 d-none d-lg-block me-5" style={{ pointerEvents: "none", select: "none" }}>
          <i className="fa-solid fa-user-gear" style={{ fontSize: "12rem" }} />
        </div>
        
        <div className="position-relative" style={{ zIndex: 1 }}>
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2.5 py-1 rounded fw-bold small text-uppercase tracking-wider mb-3.5" style={{ fontSize: "0.72rem" }}>
            Operational Control Hub
          </span>
          <h2 className="fw-black text-dark tracking-tight m-0" style={{ fontSize: "2.2rem" }}>
            Hello, {auth?.user?.username || "Administrator"}
          </h2>
          <p className="text-muted m-0 mt-2 fs-6 max-w-xl" style={{ lineHeight: "1.5" }}>
            Welcome back to your administration node. Use this space to track user management matrix arrays, control security guidelines compliance, and audit real-time streaming transmission counters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
