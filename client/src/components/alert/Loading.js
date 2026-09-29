import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(4px)",
        top: 0,
        left: 0,
        zIndex: 99999
      }}
      className="position-fixed vh-100 w-100 d-flex flex-column gap-3 justify-content-center align-items-center"
    >
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <span className="loading_text text-uppercase tracking-widest fw-semibold text-secondary small" style={{ letterSpacing: "0.12em", fontSize: "0.78rem" }}>
        Loading
      </span>
    </div>
  );
};

export default Loading;
